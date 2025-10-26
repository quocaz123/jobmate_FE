import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarStudent from "../../components/SidebarStudent";
import TopbarStudent from "../../components/TopbarStudent";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  User,
  Bookmark,
  DollarSign,
} from "lucide-react";


const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    location: "Quận 1, TP.HCM",
    distance: "0.8km",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    rating: 4.8,
    reviews: 95,
    applicants: 12,
    tags: ["Tiếng Anh", "Giao tiếp", "Part-time", "Đã xác minh", "Phù hợp lịch"],
    salary: "250,000đ/buổi",
    description:
      "Trung tâm Anh ngữ ILA cần tuyển gia sư dạy Tiếng Anh cho học sinh lớp 12. Yêu cầu có khả năng giao tiếp tốt, nắm vững kiến thức ngữ pháp và kỹ năng luyện thi. Ưu tiên sinh viên ngành Ngôn ngữ Anh hoặc Sư phạm.",
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    location: "Quận 3, TP.HCM",
    distance: "2.1km",
    time: "Flexible • Remote",
    rating: 4.6,
    reviews: 67,
    applicants: 8,
    tags: ["Photoshop", "Illustrator", "Freelance", "Đã xác minh", "Gấp"],
    salary: "500,000đ/poster",
    description:
      "Công ty Event ABC cần tuyển thiết kế sáng tạo cho các sự kiện sắp tới. Yêu cầu biết sử dụng Photoshop, Illustrator, có óc thẩm mỹ tốt. Làm việc online hoặc trực tiếp tại văn phòng.",
  },
  {
    id: 3,
    title: "Phục vụ bàn - Nhà hàng Nhật",
    company: "Sushi Hokkaido",
    location: "Quận 7, TP.HCM",
    distance: "3.5km",
    time: "17:00 - 22:00 • Cuối tuần",
    rating: 4.4,
    reviews: 156,
    applicants: 25,
    tags: ["Phục vụ", "Part-time", "Đã xác minh"],
    salary: "120,000đ/ca",
    description:
      "Nhà hàng Sushi Hokkaido tuyển nhân viên phục vụ bàn cho ca tối cuối tuần. Yêu cầu năng động, trung thực, có tinh thần làm việc nhóm. Ưu tiên sinh viên có kinh nghiệm phục vụ nhà hàng.",
  },
];


export default function StudentJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const found = JOBS_DATA.find((j) => j.id === parseInt(id));
    setJob(found);
  }, [id]);

  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p>Không tìm thấy công việc</p>
        <button
          onClick={() => navigate("/student/joblist")}
          className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  function handleApply() {
    alert(`🎉 Bạn đã ứng tuyển vào công việc "${job.title}" thành công!`);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarStudent />
      <TopbarStudent />

      <main className="ml-64 pt-20 p-6 transition-all duration-300">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
          {/* Nút quay lại */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </button>

          {/* Header công việc */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {job.title}
              </h1>
              <p className="text-gray-500">{job.company}</p>
            </div>

            <button
              onClick={() => setSaved(!saved)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <Bookmark
                className={saved ? "text-pink-500" : "text-gray-400"}
                size={20}
              />
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span>
                {job.location} • Cách {job.distance}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span>{job.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-400" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <span>
                {job.rating} ({job.reviews} đánh giá)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <span>{job.applicants} người đã ứng tuyển</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full border text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Mô tả công việc */}
          <div className="border-t pt-4 text-gray-700 leading-relaxed">
            <h2 className="text-lg font-semibold mb-2">Mô tả công việc</h2>
            <p>{job.description}</p>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => navigate("/student/joblist")}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
            >
              Quay lại danh sách
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                {saved ? "Đã lưu" : "Lưu công việc"}
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 rounded-lg text-white text-sm bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-95"
              >
                Ứng tuyển ngay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
