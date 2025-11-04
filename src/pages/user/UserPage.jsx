import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../utils/userUtils';
import { userMenuItems } from '../../utils/menuConfig';
import FindJob from '../../components/User/FindJob';
import MessagesPage from '../Common/MessagePage';
import PasswordSetupModal from '../../components/Common/PasswordSetupModal';

// Component cho Overview
const UserOverview = () => {
    const userInfo = getUserInfo();
    const inFor = userInfo?.fullName || 'Người dùng';

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chào mừng, {inFor}!</h2>
                <p className="text-gray-600">Tìm việc làm phù hợp với lịch học của bạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Việc làm</h3>
                        <span className="text-2xl font-bold text-blue-600">24</span>
                    </div>
                    <p className="text-sm text-gray-500">Công việc phù hợp</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Ứng tuyển</h3>
                        <span className="text-2xl font-bold text-green-600">8</span>
                    </div>
                    <p className="text-sm text-gray-500">Đã ứng tuyển</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Phỏng vấn</h3>
                        <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <p className="text-sm text-gray-500">Lịch phỏng vấn</p>
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
                    <h3 className="text-lg font-semibold mb-4">Việc làm đề xuất</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Frontend Developer</p>
                                <p className="text-sm text-gray-500">Công ty ABC - Part-time</p>
                            </div>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Mới</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p className="font-medium">Gia sư Tiếng Anh</p>
                                <p className="text-sm text-gray-500">Trung tâm XYZ - Flexible</p>
                            </div>
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Hot</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Ứng tuyển gần đây</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Backend Developer</p>
                            <p className="text-sm text-gray-500">Đang xem xét</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                            <p className="font-medium">Content Writer</p>
                            <p className="text-sm text-gray-500">Đã được chấp nhận</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Kiểm tra xem có authResponse từ OAuth login không
        const authResponseStr = localStorage.getItem('authResponse');
        if (authResponseStr) {
            try {
                const authResponse = JSON.parse(authResponseStr);

                // Check nếu cần setup password
                if (authResponse.requiresPasswordSetup) {
                    setUserInfo({
                        email: authResponse.userEmail,
                        name: authResponse.userName
                    });
                    setShowPasswordModal(true);
                }

                // Xóa authResponse sau khi đã xử lý (chỉ hiện 1 lần)
                localStorage.removeItem('authResponse');
            } catch (error) {
                console.error('Error parsing authResponse:', error);
            }
        }
    }, []);

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <UserOverview />;
            case 'find-jobs':
                return <FindJob />;
            case 'job-requests':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Yêu cầu tìm việc</h2>
                        <p className="text-gray-600">Tạo yêu cầu tìm việc để nhận đề xuất...</p>
                    </div>
                );
            case 'applications':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Ứng tuyển của tôi</h2>
                        <p className="text-gray-600">Xem danh sách các công việc đã ứng tuyển...</p>
                    </div>
                );
            case 'messages':
                return <MessagesPage />;
            case 'schedule':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Lịch làm việc</h2>
                        <p className="text-gray-600">Quản lý lịch làm việc và phỏng vấn...</p>
                    </div>
                );
            case 'profile':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Hồ sơ</h2>
                        <p className="text-gray-600">Quản lý hồ sơ cá nhân...</p>
                    </div>
                );
            case 'verify-id':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Xác minh CCCD</h2>
                        <p className="text-gray-600">Xác minh thông tin cá nhân...</p>
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
        <>
            <DashboardLayout
                activeTab={activeTab}
                onTabChange={setActiveTab}
                menuItems={userMenuItems}
                logo="/vite.svg"
                logoText="JobMate"
            >
                {renderContent()}
            </DashboardLayout>

            {/* Password Setup Modal */}
            <PasswordSetupModal
                isOpen={showPasswordModal}
                onClose={handleClosePasswordModal}
                userEmail={userInfo?.email}
                userName={userInfo?.name}
            />
        </>
    );
};

export default UserPage;

