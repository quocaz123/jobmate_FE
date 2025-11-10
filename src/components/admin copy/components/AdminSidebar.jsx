import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaRegFileAlt, FaCog, FaSignOutAlt, FaChartBar, FaCommentDots } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { FiEye } from 'react-icons/fi';

const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const sidebarItems = [
        { name: 'Dashboard', icon: FaTachometerAlt, key: 'dashboard', path: '/adminhome' },
        { name: 'Quản lý người dùng', icon: FaUsers, key: 'users', path: '/admin/users' },
        { name: 'Duyệt Nhà tuyển dụng', icon: IoMdPersonAdd, key: 'approve-employers', path: '/admin/approve-employers' },
        { name: 'Kiểm duyệt công việc', icon: FaRegFileAlt, key: 'review-jobs', path: '/admin/review-jobs' },
        { name: 'Xác minh CCCD', icon: FiEye, key: 'verify-cccd', path: '/admin/verify-cccd' },
        { name: 'Báo cáo & Khiếu nại', icon: BsExclamationCircle, key: 'reports', path: '/admin/reports' },
        { name: 'Thống kê', icon: FaChartBar, key: 'stats', path: '/admin/analytics' },
        { name: 'Tin nhắn', icon: FaCommentDots, key: 'messages', path: '/admin/messages' },
        { name: 'Cài đặt', icon: FaCog, key: 'settings', path: '/admin/settings' },
    ];

    const handleMenuClick = (item) => {
        setActiveMenu(item.key);
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen fixed flex flex-col">
            <div className="p-4 flex items-center gap-2 border-b border-gray-100">
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                    <FaTachometerAlt className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {sidebarItems.map(item => (
                    <div
                        key={item.key}
                        onClick={() => handleMenuClick(item)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            activeMenu === item.key 
                                ? 'bg-red-50 text-red-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-100">
                 <button 
                    onClick={() => navigate('/')}
                    className="w-full text-center py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 mb-2"
                >
                    Về trang chủ
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors">
                    <FaSignOutAlt className="w-5 h-5" />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
