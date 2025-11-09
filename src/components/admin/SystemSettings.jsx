import React from 'react';

const SystemSettings = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Cài đặt hệ thống</h2>
      <p className="text-gray-600 mb-6">Cấu hình các thông số hệ thống (demo).</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Cấu hình email</p>
          <p className="text-sm text-gray-500">SMTP, sender, template...</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Quy tắc bảo mật</p>
          <p className="text-sm text-gray-500">Mật khẩu, phiên đăng nhập...</p>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;


