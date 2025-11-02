import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getUserInfo } from '../utils/userUtils';
import { adminMenuItems } from '../utils/menuConfig';

// Component cho Overview
const AdminOverview = () => {
    const userInfo = getUserInfo();
    const inFor = userInfo?.fullName || 'Quản trị viên';

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chào mừng, {inFor}!</h2>
                <p className="text-gray-600">Quản lý và giám sát hệ thống JobMate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Người dùng</h3>
                        <span className="text-2xl font-bold text-blue-600">1,234</span>
                    </div>
                    <p className="text-sm text-gray-500">Tổng số người dùng</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Nhà tuyển dụng</h3>
                        <span className="text-2xl font-bold text-green-600">456</span>
                    </div>
                    <p className="text-sm text-gray-500">Nhà tuyển dụng đã đăng ký</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Tin tuyển dụng</h3>
                        <span className="text-2xl font-bold text-purple-600">892</span>
                    </div>
                    <p className="text-sm text-gray-500">Tổng số tin đăng</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Ứng tuyển</h3>
                        <span className="text-2xl font-bold text-orange-600">3,567</span>
                    </div>
                    <p className="text-sm text-gray-500">Tổng số ứng tuyển</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Người dùng mới đăng ký</p>
                                <p className="text-sm text-gray-500">5 phút trước</p>
                            </div>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Mới</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Tin tuyển dụng mới</p>
                                <p className="text-sm text-gray-500">15 phút trước</p>
                            </div>
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Cập nhật</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Thống kê tuần này</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Người dùng mới</p>
                            <p className="text-sm text-gray-500">+125 người (tăng 12%)</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Tin tuyển dụng</p>
                            <p className="text-sm text-gray-500">+89 tin (tăng 8%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <AdminOverview />;
            case 'users':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
                        <p className="text-gray-600">Quản lý danh sách người dùng trong hệ thống...</p>
                    </div>
                );
            case 'employers':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Quản lý nhà tuyển dụng</h2>
                        <p className="text-gray-600">Quản lý danh sách nhà tuyển dụng...</p>
                    </div>
                );
            case 'statistics':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Thống kê</h2>
                        <p className="text-gray-600">Xem báo cáo và thống kê hệ thống...</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Cài đặt hệ thống</h2>
                        <p className="text-gray-600">Cấu hình và cài đặt hệ thống...</p>
                    </div>
                );
            case 'security':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Bảo mật</h2>
                        <p className="text-gray-600">Quản lý bảo mật và quyền truy cập...</p>
                    </div>
                );
            default:
                return (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
                        <p className="text-gray-600">Nội dung đang được phát triển...</p>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            menuItems={adminMenuItems}
            logo="/vite.svg"
            logoText="JobMate Admin"
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default AdminPage;

