import React, { useState, useEffect } from "react";
import { Star, Clock, MapPin, Search, Filter, Zap } from "lucide-react";
import JobCard from "../../components/JobCard";
import StepsSection from "../../components/StepsSection";

export default function Home() {
  const categories = [
    "Gia sư",
    "Phục vụ",
    "Thiết kế",
    "Marketing",
    "Bán hàng",
    "Dịch thuật",
    "IT Support",
    "Event",
  ];

  const jobs = [
    {
      logoText: "TR",
      title: "Gia sư Tiếng Anh - Lớp 12",
      company: "Trung tâm Anh ngữ ILA",
      location: "Quận 1, TP.HCM",
      distance: 0.8,
      time: "19:00 - 21:00 • Thứ 2,4,6",
      rating: "4.8",
      reviews: 95,
      applicants: 12,
      salary: "250,000đ/buổi",
      tags: ["Tiếng Anh", "Giao tiếp", "Part-time", "Đã xác minh"],
      isUrgent: false,
    },
    {
      logoText: "CÔ",
      title: "Thiết kế Poster sự kiện",
      company: "Công ty Event ABC",
      location: "Quận 3, TP.HCM",
      distance: 2.1,
      time: "Flexible • Remote",
      rating: "4.6",
      reviews: 67,
      applicants: 8,
      salary: "500,000đ/poster",
      tags: ["Photoshop", "Illustrator", "Freelance", "Đã xác minh"],
      isUrgent: true,
    },
    {
      logoText: "TR",
      title: "Gia sư Tiếng Anh - Lớp 12",
      company: "Trung tâm Anh ngữ ILA",
      location: "Quận 1, TP.HCM",
      distance: 0.8,
      time: "19:00 - 21:00 • Thứ 2,4,6",
      rating: "4.8",
      reviews: 95,
      applicants: 12,
      salary: "250,000đ/buổi",
      tags: ["Tiếng Anh", "Giao tiếp", "Part-time", "Đã xác minh"],
      isUrgent: false,
    },
    {
      logoText: "CÔ",
      title: "Thiết kế Poster sự kiện",
      company: "Công ty Event ABC",
      location: "Quận 3, TP.HCM",
      distance: 2.1,
      time: "Flexible • Remote",
      rating: "4.6",
      reviews: 67,
      applicants: 8,
      salary: "500,000đ/poster",
      tags: ["Photoshop", "Illustrator", "Freelance", "Đã xác minh"],
      isUrgent: true,
    },
  ];

  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [jobs.length]);

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 text-white px-6 md:px-20 py-20 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm mb-4 font-semibold shadow-sm">
              🎓 Dành cho sinh viên năng động
            </span>

            <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Tìm việc làm thêm <br /> phù hợp với lịch học 🎯
            </h1>

            <p className="text-blue-50/90 mb-8 max-w-lg leading-relaxed">
              Ứng dụng thông minh giúp sinh viên tìm việc làm thêm phù hợp với kỹ năng,
              thời gian và vị trí của bạn. Kết nối trực tiếp với nhà tuyển dụng uy tín.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow hover:scale-105 transition-all">
                🔎 Tìm việc ngay
              </button>
              <button className="bg-blue-600/30 text-white border border-white/30 px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition-all">
                💼 Dành cho nhà tuyển dụng
              </button>
            </div>

            <div className="flex gap-10 text-white">
              <div>
                <p className="text-3xl font-bold">1,200+</p>
                <p className="text-sm opacity-90">Công việc mỗi tháng</p>
              </div>
              <div>
                <p className="text-3xl font-bold">5,000+</p>
                <p className="text-sm opacity-90">Sinh viên tham gia</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.8⭐</p>
                <p className="text-sm opacity-90">Đánh giá trung bình</p>
              </div>
            </div>
          </div>

          {/* RIGHT — chỉ hiển thị 1 JobCard */}
          <div className="space-y-5 transition-opacity duration-700 ease-in-out">
            <JobCard job={jobs[currentJobIndex]} />
          </div>
        </div>
      </section>


      {/* ================= SEARCH SECTION ================= */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            🔍 Tìm việc làm phù hợp
          </h1>
          <p className="text-gray-600">
            Sử dụng AI để gợi ý công việc dựa trên kỹ năng và lịch học của bạn
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-md px-4 py-3 flex-1">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Tìm theo nghề nghiệp, kỹ năng..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            <div className="flex items-center bg-gray-100 rounded-md px-4 py-3 flex-1">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Vị trí, quận/huyện..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            <button className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-md hover:scale-105 transition-all w-full md:w-auto shadow">
              <Search size={16} className="mr-2" /> Tìm kiếm
            </button>

            <button className="border border-gray-300 rounded-md p-3 hover:bg-gray-100 transition">
              <Filter size={18} className="text-gray-700" />
            </button>
          </div>

          <div className="bg-blue-50 mt-5 rounded-md px-5 py-4 text-sm border border-blue-100">
            <p className="flex items-center font-medium text-blue-800 mb-1">
              <Zap size={16} className="text-yellow-500 mr-2" />
              Gợi ý thông minh
            </p>
            <p className="text-gray-700">
              Dựa trên lịch học của bạn, chúng tôi tìm thấy{" "}
              <span className="font-semibold text-blue-600">
                15 công việc phù hợp
              </span>{" "}
              vào buổi tối và cuối tuần 🌙
            </p>
          </div>
        </div>

        {/* Danh mục */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Danh mục phổ biến
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-blue-100 border border-gray-200 rounded-md text-gray-700 hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all font-medium shadow-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOBS SECTION ================= */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6 md:px-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ✨ Việc làm nổi bật
            </h1>
            <p className="text-gray-500">
              Những cơ hội việc làm được đề xuất dành riêng cho bạn
            </p>
          </div>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-blue-100 transition shadow-sm">
            Xem tất cả
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Nút xem thêm căn giữa */}
        <div className="flex justify-center mt-10">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-md hover:scale-105 transition-all shadow-md font-semibold">
            Xem thêm việc làm 🌟
          </button>
        </div>
      </section>

      {/* ================= STEPS SECTION ================= */}
      <section className="bg-white">
        <StepsSection />
      </section>
    </div>
  );
}
