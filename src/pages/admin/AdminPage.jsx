import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminMenuItems } from '../../utils/menuConfig';
import AdminDashboard from '../../components/admin/AdminDashboard';
import UsersManagement from '../../components/admin/UsersManagement';
import EmployersManagement from '../../components/admin/EmployersManagement';
import Statistics from '../../components/admin/Statistics';
import SystemSettings from '../../components/admin/SystemSettings';
import Security from '../../components/admin/Security';

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
            case 'statistics':
                return <Statistics />;
            case 'settings':
                return <SystemSettings />;
            case 'security':
                return <Security />;
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

