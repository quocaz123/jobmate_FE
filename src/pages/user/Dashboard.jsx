import React, { useState, useEffect } from "react";
import {
  Briefcase,
  MessageSquare,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({
    personalInfo: true,
    skills: true,
    certificates: false,
    projects: false,
  });
  const [selectedApp, setSelectedApp] = useState(null); // modal

  useEffect(() => {
    // giả lập gọi API sau 1s
    const timer = setTimeout(() => {
      setApplications([
        {
          id: 1,
          company: "Tech Startup ABC",
          position: "Frontend Developer Intern",
          status: "Đang chờ",
          color: "bg-yellow-100 text-yellow-800",
          date: "2025-10-15",
          salary: "8-12 triệu/tháng",
        },
        {
          id: 2,
          company: "Marketing Agency XYZ",
          position: "Content Creator",
          status: "Phỏng vấn",
          color: "bg-blue-100 text-blue-800",
          date: "2025-10-10",
          salary: "6-8 triệu/tháng",
        },
        {
          id: 3,
          company: "E-commerce Platform",
          position: "Customer Service",
          status: "Được nhận",
          color: "bg-green-100 text-green-800",
          date: "2025-10-05",
          salary: "5-7 triệu/tháng",
        },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ------------------ TÍNH TOÁN ------------------
  const totalApplications = applications.length;
  const interviewCount = applications.filter(
    (a) => a.status === "Phỏng vấn"
  ).length;
  const acceptedCount = applications.filter(
    (a) => a.status === "Được nhận"
  ).length;
  const rating = 4.8;

  const totalProfileItems = Object.keys(profile).length;
  const completedItems = Object.values(profile).filter(Boolean).length;
  const progress = Math.round((completedItems / totalProfileItems) * 100);

  // ------------------ HÀM CẬP NHẬT ------------------
  const toggleCertificate = () => {
    setProfile((prev) => ({
      ...prev,
      certificates: !prev.certificates,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="p-6 space-y-6 transition-all duration-300">
        {/* ----- THỐNG KÊ ----- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white border rounded-lg flex gap-2 items-center shadow-sm">
            <Briefcase className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{totalApplications}</p>
              <p className="text-sm text-gray-500">Đã ứng tuyển</p>
            </div>
          </div>
          <div className="p-6 bg-white border rounded-lg flex gap-2 items-center shadow-sm">
            <MessageSquare className="text-indigo-600" />
            <div>
              <p className="text-2xl font-bold">{interviewCount}</p>
              <p className="text-sm text-gray-500">Phỏng vấn</p>
            </div>
          </div>
          <div className="p-6 bg-white border rounded-lg flex gap-2 items-center shadow-sm">
            <Star className="text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{rating}</p>
              <p className="text-sm text-gray-500">Đánh giá</p>
            </div>
          </div>
          <div className="p-6 bg-white border rounded-lg flex gap-2 items-center shadow-sm">
            <TrendingUp className="text-green-500" />
            <div>
              <p className="text-2xl font-bold">{progress}%</p>
              <p className="text-sm text-gray-500">Hồ sơ hoàn thiện</p>
            </div>
          </div>
        </div>

        {/* ----- ỨNG TUYỂN GẦN ĐÂY ----- */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-bold mb-2">Ứng tuyển gần đây</h2>
          <p className="text-sm text-gray-500 mb-4">
            Theo dõi trạng thái các đơn ứng tuyển của bạn
          </p>

          {applications.length === 0 ? (
            <p className="text-gray-400 italic">Đang tải dữ liệu...</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-medium">{app.position}</h3>
                    <p className="text-sm text-gray-500">{app.company}</p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {app.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {app.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${app.color}`}
                    >
                      {app.status}
                    </span>
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="p-2 border rounded hover:bg-gray-100"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ----- HỒ SƠ HOÀN THIỆN ----- */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-bold mb-2">Hoàn thiện hồ sơ</h2>
          <p className="text-sm text-gray-500 mb-4">
            Hồ sơ hoàn thiện giúp bạn có cơ hội được tuyển dụng cao hơn
          </p>

          {/* Thanh tiến độ */}
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Tiến độ hoàn thiện
            </span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Mốc hoàn thiện */}
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Thông tin cá nhân đã hoàn thiện</li>
            <li>✅ Kỹ năng đã cập nhật</li>
            <li>
              {profile.certificates ? "✅ Chứng chỉ đã thêm" : "⏳ Cần thêm chứng chỉ"}
            </li>
            <li>
              {profile.projects ? "✅ Dự án đã hoàn thiện" : "⏳ Cần thêm dự án"}
            </li>
          </ul>

          <button
            onClick={toggleCertificate}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded hover:from-indigo-600 hover:to-blue-700 transition-all"
          >
            Cập nhật chứng chỉ
          </button>
        </div>
      </main>

      {/* ----- MODAL XEM CHI TIẾT ----- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-2">{selectedApp.position}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedApp.company}</p>
            <p>
              💰 <strong>Lương:</strong> {selectedApp.salary}
            </p>
            <p>
              📅 <strong>Ngày nộp:</strong> {selectedApp.date}
            </p>
            <p>
              📌 <strong>Trạng thái:</strong> {selectedApp.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
