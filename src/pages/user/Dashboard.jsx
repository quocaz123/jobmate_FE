import React, { useState } from "react";
import {
  Briefcase,
  MessageSquare,
  Star,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Search,
  X,
  MapPin,
  DollarSign,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ onGoToJobRequest }) {
  const navigate = useNavigate();
  const [showJobModal, setShowJobModal] = useState(null);
  const [toast, setToast] = useState(false);

  const stats = [
    { icon: <Briefcase className="text-cyan-600" />, label: "Đơn ứng tuyển", value: 3 },
    { icon: <MessageSquare className="text-pink-500" />, label: "Tin nhắn", value: 5 },
    { icon: <Star className="text-yellow-500" />, label: "Đánh giá", value: "4.5 ★" },
    { icon: <TrendingUp className="text-green-500" />, label: "Tiến độ hồ sơ", value: "85%" },
  ];

  const jobSuggestions = [
    { id: 1, title: "Nhân viên bán hàng", company: "Cửa hàng 24h", salary: "6-8 triệu/tháng", location: "Quận 1" },
    { id: 2, title: "Thực tập sinh Marketing", company: "Agency XYZ", salary: "Thoả thuận", location: "Remote" },
    { id: 3, title: "Nhân viên phục vụ", company: "Nhà hàng SushiGo", salary: "25k/giờ", location: "Quận 7" },
  ];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(false), 1800);
  };

  function handleGoToJobRequest() {
    if (typeof onGoToJobRequest === "function") {
      onGoToJobRequest();
    } else {
      navigate("/user?tab=job-requests", { replace: false });
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8 relative overflow-hidden">
      {/* toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          ✅ {toast}
        </div>
      )}

      {/* header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles size={22} /> Chào mừng bạn đến với JobMate!
        </h1>
        <p className="text-white/90 mt-1">
          Cùng bắt đầu hành trình tìm việc phù hợp ngay hôm nay ✨
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 border rounded-xl shadow-sm flex items-center gap-3 hover:shadow-md transition-all"
          >
            <div className="p-3 bg-gray-100 rounded-lg">{s.icon}</div>
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* job suggestions */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Search size={18} className="text-cyan-600" /> Việc làm gợi ý cho bạn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobSuggestions.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-lg hover:shadow-md transition cursor-pointer relative"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-50 rounded-md">
                  <Building2 size={20} className="text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                    <MapPin size={14} className="text-cyan-500" /> <span>{job.location}</span>
                    <DollarSign size={14} className="text-pink-500" /> <span>{job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setShowJobModal(job)}
                  className="text-sm text-cyan-600 flex items-center gap-1 hover:underline"
                >
                  Xem chi tiết <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => showToast("Đã lưu công việc!")}
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  Lưu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA tạo yêu cầu tìm việc */}
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Bạn đã sẵn sàng tạo yêu cầu tìm việc?
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Hãy mô tả nhanh nhu cầu công việc (vị trí, kỹ năng, địa điểm) —
            chúng tôi sẽ gợi ý việc phù hợp cho bạn.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGoToJobRequest}
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-95 transition"
          >
            Tạo yêu cầu tìm việc
          </button>
        </div>
      </div>

      {/* modal job detail */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => setShowJobModal(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-2">{showJobModal.title}</h2>
            <p className="text-gray-600">{showJobModal.company}</p>
            <p className="mt-2 text-sm">💰 Lương: {showJobModal.salary}</p>
            <p className="mt-3 text-gray-700 text-sm">
              Mô tả: Cơ hội tuyệt vời để phát triển trong môi trường năng động.
            </p>
            <button
              onClick={() => {
                setShowJobModal(null);
                showToast("Ứng tuyển/ Lưu công việc!");
              }}
              className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
            >
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
