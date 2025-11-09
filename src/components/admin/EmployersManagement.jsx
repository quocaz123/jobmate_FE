import React from 'react';

const EmployersManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý nhà tuyển dụng</h2>
      <p className="text-gray-600 mb-6">Quản lý tài khoản và hoạt động của nhà tuyển dụng.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Tổng nhà tuyển dụng</p>
          <p className="text-xl font-semibold">342</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Đang hoạt động</p>
          <p className="text-xl font-semibold">305</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">Tin đang đăng</p>
          <p className="text-xl font-semibold">128</p>
        </div>
      </div>

      <div className="border rounded">
        <div className="p-4 border-b bg-gray-50 font-medium">Danh sách nhà tuyển dụng (demo)</div>
        <div className="p-4 text-gray-500">Bảng dữ liệu sẽ hiển thị tại đây.</div>
      </div>
    </div>
  );
};

export default EmployersManagement;


