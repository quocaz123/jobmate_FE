import React from 'react';
import { Eye, Edit, Ban, CheckCircle, XCircle, Clock, User, Briefcase } from 'lucide-react';

const UserList = ({ users, onViewUser, onEditUser, onBanUser, onUnbanUser }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Hoạt động', icon: CheckCircle },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Không hoạt động', icon: XCircle },
      banned: { color: 'bg-red-100 text-red-800', text: 'Bị cấm', icon: Ban },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ xác thực', icon: Clock },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const getUserTypeIcon = (type) => {
    return type === 'student' ? (
      <User className="w-4 h-4 text-blue-600" />
    ) : (
      <Briefcase className="w-4 h-4 text-purple-600" />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tham gia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hoạt động cuối
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getUserTypeIcon(user.type)}
                    <span className="text-sm text-gray-900 capitalize">
                      {user.type === 'student' ? 'Sinh viên' : 'Nhà tuyển dụng'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(user.joinDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(user.lastActive)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewUser(user)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditUser(user)}
                      className="text-gray-600 hover:text-gray-900 p-1 rounded"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {user.status === 'banned' ? (
                      <button
                        onClick={() => onUnbanUser(user)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Bỏ cấm"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onBanUser(user)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Cấm người dùng"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Trước
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Sau
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> của{' '}
              <span className="font-medium">{users.length}</span> kết quả
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Trước
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Sau
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
