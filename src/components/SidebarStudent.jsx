import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Send,
  MessageSquare,
  Calendar,
  FileText,
  IdCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  GraduationCap,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getItem, setItem } from "../services/localStorageService";

export default function SidebarStudent() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Lấy trạng thái sidebar từ localStorage
  useEffect(() => {
    const stored = getItem("sidebar-open");
    if (stored !== null) setIsOpen(stored === "true");
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setItem("sidebar-open", String(!isOpen));
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Tổng quan", path: "/student/dashboard" },
    { icon: <Briefcase size={20} />, label: "Tìm việc làm", path: "/student/joblist" },
    { icon: <ClipboardList size={20} />, label: "Yêu cầu tìm việc", path:"/student/jobrequest"},
    { icon: <Send size={20} />, label: "Ứng tuyển của tôi", path: "/student/applications" },
    { icon: <MessageSquare size={20} />, label: "Tin nhắn", path: "#" },
    { icon: <Calendar size={20} />, label: "Lịch làm việc", path: "#" },
    { icon: <FileText size={20} />, label: "Hồ sơ", path: "/student/profile" },
    { icon: <IdCard size={20} />, label: "Xác minh CCCD", path: "#" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Logo + Nút thu gọn sidebar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-cyan-600" size={28} />
          {isOpen && <h1 className="text-lg font-bold">Sinh viên</h1>}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center p-4 border-b gap-2">
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        {isOpen && (
          <div>
            <p className="font-semibold text-sm">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500">CNTT - ĐH Bách Khoa</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center w-full p-3 rounded-lg transition ${
                active
                  ? "bg-cyan-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {/* Đây là phần bạn hỏi nè 👇 */}
              {item.icon}
              {isOpen && <span className="ml-3 text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t">
        <button className="flex items-center w-full p-3 hover:bg-gray-100 transition">
          <Home size={20} />
          {isOpen && <span className="ml-3 text-sm">Về trang chủ</span>}
        </button>
        <button className="flex items-center w-full p-3 hover:bg-gray-100 transition">
          <Settings size={20} />
          {isOpen && <span className="ml-3 text-sm">Cài đặt</span>}
        </button>
        <button className="flex items-center w-full p-3 hover:bg-gray-100 text-red-600 transition">
          <LogOut size={20} />
          {isOpen && <span className="ml-3 text-sm">Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
}
