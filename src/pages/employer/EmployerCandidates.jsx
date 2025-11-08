import React, { useEffect, useState, useCallback } from 'react'
import { MapPin, Clock, Star, MessageCircle, Eye, CheckCircle, XCircle, Search, X, FileText, Mail, Phone, User, Download, List } from 'lucide-react'
import { getApplicationsByJob, getApplicationDetail, updateApplicationStatus } from '../../services/applicationService'
import { createConversation } from '../../services/chatService'
import { getFileUrl } from '../../services/uploadFileService'

function statusBadge(status) {
  if (!status) return 'bg-gray-50 text-gray-700'
  const s = String(status).toLowerCase()
  if (s.includes('chờ') || s.includes('pending')) return 'bg-yellow-50 text-yellow-700'
  if (s.includes('chấp') || s.includes('accepted')) return 'bg-green-50 text-green-700'
  if (s.includes('từ') || s.includes('rejected')) return 'bg-red-50 text-red-700'
  return 'bg-gray-50 text-gray-700'
}

function statusColor(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('chờ') || s.includes('pending')) return 'border-l-4 border-blue-300'
  if (s.includes('chấp') || s.includes('accepted')) return 'border-l-4 border-green-300'
  if (s.includes('từ') || s.includes('rejected')) return 'border-l-4 border-red-300'
  return 'border-l-4 border-gray-300'
}

