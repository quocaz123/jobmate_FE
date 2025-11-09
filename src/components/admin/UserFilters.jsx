import React from 'react';

const UserFilters = ({ filters, onChange }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm tên hoặc email..."
            className="w-full px-10 py-2 border rounded focus:outline-none"
            value={filters.q}
            onChange={(e) => onChange({ ...filters, q: e.target.value })}
          />
        </div>

        <select
          className="w-full md:w-1/6 px-3 py-2 border rounded mt-2 md:mt-0"
          value={filters.role}
          onChange={(e) => onChange({ ...filters, role: e.target.value })}
        >
          <option value="">Tất cả vai trò</option>
          <option value="student">Sinh viên</option>
          <option value="employer">Nhà tuyển dụng</option>
          <option value="admin">Quản trị viên</option>
        </select>

        <select
          className="w-full md:w-1/6 px-3 py-2 border rounded mt-2 md:mt-0"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="blocked">Bị khóa</option>
        </select>

        <select
          className="w-full md:w-1/6 px-3 py-2 border rounded mt-2 md:mt-0"
          value={filters.pageSize}
          onChange={(e) => onChange({ ...filters, pageSize: Number(e.target.value) })}
        >
          <option value={10}>10 / trang</option>
          <option value={25}>25 / trang</option>
          <option value={50}>50 / trang</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;
