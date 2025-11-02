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
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Tin nhắn</h2>
                        <p className="text-gray-600">Quản lý tin nhắn với nhà tuyển dụng...</p>
                    </div>
                );
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
        <DashboardLayout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            menuItems={userMenuItems}
            logo="/vite.svg"
            logoText="JobMate"
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default UserPage;