function initials(name) {
  if (!name) return ''
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function EmployerCandidates({ jobId, onStartChat }) {
  const [candidates, setCandidates] = useState([])
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applicationDetail, setApplicationDetail] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedApplicationForReject, setSelectedApplicationForReject] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const loadCandidates = useCallback(async (statusFilter = null) => {
    if (!jobId) {
      setCandidates([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      // Map filter từ client sang status API
      let statusParam = null
      if (statusFilter === 'pending') {
        statusParam = 'PENDING'
      } else if (statusFilter === 'accepted') {
        statusParam = 'ACCEPTED'
      } else if (statusFilter === 'rejected') {
        statusParam = 'REJECTED'
      } else if (statusFilter === 'cancelled') {
        statusParam = 'CANCELLED'
      }

      const response = await getApplicationsByJob(jobId, statusParam)
      const data = response?.data?.data

      if (data) {
        // Map dữ liệu từ API sang format hiển thị
        const mapped = (data.data || []).map((app) => ({
          id: app.applicationId,
          applicationId: app.applicationId,
          applicantId: app.applicantId,
          name: app.fullName,
          avatarUrl: app.avatarUrl,
          address: app.address,
          skills: app.skills,
          preferredJobType: app.preferredJobType,
          status: app.status,
          matchScore: app.matchScore || 0,
          trustScore: app.trustScore || 0,
          appliedAt: app.appliedAt
        }))
        setCandidates(mapped)
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách ứng viên:", error)
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }, [jobId])

  useEffect(() => {
    loadCandidates(filter === 'all' ? null : filter)
  }, [loadCandidates, filter])

  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: "Chờ duyệt",
      ACCEPTED: "Đã chấp nhận",
      REJECTED: "Đã từ chối",
      INTERVIEW: "Phỏng vấn",
      CANCELLED: "Đã hủy"
    }
    return statusMap[status] || status
  }

  const getJobTypeLabel = (jobType) => {
    const typeMap = {
      FULL_TIME: "Toàn thời gian",
      PART_TIME: "Bán thời gian",
      FREELANCE: "Freelance",
      INTERNSHIP: "Thực tập"
    }
    return typeMap[jobType] || jobType
  }

  const formatDateFull = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  }

  // Filter theo search query (API đã filter theo status rồi)
  const filtered = candidates.filter(c => {
    if (!q) return true
    const s = q.toLowerCase()
    return String(c.name || '').toLowerCase().includes(s) || String(c.skills || '').toLowerCase().includes(s)
  })

  const handleChat = async (applicantId) => {
    if (!applicantId) {
      console.warn("Không có applicantId để tạo conversation")
      return
    }
    try {
      await createConversation({ participantIds: [applicantId] })
      if (onStartChat) {
        onStartChat()
      } else {
        // Fallback: navigate to messages tab if callback not provided
        window.dispatchEvent(new CustomEvent('navigate-to-messages'))
      }
    } catch (error) {
      console.error("Lỗi khi tạo conversation:", error)
      alert(error?.response?.data?.message || "Không thể tạo cuộc trò chuyện. Vui lòng thử lại.")
    }
  }

  const handleViewProfile = async (applicationId) => {
    if (!applicationId) return
    setIsModalOpen(true)
    setLoadingDetail(true)
    try {
      const response = await getApplicationDetail(applicationId)
      const data = response?.data?.data
      setApplicationDetail(data || null)
    } catch (error) {
      console.error("Lỗi khi tải chi tiết ứng tuyển:", error)
      setApplicationDetail(null)
      alert(error?.response?.data?.message || "Không thể tải chi tiết hồ sơ. Vui lòng thử lại.")
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setApplicationDetail(null)
  }

  const handleViewResume = async () => {
    if (!applicationDetail?.applicantId || !applicationDetail?.hasResume) {
      alert("Không có CV để xem.")
      return
    }

    try {
      const response = await getFileUrl("RESUME", applicationDetail.applicantId)
      const cvUrl = response?.data?.data?.url || response?.data?.data?.fileUrl || response?.data?.data

      if (cvUrl) {
        // Mở CV trong tab mới
        window.open(cvUrl, '_blank')
      } else {
        alert("Không thể lấy link CV. Vui lòng thử lại.")
      }
    } catch (error) {
      console.error("Lỗi khi lấy link CV:", error)
      alert(error?.response?.data?.message || "Không thể lấy link CV. Vui lòng thử lại.")
    }
  }

  const handleViewReviews = () => {
    if (!applicationDetail?.applicantId) return

    // Mock data theo mẫu API response
    const mockReviews = [
      {
        reviewerId: "81b92b7e-5433-49c1-bd9a-9a9b2f44d7e4",
        reviewerName: "Cafe Tranquil",
        reviewerAvatar: "https://jobmate-media.s3.ap-southeast-2.amazonaws.com/companies/tranquil/avatar.png",
        jobTitle: "Nhân viên phục vụ quán cà phê",
        score: 5.0,
        comment: "Ứng viên làm việc nhanh nhẹn, đúng giờ, rất đáng tin cậy. Sẽ mời cộng tác lại!",
        createdAt: "2025-10-15T09:30:00"
      },
      {
        reviewerId: "c22e637a-1e3e-46ff-9c2f-5188cfb0b172",
        reviewerName: "Highlands Coffee",
        reviewerAvatar: "https://jobmate-media.s3.ap-southeast-2.amazonaws.com/companies/highlands/logo.png",
        jobTitle: "Nhân viên pha chế",
        score: 4.5,
        comment: "Thái độ làm việc rất tốt, học nhanh, chỉ cần cải thiện kỹ năng giao tiếp.",
        createdAt: "2025-09-29T14:05:00"
      },
      {
        reviewerId: "ab4f13de-cc11-4a9f-94a1-ef9f837ae611",
        reviewerName: "Cong Ty TNHH ABC",
        reviewerAvatar: "https://jobmate-media.s3.ap-southeast-2.amazonaws.com/companies/abc/avatar.png",
        jobTitle: "Nhân viên phục vụ sự kiện",
        score: 4.0,
        comment: "Hoàn thành tốt nhiệm vụ, có trách nhiệm, nhưng đôi lúc hơi chậm khi cao điểm.",
        createdAt: "2025-08-12T18:40:00"
      },
      {
        reviewerId: "e44b80c4-91e3-4d8b-bf19-3389f1e85dc3",
        reviewerName: "Katinat Đà Nẵng",
        reviewerAvatar: "https://jobmate-media.s3.ap-southeast-2.amazonaws.com/companies/katinat/logo.png",
        jobTitle: "Phục vụ ca tối",
        score: 5.0,
        comment: "Rất thân thiện, xử lý tình huống nhanh, khách hàng phản hồi tích cực.",
        createdAt: "2025-07-05T21:12:00"
      }
    ]

    setReviews(mockReviews)
    setIsReviewsModalOpen(true)
  }

  const handleCloseReviewsModal = () => {
    setIsReviewsModalOpen(false)
    setReviews([])
  }

  const handleAccept = async (applicationId) => {
    if (!window.confirm("Bạn có chắc chắn muốn chấp nhận ứng viên này không?")) {
      return
    }

    try {
      setIsUpdating(true)
      await updateApplicationStatus(applicationId, 'ACCEPTED')
      alert("Đã chấp nhận ứng viên thành công!")
      // Reload danh sách ứng viên
      await loadCandidates(filter === 'all' ? null : filter)
    } catch (error) {
      console.error("Lỗi khi chấp nhận ứng viên:", error)
      alert(error?.response?.data?.message || "Không thể chấp nhận ứng viên. Vui lòng thử lại.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReject = (applicationId) => {
    setSelectedApplicationForReject(applicationId)
    setRejectionReason('')
    setIsRejectModalOpen(true)
  }

  const handleConfirmReject = async () => {
    if (!selectedApplicationForReject) return

    try {
      setIsUpdating(true)
      await updateApplicationStatus(selectedApplicationForReject, 'REJECTED', rejectionReason || null)
      alert("Đã từ chối ứng viên thành công!")
      setIsRejectModalOpen(false)
      setSelectedApplicationForReject(null)
      setRejectionReason('')
      // Reload danh sách ứng viên
      await loadCandidates(filter === 'all' ? null : filter)
    } catch (error) {
      console.error("Lỗi khi từ chối ứng viên:", error)
      alert(error?.response?.data?.message || "Không thể từ chối ứng viên. Vui lòng thử lại.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false)
    setSelectedApplicationForReject(null)
    setRejectionReason('')
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      {/* Main content: list card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Danh sách ứng viên</h2>
            <p className="text-sm text-gray-500">Danh sách và quản lý các ứng viên đã ứng tuyển</p>
          </div>

          <div className="w-80">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><Search size={16} /></span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm kiếm ứng viên..." className="w-full border border-gray-100 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-100 bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setFilter('all')} className={`px-3 py-2 rounded-full text-sm ${filter === 'all' ? 'bg-white border' : 'bg-gray-50'}`}>Tất cả</button>
            <button onClick={() => setFilter('pending')} className={`px-3 py-2 rounded-full text-sm ${filter === 'pending' ? 'bg-white border' : 'bg-gray-50'}`}>Chờ duyệt</button>
            <button onClick={() => setFilter('accepted')} className={`px-3 py-2 rounded-full text-sm ${filter === 'accepted' ? 'bg-white border' : 'bg-gray-50'}`}>Đã chấp nhận</button>
            <button onClick={() => setFilter('rejected')} className={`px-3 py-2 rounded-full text-sm ${filter === 'rejected' ? 'bg-white border' : 'bg-gray-50'}`}>Đã từ chối</button>
            <button onClick={() => setFilter('cancelled')} className={`px-3 py-2 rounded-full text-sm ${filter === 'cancelled' ? 'bg-white border' : 'bg-gray-50'}`}>Đã hủy</button>
          </div>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="text-sm text-gray-500 py-8 text-center">Đang tải dữ liệu...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-sm text-gray-500 py-8 text-center">Không có ứng viên.</div>
          )}

          {!loading && filtered.map(c => {
            const skillsList = c.skills ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : []
            const matchPercentage = c.matchScore || 0

            return (
              <div key={c.id} className={`${statusColor(c.status)} rounded-lg border border-gray-100 bg-white p-5 hover:shadow-lg transition`}>
                <div className="flex items-start gap-4">
                  {/* Left: Avatar and Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {c.avatarUrl ? (
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150"
                          e.target.onerror = null
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xl border-2 border-gray-300">
                        {initials(c.name)}
                      </div>
                    )}

                    <div className="flex-1">
                      {/* Name and Status */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{c.name}</h3>
                          {c.appliedAt && (
                            <p className="text-sm text-gray-600">Ngày nộp: {formatDateFull(c.appliedAt)}</p>
                          )}
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge(c.status)}`}>
                          {getStatusLabel(c.status)}
                        </div>
                      </div>

                      {/* Rating, Location, Job Type */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{c.trustScore ? c.trustScore.toFixed(1) : '0.0'}</span>
                        </div>
                        {c.address && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{c.address}</span>
                          </div>
                        )}
                        {c.preferredJobType && (
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{getJobTypeLabel(c.preferredJobType)}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills Tags */}
                      {skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skillsList.map((skill, i) => (
                            <span key={i} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Progress Bars */}
                      {matchPercentage > 0 && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              style={{ width: `${matchPercentage}%` }}
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-[80px] text-right">
                            {matchPercentage.toFixed(0)}% phù hợp
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Action Buttons (Vertical) */}
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handleViewProfile(c.applicationId)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm hover:bg-gray-50 whitespace-nowrap"
                    >
                      <Eye size={16} /> Xem hồ sơ
                    </button>
                    <button
                      onClick={() => handleChat(c.applicantId)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm hover:bg-gray-50 whitespace-nowrap"
                    >
                      <MessageCircle size={16} /> Nhắn tin
                    </button>
                    {c.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleAccept(c.applicationId)}
                          disabled={isUpdating}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle size={16} /> Chấp nhận
                        </button>
                        <button
                          onClick={() => handleReject(c.applicationId)}
                          disabled={isUpdating}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle size={16} /> Từ chối
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal hiển thị chi tiết hồ sơ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">Chi tiết hồ sơ ứng viên</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {loadingDetail ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Đang tải dữ liệu...</div>
                </div>
              ) : applicationDetail ? (
                <div className="space-y-6">
                  {/* Thông tin ứng viên */}
                  <div className="flex items-start gap-4 pb-6 border-b">
                    {applicationDetail.avatarUrl ? (
                      <img
                        src={applicationDetail.avatarUrl}
                        alt={applicationDetail.applicantName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150"
                          e.target.onerror = null
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-2xl border-2 border-gray-300">
                        {initials(applicationDetail.applicantName)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{applicationDetail.applicantName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {applicationDetail.email && (
                          <div className="flex items-center gap-1">
                            <Mail size={16} />
                            <span>{applicationDetail.email}</span>
                          </div>
                        )}
                        {applicationDetail.contactPhone && (
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            <span>{applicationDetail.contactPhone}</span>
                          </div>
                        )}
                        {applicationDetail.address && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{applicationDetail.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge(applicationDetail.status)}`}>
                      {getStatusLabel(applicationDetail.status)}
                    </div>
                  </div>

                  {/* Thông tin công việc */}
                  <div className="pb-6 border-b">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Thông tin công việc</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Vị trí:</span> {applicationDetail.jobTitle}</div>
                      <div><span className="font-medium">Công ty:</span> {applicationDetail.companyName}</div>
                      {applicationDetail.salary && (
                        <div>
                          <span className="font-medium">Lương:</span> {applicationDetail.salary.toLocaleString('vi-VN')}đ/{applicationDetail.salaryUnit}
                        </div>
                      )}
                      {applicationDetail.workingDays && (
                        <div><span className="font-medium">Ngày làm việc:</span> {applicationDetail.workingDays}</div>
                      )}
                      {applicationDetail.workingHours && (
                        <div><span className="font-medium">Giờ làm việc:</span> {applicationDetail.workingHours}</div>
                      )}
                      {applicationDetail.appliedAt && (
                        <div><span className="font-medium">Ngày nộp:</span> {formatDate(applicationDetail.appliedAt)}</div>
                      )}
                    </div>
                  </div>

                  {/* Thông tin cá nhân */}
                  <div className="pb-6 border-b">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Thông tin cá nhân</h4>
                    <div className="space-y-2 text-sm">
                      {applicationDetail.bio && (
                        <div>
                          <span className="font-medium">Giới thiệu:</span>
                          <p className="text-gray-700 mt-1">{applicationDetail.bio}</p>
                        </div>
                      )}
                      {applicationDetail.skills && (
                        <div>
                          <span className="font-medium">Kỹ năng:</span>
                          <p className="text-gray-700 mt-1">{applicationDetail.skills}</p>
                        </div>
                      )}
                      {applicationDetail.preferredJobType && (
                        <div>
                          <span className="font-medium">Loại công việc mong muốn:</span> {getJobTypeLabel(applicationDetail.preferredJobType)}
                        </div>
                      )}
                      {applicationDetail.matchScore && (
                        <div>
                          <span className="font-medium">Điểm phù hợp:</span> {applicationDetail.matchScore.toFixed(1)}/10
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thư xin việc */}
                  {applicationDetail.coverLetter && (
                    <div className="pb-6 border-b">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Thư xin việc</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{applicationDetail.coverLetter}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {applicationDetail.hasResume && (
                      <button
                        onClick={handleViewResume}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Download size={18} /> Xem CV
                      </button>
                    )}
                    <button
                      onClick={handleViewReviews}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <List size={18} /> Xem đánh giá
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">Không tìm thấy thông tin hồ sơ.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal hiển thị danh sách đánh giá */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Đánh giá về ứng viên</h2>
                {applicationDetail && (
                  <p className="text-sm text-gray-500 mt-1">{applicationDetail.applicantName}</p>
                )}
              </div>
              <button
                onClick={handleCloseReviewsModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Chưa có đánh giá nào.</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={review.reviewerId || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        {/* Avatar người đánh giá */}
                        {review.reviewerAvatar ? (
                          <img
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150"
                              e.target.onerror = null
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold border-2 border-gray-300">
                            {initials(review.reviewerName)}
                          </div>
                        )}

                        <div className="flex-1">
                          {/* Header: Tên người đánh giá và điểm */}
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                              {review.jobTitle && (
                                <p className="text-sm text-gray-600 mt-1">{review.jobTitle}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={18} className="text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold text-gray-800">{review.score.toFixed(1)}</span>
                            </div>
                          </div>

                          {/* Comment */}
                          {review.comment && (
                            <p className="text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                          )}

                          {/* Ngày đánh giá */}
                          {review.createdAt && (
                            <p className="text-xs text-gray-500">
                              {formatDate(review.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal từ chối ứng viên */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Từ chối ứng viên</h2>
              <button
                onClick={handleCloseRejectModal}
                disabled={isUpdating}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do từ chối (tùy chọn)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối ứng viên..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={4}
                  disabled={isUpdating}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseRejectModal}
                  disabled={isUpdating}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
