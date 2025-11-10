import React from 'react';

const UsersManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      <p className="text-gray-600 mb-6">Quản lý danh sách người dùng trong hệ thống.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Tổng người dùng</p>
          <p className="text-xl font-semibold">2,145</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Đang hoạt động</p>
          <p className="text-xl font-semibold">1,876</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Bị khóa</p>
          <p className="text-xl font-semibold">24</p>
        </div>
      </div>

      <div className="border rounded">
        <div className="p-4 border-b bg-gray-50 font-medium">Danh sách người dùng (demo)</div>
        <div className="p-4 text-gray-500">Bảng dữ liệu sẽ hiển thị tại đây.</div>
      </div>
    </div>
  );
};

export default UsersManagement;


