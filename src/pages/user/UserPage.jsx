import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../services/userService';
import { userMenuItems } from '../../utils/menuConfig';
import Dashboard from './Dashboard';
import JobList from './JobList';
import JobListDetail from './JobListDetail';
import Application from './Application';
import ApplicationDetail from './ApplicationDetail';
import JobRequest from './JobRequest';
import Profile from './Profile';
import WorkSchedule from './WorkSchedule';
import VerifyCCCD from './VerifyCCCD';
import MessagesPage from '../Common/MessagePage';

const UserPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const res = await getUserInfo();
                if (res?.data?.data) {
                    const userData = res.data.data;
                    setAvatarUrl(userData.avatarUrl || userData.avatar || null);
                    // Lưu thông tin user
                    setUserInfo({
                        fullName: userData.fullName || userData.name || 'Người dùng',
                        email: userData.email || '',
                        role: userData.role || 'User',
                        roles: userData.roles || [],
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        };
        loadUserInfo();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Dashboard />;
            case 'find-jobs':
                return (
                    <JobList
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
                    />
                );
            case 'applications':
                return (
                    <Application
                        onViewDetail={(id) => {
                            setSelectedApplicationId(id);
                            setActiveTab('application-detail');
                        }}
                    />
                );
            case 'application-detail':
                return (
                    <ApplicationDetail
                        id={selectedApplicationId}
                        onBack={() => setActiveTab('applications')}
                    />
                );
            case 'messages':
                return <MessagesPage />;
            case 'schedule':
                return <WorkSchedule events={[]} />;
            case 'profile':
                return <Profile userInfo={userInfo} />;
            case 'verify-id':
                return <VerifyCCCD />;
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
    );
};

export default UserPage;
