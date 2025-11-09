import React from 'react';
import { FaUsers, FaUserGraduate, FaBriefcase, FaClipboardList, FaClock } from 'react-icons/fa';
import { BsExclamationCircle, BsCurrencyDollar, BsGraphUp } from 'react-icons/bs';

const AdminStatsCards = () => {
    const statistics = [
        {
            title: 'Tổng người dùng',
            value: '12,543',
            change: '+12.5%',
            icon: FaUsers,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-100',
        },
        {
            title: 'Sinh viên',
            value: '8,234',
            change: '+8.2%',
            icon: FaUserGraduate,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Nhà tuyển dụng',
            value: '4,309',
            change: '+15.3%',
            icon: FaBriefcase,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Công việc đang hoạt động',
            value: '1,847',
            change: '+23.1%',
            icon: FaClipboardList,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Chờ kiểm duyệt',
            value: '47',
            change: '-5.2%',
            icon: FaClock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            title: 'Báo cáo chưa xử lý',
            value: '12',
            change: '+3',
            icon: BsExclamationCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        {
            title: 'Doanh thu tháng này',
            value: '₫45.2M',
            change: '+18.7%',
            icon: BsCurrencyDollar,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
        },
        {
            title: 'Tỷ lệ thành công',
            value: '87.3%',
            change: '+2.4%',
            icon: BsGraphUp,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
    ];

    // Component cho một thẻ thống kê
    const StatCard = ({ title, value, change, icon: Icon, color, bgColor }) => {
        const isPositive = change.startsWith('+') || (title === 'Báo cáo chưa xử lý' && !change.startsWith('-'));
        const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
        const changeText = title === 'Báo cáo chưa xử lý' 
                           ? `${change} mới` // Hiển thị số lượng mới
                           : `${change} so với tháng trước`;
    
        return (
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
                        <p className={`text-xs ${changeColor} mt-1`}>
                            {changeText}
                        </p>
                    </div>
                    <div className={`p-3 rounded-xl ${bgColor}`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statistics.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default AdminStatsCards;
