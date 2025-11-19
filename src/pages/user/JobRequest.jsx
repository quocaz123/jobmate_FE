import React, { useEffect, useState, useCallback } from "react";
import { MapPin, DollarSign, Plus, Trash2, Activity, X, Clock, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { createWaitingList, getMyWaitingList, deleteWaitingList } from "../../services/waitingListService";
import { getUserInfo } from "../../services/userService";
import { getAvailableJobs, getJobDetailByIdForUser } from "../../services/jobService";

const MAX_REQUESTS = 5;

const jobTypeOptions = [
  { value: "FULL_TIME", label: "Toàn thời gian" },
  { value: "PART_TIME", label: "Bán thời gian" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Thực tập" },
];

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('vi-VN');
}

function formatSalary(salary) {
  if (!salary) return '—';
  return new Intl.NumberFormat('vi-VN').format(salary) + ' VND';
}

function formatJobSalary(salary, unit) {
  if (!salary) return '—';
  const formatted = new Intl.NumberFormat('vi-VN').format(salary);
  return `${formatted} ${unit || 'VND'}`;
}

function computeMatchPercent(requirement, job) {
  let score = 0;
  const reqSkills = requirement.skills.map((s) => s.toLowerCase().trim()).filter(Boolean);
  const jobSkills = job.skills ? job.skills.split(';').map((s) => s.toLowerCase().trim()).filter(Boolean) : [];

  if (reqSkills.length && jobSkills.length) {
    const matchedSkills = reqSkills.filter((s) =>
      jobSkills.some((js) => js.includes(s) || s.includes(js))
    );
    score += Math.min(60, (matchedSkills.length / Math.max(1, reqSkills.length)) * 60);
  }

  if (requirement.jobType && job.jobType && job.jobType === requirement.jobType) {
    score += 20;
  }

  if (requirement.expectedMinSalary && job.salary) {
    if (job.salary >= requirement.expectedMinSalary) {
      score += 20;
    }
  }

  return Math.min(100, Math.round(score));
}

function percentClass(p) {
  if (p >= 80) return "bg-green-100 text-green-700";
  if (p >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export default function JobRequest() {
  const [jobType, setJobType] = useState("FULL_TIME");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [expectedMinSalary, setExpectedMinSalary] = useState("");
  const [searchRadius, setSearchRadius] = useState(10);
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [myRequests, setMyRequests] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);

  const loadMyRequests = async () => {
    setLoadingList(true);
    try {
      const res = await getMyWaitingList();
      const data = res?.data?.data || res?.data || [];
      setMyRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách yêu cầu:", err);
      setMyRequests([]);
    } finally {
      setLoadingList(false);
    }
  };

  const loadSuggestedJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const res = await getAvailableJobs();
      const allJobs = res?.data?.data || res?.data || [];
      const jobsArray = Array.isArray(allJobs) ? allJobs : [];

      const requirement = {
        skills,
        jobType,
        expectedMinSalary: parseFloat(expectedMinSalary) || 0,
      };

      const matched = jobsArray
        .map((job) => ({
          ...job,
          match: computeMatchPercent(requirement, job),
        }))
        .filter((job) => job.match > 0)
        .sort((a, b) => b.match - a.match)
        .slice(0, 5); // Top 5

      setSuggestedJobs(matched);
    } catch (err) {
      console.error("Lỗi khi tải gợi ý công việc:", err);
      setSuggestedJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  }, [skills, jobType, expectedMinSalary]);

  // Load user profile để lấy địa chỉ
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const res = await getUserInfo();
        const profile = res?.data?.data || res?.data || {};
        setUserProfile(profile);
        if (profile.address) {
          setLocation(profile.address);
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng:", err);
      }
    };
    loadUserProfile();
  }, []);

  // Load danh sách yêu cầu đã tạo
  useEffect(() => {
    loadMyRequests();
  }, []);

  // Load gợi ý công việc khi có skills hoặc jobType
  useEffect(() => {
    if (skills.length > 0 || jobType) {
      loadSuggestedJobs();
    } else {
      setSuggestedJobs([]);
    }
  }, [skills, jobType, expectedMinSalary, loadSuggestedJobs]);

  const handleViewJobDetail = async (jobId) => {
    try {
      const res = await getJobDetailByIdForUser(jobId);
      setSelectedJob(res?.data?.data || res?.data);
      setShowJobDetail(true);
    } catch (err) {
      alert(err?.response?.data?.message || "Không thể tải chi tiết công việc");
    }
  };

  const handleCloseRequest = async (requestId) => {
    if (!window.confirm("Bạn có chắc chắn muốn đóng yêu cầu tìm việc này không?")) {
      return;
    }

    try {
      await deleteWaitingList(requestId);
      setSuccess("Đã đóng yêu cầu tìm việc thành công!");
      await loadMyRequests();
    } catch (err) {
      setError(err?.response?.data?.message || "Không thể đóng yêu cầu. Vui lòng thử lại.");
    }
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
    }
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, idx) => idx !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra giới hạn 5 yêu cầu
    if (myRequests.length >= MAX_REQUESTS) {
      setError(`Bạn chỉ được tạo tối đa ${MAX_REQUESTS} yêu cầu tìm việc. Vui lòng xóa một yêu cầu cũ trước khi tạo mới.`);
      return;
    }

    // Validation
    if (!location) {
      setError("Vui lòng cập nhật địa chỉ trong hồ sơ của bạn.");
      return;
    }

    if (skills.length === 0) {
      setError("Vui lòng thêm ít nhất một kỹ năng.");
      return;
    }

    if (!expectedMinSalary || parseFloat(expectedMinSalary) <= 0) {
      setError("Vui lòng nhập mức lương mong muốn hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        jobType,
        skills: skills.join(";"),
        expectedMinSalary: parseFloat(expectedMinSalary),
        searchRadius: parseFloat(searchRadius),
        availableDays: availableDays || undefined,
        availableTime: availableTime || undefined,
        note: note || undefined,
      };

      await createWaitingList(data);
      setSuccess("Tạo yêu cầu tìm việc thành công!");

      // Reset form
      setJobType("FULL_TIME");
      setSkills([]);
      setSkillInput("");
      setExpectedMinSalary("");
      setSearchRadius(10);
      setAvailableDays("");
      setAvailableTime("");
      setNote("");

      // Reload danh sách
      await loadMyRequests();
    } catch (err) {
      setError(err?.response?.data?.message || "Không thể tạo yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeLabel = (type) => {
    const option = jobTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Yêu cầu tìm việc</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >
          {showCreateForm ? "Ẩn form tạo" : "Tạo yêu cầu mới"}
        </button>
      </div>

      {/* Thông báo */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Form tạo yêu cầu - Layout gọn */}
      {showCreateForm && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <form onSubmit={handleCreate} className="lg:col-span-2 bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-indigo-700">Tạo yêu cầu tìm việc mới</h2>
              <span className="text-sm text-gray-500">
                {myRequests.length}/{MAX_REQUESTS} yêu cầu
              </span>
            </div>

            {/* Row 1: Loại công việc và Lương */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Loại công việc *</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                  required
                >
                  {jobTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Lương tối thiểu (VND) *</label>
                <input
                  type="number"
                  value={expectedMinSalary}
                  onChange={(e) => setExpectedMinSalary(e.target.value)}
                  placeholder="15000000"
                  min="0"
                  className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                  required
                />
              </div>
            </div>

            {/* Row 2: Kỹ năng */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kỹ năng *</label>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Nhập kỹ năng..."
                  className="flex-1 border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((s, i) => (
                  <div
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1 text-xs"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(i)}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Bán kính và Vị trí */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Bán kính (km) *</label>
                <input
                  type="number"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  min="1"
                  max="100"
                  className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Vị trí *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Địa chỉ từ hồ sơ..."
                    className="flex-1 border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                    required
                  />
                  <MapPin size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Row 4: Ngày và Thời gian làm việc */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ngày làm việc</label>
                <input
                  type="text"
                  value={availableDays}
                  onChange={(e) => setAvailableDays(e.target.value)}
                  placeholder="Thứ 2 - Thứ 6"
                  className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Thời gian</label>
                <input
                  type="text"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  placeholder="8 giờ/ngày"
                  className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>

            {/* Row 5: Ghi chú */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tìm việc Java developer..."
                rows={2}
                className="w-full border border-indigo-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 resize-none"
              />
            </div>

            {!userProfile?.address && (
              <p className="text-xs text-amber-600">
                ⚠️ Vui lòng cập nhật địa chỉ trong hồ sơ của bạn.
              </p>
            )}

            {/* Nút submit */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={loading || myRequests.length >= MAX_REQUESTS}
                className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? "Đang tạo..." : "Tạo yêu cầu"}
              </button>
              {myRequests.length >= MAX_REQUESTS && (
                <span className="text-xs text-amber-600">
                  Đã đạt giới hạn {MAX_REQUESTS} yêu cầu
                </span>
              )}
            </div>
          </form>

          {/* Gợi ý công việc */}
          <aside className="lg:sticky lg:top-6 space-y-4" style={{ alignSelf: 'flex-start' }}>
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-4">
              <h3 className="text-sm font-medium text-indigo-700 mb-3">Gợi ý công việc</h3>
              {loadingJobs ? (
                <div className="text-center py-4 text-gray-500 text-sm">Đang tải...</div>
              ) : suggestedJobs.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                  <Activity size={24} className="mx-auto mb-2 text-indigo-400" />
                  Nhập kỹ năng để xem gợi ý
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {suggestedJobs.map((job) => (
                    <div key={job.id} className="p-3 border border-indigo-50 rounded-lg hover:shadow transition bg-white">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">{job.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{job.companyName || '—'}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />{job.location || '—'}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} />{formatJobSalary(job.salary, job.salaryUnit)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${percentClass(job.match)}`}>
                          {job.match}% phù hợp
                        </span>
                        <button
                          onClick={() => handleViewJobDetail(job.id)}
                          className="px-2 py-1 rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-4 text-center text-xs text-gray-500">
              <Activity size={16} className="mx-auto mb-1 text-indigo-400" />
              Gợi ý dựa trên kỹ năng và loại công việc bạn chọn.
            </div>
          </aside>
        </div>
      )}

      {/* Danh sách yêu cầu đã tạo */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
        <h2 className="text-lg font-medium text-indigo-700 mb-4">Danh sách yêu cầu đã tạo ({myRequests.length}/{MAX_REQUESTS})</h2>

        {loadingList ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : myRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity size={32} className="mx-auto mb-2 text-indigo-400" />
            <p>Bạn chưa có yêu cầu tìm việc nào.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map((request, index) => (
              <div
                key={request.id || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        {getJobTypeLabel(request.jobType)}
                      </span>
                      {request.createdAt && (
                        <span className="text-xs text-gray-500">
                          {formatDate(request.createdAt)}
                        </span>
                      )}
                      {request.status === 'CLOSED' && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                          Đã đóng
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-gray-600">Lương tối thiểu:</span>
                        <span className="font-medium">{formatSalary(request.expectedMinSalary)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-600">Bán kính:</span>
                        <span className="font-medium">{request.searchRadius || '—'} km</span>
                      </div>
                      {request.availableDays && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-600">Ngày làm việc:</span>
                          <span className="font-medium">{request.availableDays}</span>
                        </div>
                      )}
                      {request.availableTime && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-600">Thời gian:</span>
                          <span className="font-medium">{request.availableTime}</span>
                        </div>
                      )}
                    </div>

                    {request.skills && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-600">Kỹ năng: </span>
                        <div className="inline-flex flex-wrap gap-1 mt-1">
                          {request.skills.split(';').map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {request.note && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                        <span className="font-medium">Ghi chú: </span>
                        {request.note}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {request.status !== 'CLOSED' && (
                      <button
                        onClick={() => handleCloseRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Đóng yêu cầu"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal chi tiết công việc */}
      {showJobDetail && selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowJobDetail(false);
                setSelectedJob(null);
              }}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{selectedJob.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedJob.companyName || '—'}</p>
            <p className="text-sm text-gray-500 mb-2">{selectedJob.description || '—'}</p>
            <div className="space-y-1 text-sm text-gray-500">
              <p>💰 {formatJobSalary(selectedJob.salary, selectedJob.salaryUnit)}</p>
              <p>📍 {selectedJob.location || '—'}</p>
              {selectedJob.jobType && (
                <p>📋 {getJobTypeLabel(selectedJob.jobType)}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
