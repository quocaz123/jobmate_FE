import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  AlertCircle,
  CalendarCheck,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  MessageSquare,
  MoreVertical,
  Trash2,
  Search,
  Star,
} from "lucide-react";
import { getMyApplications, cancelApplication } from "../../services/applicationService";
import { createConversation } from "../../services/chatService";
import { getJobDetailByIdForUser } from "../../services/jobService";
import { formatWorkingDaysForDisplay } from "../../utils/scheduleUtils";
import RatingModal from "../../components/User/RatingModal";

export default function Application({ onViewDetail, onStartChat }) {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 10,
    totalElements: 0
  });
  const [ratingModal, setRatingModal] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: null,
    employerId: null,
    employerName: null
  });

  useEffect(() => {
    loadApplications();
  }, []);

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId].contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const loadApplications = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      const response = await getMyApplications(page, size);
      const data = response?.data?.data;

      if (data) {
        // Map dữ liệu từ API response
        // API trả về applicationId, cần map thành id để component sử dụng
        const mappedApplications = (data.data || []).map((app) => ({
          ...app,
          id: app.applicationId || app.id, // Ưu tiên applicationId từ API
        }));
        setApplications(mappedApplications);
        setFilteredApplications(mappedApplications);
        setPagination({
          currentPage: data.currentPage || 0,
          totalPages: data.totalPages || 0,
          pageSize: data.pageSize || 10,
          totalElements: data.totalElements || 0
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách ứng tuyển:", error);
      setApplications([]);
      setFilteredApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Map status từ backend sang tiếng Việt
  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: { label: "Đang xem xét", color: "bg-yellow-100 text-yellow-600" },
      ACCEPTED: { label: "Chấp nhận", color: "bg-green-100 text-green-600" },
      REJECTED: { label: "Từ chối", color: "bg-red-100 text-red-600" },
      CANCELLED: { label: "Đã hủy", color: "bg-gray-100 text-gray-600" }
    };
    return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-600" };
  };

  // Map jobStatus từ backend sang tiếng Việt
  const getJobStatusLabel = (statusJob) => {
    const statusMap = {
      PENDING: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-600" },
      APPROVED: { label: "Đang mở", color: "bg-green-100 text-green-600" },
      REJECTED: { label: "Từ chối", color: "bg-red-100 text-red-600" },
      CLOSED: { label: "Đã đóng", color: "bg-gray-100 text-gray-600" },
      
    };
    return statusMap[statusJob] || { label: statusJob || "N/A", color: "bg-gray-100 text-gray-600" };
  };

  // Map jobType từ backend sang tiếng Việt
  const getJobTypeLabel = (jobType) => {
    const typeMap = {
      FULL_TIME: "Toàn thời gian",
      PART_TIME: "Bán thời gian",
      FREELANCE: "Freelance",
      INTERNSHIP: "Thực tập"
    };
    return typeMap[jobType] || jobType;
  };

  // Format salary
  const formatSalary = (salary, salaryUnit) => {
    if (!salary) return "Thỏa thuận";
    const formattedSalary = parseFloat(salary).toLocaleString("vi-VN");
    return `${formattedSalary}đ/${salaryUnit || "tháng"}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleChat = async (employerId) => {
    if (!employerId) {
      console.warn("Không có employerId để tạo conversation");
      return;
    }

    try {
      await createConversation({ participantIds: [employerId] });
      if (onStartChat) {
        onStartChat();
      }
    } catch (error) {
      console.error("Lỗi khi tạo conversation:", error);
      alert(error?.response?.data?.message || "Không thể tạo cuộc trò chuyện. Vui lòng thử lại.");
    }
  };

  const handleCancelApplication = async (applicationId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn ứng tuyển này không?")) {
      return;
    }

    try {
      await cancelApplication(applicationId);
      // Reload danh sách
      await loadApplications(pagination.currentPage, pagination.pageSize);
      setOpenMenuId(null);
      alert("Đã hủy đơn ứng tuyển thành công");
    } catch (error) {
      console.error("Lỗi khi hủy đơn ứng tuyển:", error);
      alert(error?.response?.data?.message || "Không thể hủy đơn ứng tuyển. Vui lòng thử lại.");
    }
  };

  const handleOpenRating = async (app) => {
    let employerId = app.employerId;
    let employerName = app.companyName || app.employerName;

    // Nếu chưa có employerId, lấy từ job detail
    if (!employerId && app.jobId) {
      try {
        const jobResponse = await getJobDetailByIdForUser(app.jobId);
        const jobData = jobResponse?.data?.data || jobResponse?.data;
        if (jobData?.employer?.id) {
          employerId = jobData.employer.id;
        }
        if (!employerName && jobData?.employer?.fullName) {
          employerName = jobData.employer.fullName;
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin job:", error);
      }
    }

    setRatingModal({
      isOpen: true,
      jobId: app.jobId,
      jobTitle: app.jobTitle,
      employerId: employerId,
      employerName: employerName
    });
  };

  const handleRatingSuccess = () => {
    // Reload danh sách sau khi đánh giá thành công
    loadApplications(pagination.currentPage, pagination.pageSize);
  };

  // Kiểm tra xem có thể đánh giá không
  const canRate = (app) => {
    const canRateResult = (
      app.statusJob === "CLOSED" &&
      (app.status === "ACCEPTED" || app.status === "REJECTED") &&
      app.jobId
    );
    // Debug log (có thể xóa sau)
    if (app.statusJob === "CLOSED") {
      console.log("Application có thể đánh giá:", {
        applicationId: app.id,
        statusJob: app.statusJob,
        status: app.status,
        jobId: app.jobId,
        canRate: canRateResult
      });
    }
    return canRateResult;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = applications.filter(
      (app) =>
        app.jobTitle?.toLowerCase().includes(value) ||
        app.companyName?.toLowerCase().includes(value)
    );
    setFilteredApplications(filtered);
  };

  const stats = [
    {
      id: 1,
      label: "Tổng số",
      value: pagination.totalElements,
      icon: <FileText className="text-gray-500" size={22} />,
    },
    {
      id: 2,
      label: "Đang xem xét",
      value: applications.filter((app) => app.status === "PENDING").length,
      icon: <AlertCircle className="text-yellow-500" size={22} />,
    },

    {
      id: 3,
      label: "Chấp nhận",
      value: applications.filter((app) => app.status === "ACCEPTED").length,
      icon: <CheckCircle className="text-green-500" size={22} />,
    },
    {
      id: 4,
      label: "Từ chối",
      value: applications.filter((app) => app.status === "REJECTED").length,
      icon: <XCircle className="text-red-500" size={22} />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-800">Ứng tuyển của tôi</h1>
      <p className="text-gray-500">Theo dõi trạng thái các đơn ứng tuyển của bạn</p>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-center justify-center border hover:shadow-md transition"
          >
            {s.icon}
            <p className="text-sm text-gray-600 mt-2">{s.label}</p>
            <p className="text-lg font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm công việc hoặc công ty..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border-none outline-none text-gray-700"
        />
      </div>

      {/* Danh sách công việc */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">Chưa có đơn ứng tuyển nào</p>
            <p className="text-gray-500 text-sm mt-2">Hãy tìm kiếm và ứng tuyển các công việc phù hợp với bạn</p>
          </div>
        ) : (
          filteredApplications.map((app) => {
            const statusInfo = getStatusLabel(app.status);
            const schedule = `${app.workingDays ? formatWorkingDaysForDisplay(app.workingDays) : ""}${app.workingHours ? ` • ${app.workingHours}` : ""}`;

            return (
              <div
                key={app.id}
                className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex gap-4 items-center flex-1">
                  {/* Avatar chữ cái đầu */}
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-lg shadow-sm border flex-shrink-0">
                    {app.jobTitle?.charAt(0).toUpperCase() || "J"}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{app.jobTitle || "Công việc"}</h3>
                    <p className="text-sm text-gray-500">{app.companyName || ""}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                      {app.location && (
                        <>
                          <MapPin size={14} /> <span>{app.location}</span>
                        </>
                      )}
                      {app.salary && (
                        <>
                          {app.location && " • "}
                          <DollarSign size={14} /> <span>{formatSalary(app.salary, app.salaryUnit)}</span>
                        </>
                      )}
                      {schedule && (
                        <>
                          {(app.location || app.salary) && " • "}
                          <Clock size={14} /> <span>{schedule}</span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                      {app.statusJob && (() => {
                        const jobStatusInfo = getJobStatusLabel(app.statusJob);
                        return (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${jobStatusInfo.color}`}
                            title="Trạng thái công việc"
                          >
                            {jobStatusInfo.label}
                          </span>
                        );
                      })()}
                      {app.jobType && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {getJobTypeLabel(app.jobType)}
                        </span>
                      )}
                      {app.appliedAt && (
                        <span className="text-xs text-gray-400">
                          Ứng tuyển: {formatDate(app.appliedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center flex-shrink-0 ml-4">
                  <button
                    onClick={() => onViewDetail(app.id)}
                    className="px-4 py-2 border rounded-lg flex items-center gap-1 hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Eye size={16} /> Chi tiết
                  </button>
                  {app.employerId && (
                    <button
                      onClick={() => handleChat(app.employerId)}
                      className="px-4 py-2 border rounded-lg flex items-center gap-1 hover:bg-gray-100 whitespace-nowrap"
                    >
                      <MessageSquare size={16} /> Nhắn tin
                    </button>
                  )}
                  {canRate(app) && (
                    <button
                      onClick={() => handleOpenRating(app)}
                      className="px-4 py-2 rounded-lg flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 shadow-sm whitespace-nowrap font-medium"
                      title="Đánh giá công việc và nhà tuyển dụng"
                    >
                      <Star size={16} className="fill-white text-white" /> Đánh giá
                    </button>
                  )}

                  {/* Menu 3 chấm */}
                  <div className="relative" ref={(el) => (menuRefs.current[app.id] = el)}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                      className="p-2 border rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>

                    {openMenuId === app.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          {app.status === "PENDING" && (
                            <button
                              onClick={() => handleCancelApplication(app.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={16} /> Hủy đơn ứng tuyển
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => loadApplications(pagination.currentPage - 1, pagination.pageSize)}
            disabled={pagination.currentPage === 0}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <span className="text-sm text-gray-600">
            Trang {pagination.currentPage + 1} / {pagination.totalPages}
          </span>
          <button
            onClick={() => loadApplications(pagination.currentPage + 1, pagination.pageSize)}
            disabled={pagination.currentPage >= pagination.totalPages - 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal({ isOpen: false, jobId: null, jobTitle: null, employerId: null, employerName: null })}
        jobTitle={ratingModal.jobTitle}
        jobId={ratingModal.jobId}
        employerId={ratingModal.employerId}
        employerName={ratingModal.employerName}
        onSuccess={handleRatingSuccess}
      />
    </div>
  );
}
