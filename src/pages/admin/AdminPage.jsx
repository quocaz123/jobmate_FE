import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminMenuItems } from '../../utils/menuConfig';
import AdminDashboard from '../../components/Admin/AdminDashboard.jsx';
import UsersManagement from '../../components/Admin/UsersManagement.jsx';
import ReportsManagement from './ReportsManagement.jsx';
import VerificationCCCD from '../../components/Admin/VerificationCCCD.jsx';
import JobReviewManagement from '../../components/Admin/JobReviewManagement.jsx';
import AuditLogs from '../../components/Admin/AuditLogs.jsx';
import logoImg from '../../assets/logo.jpg';

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
            case 'job-review':
                return <JobReviewManagement />;
            case 'verifications':
                return <VerificationCCCD />;
            case 'audit-logs':
                return <AuditLogs />;
            case 'reports':
                return <ReportsManagement />;
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
            logo={logoImg}
            logoText="JobMate Admin"
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default AdminPage;

