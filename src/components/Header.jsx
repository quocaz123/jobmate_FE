import React from "react";
import { Search } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white shadow-sm border-b border-gray-200">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-400 to-gray-700 text-white font-bold text-lg">
                    SJ
                </div>
                <h1 className="text-xl font-bold">StudentJobs</h1>
            </div>

            {/* Ô tìm kiếm */}
            <div className="flex-1 mx-8">
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm công việc, kỹ năng..."
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
            </div>

            {/* Menu */}
            <nav className="flex items-center space-x-6 font-medium text-gray-800">
                <a href="#" className="hover:text-gray-600">Tìm việc</a>
                <a href="#" className="hover:text-gray-600">Đăng tin</a>
                <a href="#" className="hover:text-gray-600">Hướng dẫn</a>
                <a href="http://localhost:5173/login" className="hover:text-gray-600">
                    Đăng nhập
                </a>
                <a
                    href="http://localhost:5173/signup"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                    Đăng ký
                </a>
            </nav>
        </header>
    );
}
