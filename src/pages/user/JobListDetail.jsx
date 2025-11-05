import React, { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react";

const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    salary: "250,000đ/buổi",
    location: "Quận 1, TP.HCM",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    description:
      "Dạy kèm học sinh lớp 12 môn Tiếng Anh. Ưu tiên sinh viên sư phạm Anh hoặc người có chứng chỉ IELTS từ 6.5 trở lên.",
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    salary: "500,000đ/poster",
    location: "Quận 3, TP.HCM",
    time: "Làm việc linh hoạt, có thể làm remote.",
    description:
      "Thiết kế ấn phẩm truyền thông cho sự kiện. Yêu cầu thành thạo Photoshop và Illustrator.",
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
          className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 mb-4 hover:text-gray-800"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-gray-500 mb-4">{job.company}</p>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <DollarSign size={16} /> <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} /> <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} /> <span>{job.time}</span>
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{job.description}</p>
        </div>
      </div>
    </div>
  );
}
