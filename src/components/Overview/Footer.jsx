import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Cột 1 - Logo & mô tả */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-black text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center">
              SJ
            </div>
            <span className="text-xl font-semibold">StudentJobs</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Nền tảng kết nối sinh viên với cơ hội việc làm part-time uy tín và phù hợp.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-black">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Cột 2 - Dành cho sinh viên */}
        <div>
          <h3 className="font-semibold mb-3">Dành cho Sinh viên</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Tìm việc làm</a></li>
            <li><a href="#" className="hover:text-black">Quản lý hồ sơ</a></li>
            <li><a href="#" className="hover:text-black">Theo dõi ứng tuyển</a></li>
            <li><a href="#" className="hover:text-black">Đánh giá nhà tuyển dụng</a></li>
            <li><a href="#" className="hover:text-black">Hướng dẫn sử dụng</a></li>
          </ul>
        </div>

        {/* Cột 3 - Nhà tuyển dụng */}
        <div>
          <h3 className="font-semibold mb-3">Nhà tuyển dụng</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Đăng tin tuyển dụng</a></li>
            <li><a href="#" className="hover:text-black">Quản lý ứng viên</a></li>
            <li><a href="#" className="hover:text-black">Bảng giá dịch vụ</a></li>
            <li><a href="#" className="hover:text-black">Xây dựng uy tín</a></li>
            <li><a href="#" className="hover:text-black">Hỗ trợ kỹ thuật</a></li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ */}
        <div>
          <h3 className="font-semibold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@studentjobs.vn
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 1900 1234
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> TP. Hồ Chí Minh
            </li>
          </ul>

          {/* Đăng ký nhận thông báo */}
          <div>
            <p className="text-sm font-medium mb-2">Nhận thông báo việc làm mới</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow px-3 py-2 text-sm outline-none"
              />
              <button className="bg-black text-white text-sm px-4 py-2 hover:bg-gray-800">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-600">
        <p className="mb-2">
          © 2024 <span className="font-semibold">StudentJobs</span>. Tất cả quyền được bảo lưu.
        </p>
        <div className="flex justify-center space-x-4 text-gray-600 text-sm">
          <a href="#" className="hover:text-black">Điều khoản sử dụng</a>
          <a href="#" className="hover:text-black">Chính sách bảo mật</a>
          <a href="#" className="hover:text-black">Hỗ trợ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;