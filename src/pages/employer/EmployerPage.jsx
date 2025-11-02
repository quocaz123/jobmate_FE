import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../utils/userUtils';
import { employerMenuItems } from '../../utils/menuConfig';

// Component cho Overview
const EmployerOverview = () => {
    const userInfo = getUserInfo();
    const inFor = userInfo?.fullName || 'Nhà tuyển dụng';

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chào mừng, {inFor}!</h2>
                <p className="text-gray-600">Quản lý tuyển dụng hiệu quả với JobMate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Tin đăng</h3>
                        <span className="text-2xl font-bold text-blue-600">12</span>
                    </div>
                    <p className="text-sm text-gray-500">Tin tuyển dụng đang hoạt động</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Ứng viên</h3>
                        <span className="text-2xl font-bold text-green-600">45</span>
                    </div>
                    <p className="text-sm text-gray-500">Ứng viên đã ứng tuyển</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Phỏng vấn</h3>
                        <span className="text-2xl font-bold text-purple-600">8</span>
                    </div>
                    <p className="text-sm text-gray-500">Lịch phỏng vấn sắp tới</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Tin nhắn</h3>
                        <span className="text-2xl font-bold text-orange-600">5</span>
                    </div>
                    <p className="text-sm text-gray-500">Tin nhắn chưa đọc</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Ứng viên mới nhất</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Nguyễn Văn A</p>
                                <p className="text-sm text-gray-500">Frontend Developer</p>
                            </div>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Mới</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Trần Thị B</p>
                                <p className="text-sm text-gray-500">Backend Developer</p>
                            </div>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Mới</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Tin tuyển dụng nổi bật</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Senior Frontend Developer</p>
                            <p className="text-sm text-gray-500">Đã có 25 ứng viên ứng tuyển</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Product Manager</p>
                            <p className="text-sm text-gray-500">Đã có 18 ứng viên ứng tuyển</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmployerPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <EmployerOverview />;
            case 'post-job':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Đăng tin tuyển dụng</h2>
                        <p className="text-gray-600">Form đăng tin tuyển dụng sẽ được hiển thị ở đây...</p>
                    </div>
                );
            case 'manage-jobs':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Quản lý tin tuyển dụng</h2>
                        <p className="text-gray-600">Danh sách và quản lý các tin tuyển dụng...</p>
                    </div>
                );
            case 'candidates':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Ứng viên</h2>
                        <p className="text-gray-600">Danh sách ứng viên đã ứng tuyển...</p>
                    </div>
                );
            case 'search-candidates':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Tìm ứng viên</h2>
                        <p className="text-gray-600">Tìm kiếm và lọc ứng viên...</p>
                    </div>
                );
            case 'messages':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Tin nhắn</h2>
                        <p className="text-gray-600">Quản lý tin nhắn với ứng viên...</p>
                    </div>
                );
            case 'company-profile':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Hồ sơ công ty</h2>
                        <p className="text-gray-600">Quản lý thông tin công ty...</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Cài đặt</h2>
                        <p className="text-gray-600">Cài đặt tài khoản và hệ thống...</p>
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
            menuItems={employerMenuItems}
            logo="/vite.svg"
            logoText="JobMate Employer"
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default EmployerPage;

