import React, { useState, useEffect } from "react";
import { Star, Clock, MapPin, Search, Filter, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/Overview/JobCard";
import StepsSection from "../../components/Overview/StepsSection";
import Header from "../../components/Overview/Header";
import Footer from "../../components/Overview/Footer";

export default function Overview() {
  const navigate = useNavigate();
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
      <Header />
      <section className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 text-white px-6 md:px-20 py-20 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm mb-4 font-semibold shadow-sm">
              🎓 JobMate - Kết nối sinh viên & nhà tuyển dụng uy tín
            </span>

            <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Tìm việc làm thêm phù hợp <br /> với lịch học & kỹ năng 🎯
            </h1>

            <p className="text-blue-50/90 mb-8 max-w-lg leading-relaxed">
              Nền tảng JobMate phân tích kỹ năng, lịch học và vị trí để gợi ý công việc,
              đồng bộ Google Calendar, chat realtime, xác minh CCCD và đánh giá 2 chiều.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold shadow hover:scale-105 transition-all"
              >
                🔎 Tìm việc ngay
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600/30 text-white border border-white/30 px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition-all"
              >
                💼 Dành cho nhà tuyển dụng
              </button>
            </div>

            <div className="flex gap-10 text-white">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm opacity-90">Công việc bán thời gian</p>
              </div>
              <div>
                <p className="text-3xl font-bold">2,000+</p>
                <p className="text-sm opacity-90">Sinh viên đã xác minh</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.8⭐</p>
                <p className="text-sm opacity-90">Đánh giá 2 chiều</p>
              </div>
            </div>
          </div>

          {/* RIGHT — chỉ hiển thị 1 JobCard */}
          <div className="space-y-5 transition-opacity duration-700 ease-in-out">
            <JobCard job={jobs[currentJobIndex]} />
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
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-blue-100 transition shadow-sm"
          >
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
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-md hover:scale-105 transition-all shadow-md font-semibold"
          >
            Xem thêm việc làm 🌟
          </button>
        </div>
      </section>

      {/* ================= STEPS SECTION ================= */}
      <section className="bg-white">
        <StepsSection />
      </section>

      <Footer />
    </div>
  );
}