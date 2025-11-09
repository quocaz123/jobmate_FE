import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../Common/StatsCard';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${activity.bgColor}`}>
              {activity.icon}
            </div>
            <div>
              <p className="text-sm text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeeklyStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê tuần này</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.sublabel}</p>
            </div>
            <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  // No demo/hardcoded data in overview. Show empty counts/lists until real data is wired.
  const newUsers = [];
  const newEmployers = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chào mừng, admin!</h1>
            <p className="text-sm text-gray-600">Quản lý và giám sát hệ thống JobMate.</p>
          </div>
        </div>

        {/* KPI row (empty-state counts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Người dùng mới" value={newUsers.length} timeAgo="Cập nhật: —" />
          <StatsCard title="Nhà tuyển dụng mới" value={newEmployers.length} timeAgo="Cập nhật: —" />
          <StatsCard title="Tin tuyển dụng" value={0} timeAgo="Cập nhật: —" />
          <StatsCard title="Lượt ứng tuyển" value={0} timeAgo="Cập nhật: —" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Người dùng mới</h3>
            </div>

            {newUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Chưa có người dùng mới. Người dùng sẽ xuất hiện khi họ đăng ký.</div>
            ) : (
              <ul className="space-y-3">
                {newUsers.map((u) => (
                  <li key={u.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                    <div className="text-sm text-gray-500">{u.joinedAt}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nhà tuyển dụng mới</h3>
            </div>

            {newEmployers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Chưa có nhà tuyển dụng mới. Nhà tuyển dụng sẽ xuất hiện khi họ đăng ký.</div>
            ) : (
              <ul className="space-y-3">
                {newEmployers.map((e) => (
                  <li key={e.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{e.companyName}</div>
                      <div className="text-xs text-gray-500">{e.email}</div>
                    </div>
                    <div className="text-sm text-gray-500">{e.submittedDate}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;