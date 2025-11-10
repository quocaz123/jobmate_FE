import React from 'react';

const AdminTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white p-2 rounded-xl shadow-sm mb-4 inline-flex border border-gray-200">
            {['overview', 'jobs', 'reports', 'users'].map((tabKey) => (
                <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        activeTab === tabKey 
                            ? 'bg-red-500 text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    {tabKey === 'overview' && 'Tổng quan'}
                    {tabKey === 'jobs' && 'Kiểm duyệt công việc'}
                    {tabKey === 'reports' && 'Báo cáo'}
                    {tabKey === 'users' && 'Người dùng mới'}
                </button>
            ))}
        </div>
    );
};

export default AdminTabs;
