import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, change, timeAgo, status, icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {status && (
          <span className={`text-xs px-2 py-1 rounded ${
            status === 'Mới' ? 'bg-blue-100 text-blue-600' : 
            status === 'Cập nhật' ? 'bg-green-100 text-green-600' : ''
          }`}>
            {status}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{timeAgo}</p>
        </div>
        {change && (
          <div className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

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
  const overviewStats = [
    {
      title: "Người dùng mới đăng ký",
      value: "125",
      change: "+12%",
      timeAgo: "5 phút trước",
      status: "Mới"
    },
    {
      title: "Tin tuyển dụng",
      value: "89",
      change: "+8%",
      timeAgo: "15 phút trước",
      status: "Cập nhật"
    },
    {
      title: "Lượt ứng tuyển",
      value: "450",
      change: "+15%",
      timeAgo: "1 giờ trước",
      status: "Cập nhật"
    },
    {
      title: "Nhà tuyển dụng mới",
      value: "34",
      change: "+5%",
      timeAgo: "30 phút trước",
      status: "Mới"
    }
  ];

  const recentActivities = [
    {
      title: "Người dùng mới đăng ký",
      time: "5 phút trước",
      bgColor: "bg-blue-100",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Tin tuyển dụng mới",
      time: "15 phút trước",
      bgColor: "bg-green-100",
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const weeklyStats = [
    {
      label: "Người dùng mới",
      sublabel: "+125 người (tăng 12%)",
      change: "+12%"
    },
    {
      label: "Tin tuyển dụng",
      sublabel: "+89 tin (tăng 8%)",
      change: "+8%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chào mừng, admin@jobmate.com!</h1>
            <p className="text-sm text-gray-600">Quản lý và giám sát hệ thống JobMate.</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {overviewStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Activity and Weekly Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentActivity activities={recentActivities} />
          <WeeklyStats stats={weeklyStats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;