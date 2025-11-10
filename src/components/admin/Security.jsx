import React from 'react';

const Security = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Bảo mật</h2>
      <p className="text-gray-600 mb-6">Quản lý quyền truy cập và nhật ký bảo mật (demo).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Nhật ký đăng nhập</p>
          <p className="text-sm text-gray-500">Lần đăng nhập gần nhất, IP, thiết bị...</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Phân quyền</p>
          <p className="text-sm text-gray-500">Vai trò, quyền hạn, chính sách...</p>
        </div>
      </div>
    </div>
  );
};

export default Security;


