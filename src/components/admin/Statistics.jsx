import React from 'react';

const Statistics = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Thống kê</h2>
      <p className="text-gray-600 mb-6">Báo cáo và biểu đồ hiệu năng hệ thống (demo).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded h-64 flex items-center justify-center text-gray-500">
          Biểu đồ người dùng
        </div>
        <div className="p-4 bg-gray-50 rounded h-64 flex items-center justify-center text-gray-500">
          Biểu đồ tin tuyển dụng
        </div>
      </div>
    </div>
  );
};

export default Statistics;


