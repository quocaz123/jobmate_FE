import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarStudent from "../../components/SidebarStudent";
import TopbarStudent from "../../components/TopbarStudent";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  UserCheck,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";

const FAKE_APPLICATIONS = [
  {
    id: 1,
    title: "Nhân viên phục vụ",
    company: "Nhà hàng Italia",
    location: "Quận 1, TP.HCM",
    salary: "25.000đ/giờ",
    schedule: "Thứ 2, 4, 6 • 18:00-22:00",
    appliedDate: "15/1/2024",
    status: "Đang xem xét",
    statusColor: "bg-yellow-100 text-yellow-600",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=400",
    description:
      "Bạn đã ứng tuyển vào vị trí nhân viên phục vụ tại Nhà hàng Italia. Hiện đơn ứng tuyển của bạn đang được nhà tuyển dụng xem xét. Vui lòng chờ phản hồi hoặc liên hệ qua phần nhắn tin.",
    feedback: "Nhà tuyển dụng sẽ phản hồi trong vòng 3 ngày làm việc.",
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
    statusColor: "bg-blue-100 text-blue-600",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&w=400",
    description:
      "Bạn đã được mời tham gia phỏng vấn cho vị trí nhân viên bán hàng. Hãy chuẩn bị tốt và đúng giờ nhé!",
    feedback: "Phỏng vấn lúc 10:00 sáng ngày 18/1/2024 tại cửa hàng XY, Quận 3.",
  },
];

export default function StudentApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const found = FAKE_APPLICATIONS.find((a) => a.id === parseInt(id));
    setApp(found || null);
  }, [id]);

  if (!app) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p>Không tìm thấy đơn ứng tuyển</p>
        <button
          onClick={() => navigate("/student/applications")}
          className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarStudent />
      <TopbarStudent />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
          {/* Nút quay lại */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </button>

          {/* Thông tin công việc */}
          <div className="flex gap-6 mb-6">
            <img
              src={app.image}
              alt={app.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{app.title}</h1>
              <p className="text-gray-500">{app.company}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-2">
                <MapPin size={14} /> {app.location} •{" "}
                <DollarSign size={14} /> {app.salary} • <Clock size={14} />{" "}
                {app.schedule}
              </div>
            </div>
          </div>

          {/* Trạng thái */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${app.statusColor}`}
            >
              {app.status}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              Đã nộp: {app.appliedDate}
            </span>
          </div>

          {/* Nội dung chi tiết */}
          <div className="border-t pt-4 text-gray-700 leading-relaxed space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <FileText size={18} /> <span>Thông tin đơn ứng tuyển</span>
            </div>
            <p>{app.description}</p>

            <div className="flex items-center gap-2 text-gray-800 font-semibold mt-6">
              <Calendar size={18} /> <span>Ghi chú từ nhà tuyển dụng</span>
            </div>
            <p className="italic text-gray-600">{app.feedback}</p>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => navigate("/student/applications")}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
            >
              Quay lại danh sách
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/student/chat/${app.company}`)}
                className="px-4 py-2 border rounded-lg text-sm flex items-center gap-1 hover:bg-gray-50"
              >
                <MessageSquare size={16} /> Nhắn tin
              </button>
              <button
                onClick={() =>
                  alert("⭐ Cảm ơn bạn đã đánh giá! (sẽ kết nối API sau)")
                }
                className="px-4 py-2 rounded-lg text-white text-sm bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-95 flex items-center gap-1"
              >
                <Star size={16} /> Đánh giá công việc
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
