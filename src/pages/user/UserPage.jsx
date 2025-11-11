import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../services/userService';
import { userMenuItems } from '../../utils/menuConfig';
import PasswordSetupModal from '../../components/Common/PasswordSetupModal';
import Dashboard from './Dashboard';
import JobList from './JobList';
import JobListDetail from './JobListDetail';
import Application from './Application';
import ApplicationDetail from './ApplicationDetail';
import JobRequest from './JobRequest';
import Profile from './Profile';
import WorkSchedule from './WorkSchedule';
import MessagesPage from '../Common/MessagePage';

const UserPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordSetupData, setPasswordSetupData] = useState(null);

    // Kiểm tra xem có cần hiển thị modal setup password không
    useEffect(() => {
        const showSetup = localStorage.getItem('showPasswordSetup');
        const authResponseStr = localStorage.getItem('authResponse');

        if (showSetup === 'true' && authResponseStr) {
            try {
                const authResponse = JSON.parse(authResponseStr);
                if (authResponse?.requiresPasswordSetup) {
                    setPasswordSetupData({
                        userEmail: authResponse.userEmail,
                        userName: authResponse.userName || authResponse.userEmail,
                        userId: authResponse.userId
                    });
                    setShowPasswordModal(true);

                    // Xóa flag sau khi đã hiển thị
                    localStorage.removeItem('showPasswordSetup');
                }
            } catch (error) {
                console.error('Error parsing authResponse:', error);
            }
        }
    }, []);

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const res = await getUserInfo();
                if (res?.data?.data) {
                    const userData = res.data.data;
                    setUserInfo(userData);
                    setAvatarUrl(userData.avatarUrl || userData.avatar || null);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        };
        loadUserInfo();
    }, []);

    const handleAvatarChange = (newUrl) => {
        setAvatarUrl(newUrl || null);
        setUserInfo((prev) => (prev ? { ...prev, avatarUrl: newUrl } : prev));
    };

    const handleProfileUpdate = (updatedProfile) => {
        if (!updatedProfile) return;
        setUserInfo((prev) => (prev ? { ...prev, ...updatedProfile } : updatedProfile));
        if (updatedProfile.avatarUrl) {
            setAvatarUrl(updatedProfile.avatarUrl);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Dashboard />;
            case 'find-jobs':
                return (
                    <JobList
                        userInfo={userInfo}
                        onViewDetail={(id) => {
                            setSelectedJobId(id);
                            setActiveTab('job-detail');
                        }}
                    />
                );
            case 'job-detail':
                return (
                    <JobListDetail
                        id={selectedJobId}
                        onBack={() => setActiveTab('find-jobs')}
                        onStartChat={() => setActiveTab('messages')}
                        userInfo={userInfo}
                    />
                );
            case 'applications':
                return (
                    <Application
                        onViewDetail={(id) => {
                            setSelectedApplicationId(id);
                            setActiveTab('application-detail');
                        }}
                        onStartChat={() => setActiveTab('messages')}
                    />
                );
            case 'application-detail':
                return (
                    <ApplicationDetail
                        id={selectedApplicationId}
                        onBack={() => setActiveTab('applications')}
                        onStartChat={() => setActiveTab('messages')}
                    />
                );
            case 'messages':
                return <MessagesPage />;
            case 'schedule':
                return <WorkSchedule events={[]} />;
            case 'profile':
                return (
                    <Profile
                        userInfo={userInfo}
                        onAvatarChange={handleAvatarChange}
                        onProfileUpdate={handleProfileUpdate}
                    />
                );
            case 'job-requests':
                return <JobRequest />;
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
                avatarUrl={avatarUrl}
            >
                {renderContent()}
            </DashboardLayout>

            {/* Modal setup password cho Google OAuth users */}
            {showPasswordModal && passwordSetupData && (
                <PasswordSetupModal
                    isOpen={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    userEmail={passwordSetupData.userEmail}
                    userName={passwordSetupData.userName}
                    userId={passwordSetupData.userId}
                />
            )}
        </>
    );
};

export default UserPage;
