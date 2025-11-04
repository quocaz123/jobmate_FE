import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import FindJob from '../../components/User/FindJob';
import MessagesPage from '../Common/MessagePage';
import PasswordSetupModal from '../../components/Common/PasswordSetupModal';
import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../utils/userUtils';
import { userMenuItems } from '../../utils/menuConfig';
import Dashboard from './Dashboard';
import JobList from './JobList';
import Application from './Application';
import JobRequest from './JobRequest';


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
                return (<Dashboard />);
            case 'find-jobs':
                return (<JobList />);
            case 'job-requests':
                return (<JobRequest />);
            case 'applications':
                return (<Application />);
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

