import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminStatsCards from './components/AdminStatsCards';
import AdminTabs from './components/AdminTabs';
import AdminContent from './components/AdminContent';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeMenu, setActiveMenu] = useState('dashboard'); // State cho sidebar


    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 1. Sidebar */}
            <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            
            {/* 2. Main Content (with offset for sidebar) */}
            <div className="ml-64 w-[calc(100%-16rem)]">
                <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="flex justify-end items-center mb-8">
                        <span className="text-gray-700 font-medium">Xin chào, Admin</span>
                    </div>

                    {/* Dashboard Grid */}
                    <AdminStatsCards />

                    {/* Tabs */}
                    <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Tab Content */}
                    <AdminContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;