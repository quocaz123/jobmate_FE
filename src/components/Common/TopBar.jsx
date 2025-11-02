import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, Menu } from 'lucide-react';

const TopBar = ({ inFor, role, avatar, onToggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const getRoleText = (role) => {
        if (!role) return 'Người dùng';
        const lower = role.toLowerCase();
        if (lower.includes('admin')) return 'Quản trị viên';
        if (lower.includes('employer')) return 'Nhà tuyển dụng';
        return 'Người dùng';
    };

    return (
        <div className="bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
            {/* Nút mở sidebar (hiện trên mobile) */}
            <button
                onClick={onToggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Giữa trống để đẩy user info sang phải */}
            <div className="flex-1" />

            {/* Khu vực thông tin người dùng (nằm bên phải) */}
            <div className="flex items-center space-x-4">
                <button className="relative">
                    <Bell className="w-6 h-6 text-gray-600 hover:text-teal-600 transition" />
                </button>

                {/* Dropdown user */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                    >
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {avatar ? (
                                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-semibold text-gray-700">
                                    {inFor?.[0]?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">{inFor}</p>
                            <p className="text-xs text-gray-500">{getRoleText(role)}</p>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Hồ sơ
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Cài đặt
                            </button>
                            <hr />
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
