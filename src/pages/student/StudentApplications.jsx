import React, { useState, useEffect } from "react";
import SidebarStudent from "../../components/SidebarStudent";
import TopbarStudent from "../../components/TopbarStudent";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentApplications() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fakeJobs = [
      {
        id: 1,
        title: "Nhân viên phục vụ",
        company: "Nhà hàng Italia",
        location: "Quận 1, TP.HCM",
        salary: "25.000đ/giờ",
        schedule: "Thứ 2, 4, 6 • 18:00-22:00",
        appliedDate: "15/1/2024",
        status: "Đang xem xét",
        type: "part-time",
        statusColor: "bg-yellow-100 text-yellow-600",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=400",
      },
      {
        id: 2,
        title: "Nhân viên bán hàng",
        company: "Cửa hàng thời trang XY",
        location: "Quận 3, TP.HCM",
        salary: "30.000đ/giờ",
        schedule: "Thứ 7, CN • 9:00-17:00",
        appliedDate: "12/1/2024",
        status: "Phỏng vấn",
        type: "part-time",
        statusColor: "bg-blue-100 text-blue-600",
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&w=400",
      },
      {
        id: 3,
        title: "Trợ giảng tiếng Anh",
        company: "Trung tâm Anh ngữ ILA",
        location: "Quận Bình Thạnh",
        salary: "6-8 triệu/tháng",
        schedule: "T2 - T6",
        appliedDate: "10/1/2024",
        status: "Chấp nhận",
        type: "full-time",
        statusColor: "bg-green-100 text-green-600",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&w=400",
      },
      {
        id: 4,
        title: "Thiết kế Poster sự kiện",
        company: "Công ty Event ABC",
        location: "Remote",
        salary: "500.000đ/poster",
        schedule: "Linh hoạt",
        appliedDate: "9/1/2024",
        status: "Từ chối",
        type: "freelance",
        statusColor: "bg-red-100 text-red-600",
        image:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&w=400",
      },
      ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 5,
        title: `Công việc ${i + 5}`,
        company: `Công ty ABC${i + 1}`,
        location: "TP. Đà Nẵng",
        salary: "20.000đ/giờ",
        schedule: "Linh hoạt",
        appliedDate: "8/1/2024",
        status: "Đang xem xét",
        type: "part-time",
        statusColor: "bg-yellow-100 text-yellow-600",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&w=400",
      })),
    ];

    setJobs(fakeJobs);
    setFilteredJobs(fakeJobs);
  }, []);

  // ====== LỌC JOB THEO TỪ KHÓA ======
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value) ||
        job.company.toLowerCase().includes(value)
    );
    setFilteredJobs(filtered);
  };

  const stats = [
    {
      id: 1,
      label: "Tổng số",
      value: jobs.length,
      icon: <FileText className="text-gray-500" size={22} />,
    },
    {
      id: 2,
      label: "Đang xem xét",
      value: jobs.filter((j) => j.status === "Đang xem xét").length,
      icon: <AlertCircle className="text-yellow-500" size={22} />,
    },
    {
      id: 3,
      label: "Phỏng vấn",
      value: jobs.filter((j) => j.status === "Phỏng vấn").length,
      icon: <CalendarCheck className="text-blue-500" size={22} />,
    },
    {
      id: 4,
      label: "Chấp nhận",
      value: jobs.filter((j) => j.status === "Chấp nhận").length,
      icon: <CheckCircle className="text-green-500" size={22} />,
    },
    {
      id: 5,
      label: "Từ chối",
      value: jobs.filter((j) => j.status === "Từ chối").length,
      icon: <XCircle className="text-red-500" size={22} />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarStudent />
      <TopbarStudent />

      <main className="ml-64 pt-20 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Ứng tuyển của tôi
        </h1>
        <p className="text-gray-500 mb-4">
          Theo dõi trạng thái các đơn ứng tuyển của bạn
        </p>

        {/* THỐNG KÊ */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {stats.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-center justify-center border hover:shadow-md transition"
            >
              <div>{s.icon}</div>
              <p className="text-sm text-gray-600 mt-2">{s.label}</p>
              <p className="text-lg font-bold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* THANH TÌM KIẾM */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border mb-6">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm công việc hoặc công ty..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border-none outline-none text-gray-700"
          />
        </div>

        {/* DANH SÁCH CÔNG VIỆC — tất cả hiển thị chung */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex gap-4">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin size={14} /> {job.location} •{" "}
                    <DollarSign size={14} /> {job.salary} • <Clock size={14} />{" "}
                    {job.schedule}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${job.statusColor}`}
                    >
                      {job.status}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {job.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      Ứng tuyển: {job.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/student/application/${job.id}`)}
                  className="px-4 py-2 border rounded-lg flex items-center gap-1 hover:bg-gray-100"
                >
                  <Eye size={16} /> Chi tiết
                </button>
                <button
                  onClick={() => navigate(`/student/chat/${job.company}`)}
                  className="px-4 py-2 border rounded-lg flex items-center gap-1 hover:bg-gray-100"
                >
                  <MessageSquare size={16} /> Nhắn tin
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
