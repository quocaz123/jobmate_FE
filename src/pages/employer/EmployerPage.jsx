import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../utils/userUtils';
import { employerMenuItems } from '../../utils/menuConfig';
import { EmployerDashboard } from './EmployerDashboard';
import EmployerPost from './EmployerPost';
import EmployerManage from './EmployerManage';
import EmployerCandidates from './EmployerCandidates';

const EmployerPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <EmployerDashboard />;
            case 'post-job':
                return <EmployerPost />;
            case 'manage-jobs':
                return <EmployerManage />;
            case 'candidates':
                return <EmployerCandidates />;
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

