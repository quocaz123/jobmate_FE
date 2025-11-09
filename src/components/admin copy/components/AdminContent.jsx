import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AdminContent = ({ activeTab }) => {
    // Dữ liệu giả định cho phần tabs
    const pendingJobs = [
        { id: 1, title: "Nhân viên phục vụ", company: "Nhà hàng A" },
        { id: 2, title: "Gia sư Toán", company: "Trung tâm B" },
    ];

    const renderOverview = () => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tình trạng hệ thống</h3>
            <p className="text-sm text-gray-500 mb-4">Trạng thái các dịch vụ</p>
            <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">API Server</span>
                </div>
                <span className="text-green-600 bg-green-50 px-3 py-1 text-xs font-medium rounded-full">Hoạt động</span>
            </div>
        </div>
    );

    const renderJobs = () => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Công việc chờ kiểm duyệt ({pendingJobs.length})</h3>
            {pendingJobs.map(job => (
                 <div key={job.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                    <div>
                        <p className="font-semibold text-gray-800">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-sm px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">Xem</button>
                        <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg flex items-center gap-1 hover:bg-green-600">
                            <FaCheckCircle className="w-3 h-3"/> Duyệt
                        </button>
                        <button className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg flex items-center gap-1 hover:bg-red-600">
                            <FaTimesCircle className="w-3 h-3"/> Từ chối
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderReports = () => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Báo cáo & Khiếu nại</h3>
            <p className="text-gray-500">Danh sách báo cáo và khiếu nại từ người dùng</p>
            {/* Thêm nội dung báo cáo ở đây */}
        </div>
    );

    const renderUsers = () => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Người dùng mới</h3>
            <p className="text-gray-500">Danh sách người dùng mới đăng ký</p>
            {/* Thêm nội dung người dùng ở đây */}
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'jobs':
                return renderJobs();
            case 'reports':
                return renderReports();
            case 'users':
                return renderUsers();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="mt-4">
            {renderTabContent()}
        </div>
    );
};

export default AdminContent;
