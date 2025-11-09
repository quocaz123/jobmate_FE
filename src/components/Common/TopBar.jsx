import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import NotificationBell from './NotificationBell';
import { logout } from '../../services/authService';
import { removeToken } from '../../services/localStorageService';

const TopBar = ({ inFor, role, avatar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout =  () => {
        logout();
        removeToken();
        window.location.href = '/login';
    }

    // Chuyển đổi role sang tiếng Việt
    const getRoleText = (role) => {
        if (!role) return 'Người dùng';
        const roleLower = role.toLowerCase();
        if (roleLower.includes('admin')) return 'Quản trị viên';
        if (roleLower.includes('employer')) return 'Nhà tuyển dụng';
        if (roleLower.includes('user')) return 'Người dùng';
        return 'Người dùng';
    };

    return (
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-end relative">
            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <NotificationBell />

                {/* User Profile Section */}
                {inFor && (
                    <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            {avatar ? (
                                <img src={avatar} alt={inFor} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-600 text-sm font-medium">
                                    {inFor?.[0]?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">{inFor}</span>
                            <span className="text-xs text-gray-500">{getRoleText(role)}</span>
                        </div>

                        {/* Dropdown Icon */}
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Hồ sơ của tôi
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Cài đặt
                                </button>
                                <hr className="my-2" />
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar; 
