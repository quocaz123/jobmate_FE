import React from "react";
import { Search, Calendar, MessageCircle, Star, ShieldCheck, Sparkles } from "lucide-react";
import { GraduationCap, Building2, Cog } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Search className="w-8 h-8" />,
    title: "Tìm kiếm thông minh",
    description:
      "AI phân tích kỹ năng, lịch học và vị trí để gợi ý công việc phù hợp nhất",
    details: ["Lọc theo khoảng cách", "Phù hợp lịch học", "Gợi ý dựa trên kỹ năng"],
  },
  {
    id: 2,
    icon: <Calendar className="w-8 h-8" />,
    title: "Đồng bộ lịch học",
    description: "Kết nối Google Calendar để tránh trùng lịch khi đi làm",
    details: ["Import từ Google", "Tự động kiểm tra", "Thông báo xung đột"],
  },
  {
    id: 3,
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Chat trực tiếp",
    description:
      "Giao tiếp realtime với nhà tuyển dụng, thỏa thuận chi tiết công việc",
    details: ["Chat realtime", "Chia sẻ file", "Thông báo push"],
  },
  {
    id: 4,
    icon: <Star className="w-8 h-8" />,
    title: "Đánh giá uy tín",
    description:
      "Hệ thống đánh giá 2 chiều giúp xây dựng uy tín cho sinh viên và nhà tuyển dụng",
    details: ["Đánh giá sao", "Bình luận chi tiết", "Badge uy tín"],
  },
];

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    title: "Bảo mật cao",
    description: "Xác minh CCCD, mã hóa dữ liệu, xác thực 2FA.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
    title: "Gợi ý thông minh",
    description: "AI matching dựa trên 10+ yếu tố để tìm việc phù hợp nhất.",
  },
];

const roles = [
  {
    icon: <GraduationCap className="w-10 h-10 text-indigo-500" />,
    title: "Dành cho Sinh viên",
    description: "Tìm việc làm thêm phù hợp với lịch học và kỹ năng.",
  },
  {
    icon: <Building2 className="w-10 h-10 text-blue-500" />,
    title: "Nhà tuyển dụng",
    description: "Tìm ứng viên sinh viên chất lượng cho công việc part-time.",
  },
  {
    icon: <Cog className="w-10 h-10 text-purple-500" />,
    title: "Quản trị viên",
    description: "Quản lý nền tảng, đảm bảo chất lượng và an toàn.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      {/* --- Tiêu đề chính --- */}
      <div className="text-center mb-12">
        <button className="border border-gray-300 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition">
          Cách thức hoạt động
        </button>
        <h2 className="text-3xl font-bold mt-4">Tìm việc dễ dàng trong 4 bước</h2>
        <p className="text-gray-600 mt-2">
          Quy trình đơn giản và thông minh giúp sinh viên kết nối với cơ hội việc làm phù hợp
        </p>
      </div>

      {/* --- Các bước --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="absolute -top-3 left-8 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
              {step.id}
            </div>
            <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-md mb-4 text-gray-700">
              {step.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{step.description}</p>
            <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
              {step.details.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* --- Bảo mật cao + Gợi ý thông minh --- */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="p-3 bg-white rounded-full shadow-sm">{feature.icon}</div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Vai trò (Sinh viên / Nhà tuyển dụng / Quản trị viên) --- */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full">{role.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;