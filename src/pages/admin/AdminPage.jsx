import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminMenuItems } from '../../utils/menuConfig';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import UsersManagement from '../../components/Admin/UsersManagement';
import EmployersManagement from '../../components/Admin/EmployersManagement';
import ApplicantsManagement from './ApplicantsManagement';
import VerificationCCCD from '../../components/Admin/VerificationCCCD';
import JobReviewManagement from '../../components/Admin/JobReviewManagement';

// Component cho Overview
const AdminOverview = () => {
    return <AdminDashboard />;
};

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <AdminOverview />;
            case 'users':
                return <UsersManagement />;
            case 'employers':
                return <EmployersManagement />;
            case 'job-review':
                return <JobReviewManagement />;
            case 'applicants':
                // Tạm thời dùng UsersManagement cho tab Ứng viên (chưa có component riêng)
                return <ApplicantsManagement />;
            case 'verifications':
                return <VerificationCCCD />;
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

