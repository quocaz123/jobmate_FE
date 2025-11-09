import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  User,
  CheckCircle,
} from "lucide-react";

const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    salary: "250,000đ/buổi",
    location: "Quận 1, TP.HCM",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    rating: 4.8,
    applicants: 12,
    verified: true,
    description:
      "Dạy kèm học sinh lớp 12 môn Tiếng Anh. Ưu tiên sinh viên sư phạm Anh hoặc người có chứng chỉ IELTS từ 6.5 trở lên. Học sinh thân thiện, môi trường học thoải mái.",
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    salary: "500,000đ/poster",
    location: "Quận 3, TP.HCM",
    time: "Linh hoạt, có thể làm remote",
    rating: 4.6,
    applicants: 8,
    verified: true,
    description:
      "Thiết kế ấn phẩm truyền thông cho sự kiện. Yêu cầu thành thạo Photoshop và Illustrator. Có kinh nghiệm thiết kế sự kiện là một lợi thế.",
  },
  {
    id: 3,
    title: "Nhân viên giao hàng (Part-time)",
    company: "Shopee Express",
    salary: "180,000đ/ca",
    location: "Quận Bình Thạnh, TP.HCM",
    time: "Ca sáng hoặc chiều",
    rating: 4.2,
    applicants: 15,
    verified: false,
    description:
      "Thực hiện giao hàng nội thành bằng xe máy, hỗ trợ chi phí xăng. Công việc linh hoạt, có thể chọn ca làm theo thời gian rảnh.",
  },
  {
    id: 4,
    title: "Lập trình viên ReactJS (Remote)",
    company: "TechWave Solutions",
    salary: "25,000,000đ/tháng",
    location: "Remote",
    time: "Full-time • Remote",
    rating: 4.9,
    applicants: 20,
    verified: true,
    description:
      "Tham gia phát triển giao diện web với ReactJS. Yêu cầu có ít nhất 1 năm kinh nghiệm, hiểu biết về API và UI/UX. Làm việc 100% online.",
  },
  {
    id: 5,
    title: "Nhân viên Marketing Online",
    company: "Công ty TNHH BeeMedia",
    salary: "10,000,000đ/tháng",
    location: "Quận Tân Bình, TP.HCM",
    time: "9:00 - 17:00",
    rating: 4.5,
    applicants: 10,
    verified: false,
    description:
      "Lên kế hoạch và triển khai chiến dịch quảng cáo trên Facebook, Google, Tiktok. Có kỹ năng viết content và phân tích dữ liệu cơ bản.",
  },
];

export default function JobListDetail({ id, onBack }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const found = JOBS_DATA.find((j) => j.id === parseInt(id));
    setJob(found || null);
  }, [id]);

  if (!job) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Không tìm thấy công việc.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative border border-gray-100">
        {/* Nút quay lại */}
        <button
          onClick={onBack}
          className="absolute left-4 top-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={18} /> <span className="text-sm">Quay lại</span>
        </button>

        {/* Header */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {job.title}
            {job.verified && (
              <CheckCircle size={18} className="text-green-500" title="Đã xác minh" />
            )}
          </h1>
          <p className="text-gray-500 mt-1">{job.company}</p>
        </div>

        {/* Thông tin chính */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <DollarSign size={16} className="text-pink-500" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <MapPin size={16} className="text-cyan-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <Clock size={16} className="text-amber-500" />
            <span>{job.time}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <Star size={16} className="text-yellow-500" />
            <span>
              {job.rating} ⭐ ({job.applicants} người ứng tuyển)
            </span>
          </div>
        </div>

        {/* Mô tả công việc */}
        <div className="border-t pt-6 text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold mb-3">Mô tả công việc</h2>
          <p className="whitespace-pre-line">{job.description}</p>
        </div>

        {/* Nút hành động */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onBack}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
          >
            Quay lại
          </button>
          <button
            onClick={() =>
              alert(`🎉 Bạn đã ứng tuyển công việc "${job.title}" thành công!`)
            }
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-90 font-medium transition"
          >
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    </div>
  );
}
