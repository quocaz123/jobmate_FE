import React from 'react';

const Avatar = ({ name }) => (
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-teal-50 flex items-center justify-center text-sm font-semibold text-indigo-700">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
);

const EmployersTable = ({ employers, onView, onToggleSuspend }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Nhà tuyển dụng</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Công ty</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Email</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Trạng thái</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Tin đăng</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employers.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Chưa có nhà tuyển dụng. Danh sách sẽ hiển thị khi có tài khoản.</td>
            </tr>
          )}

          {employers.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-3">
                <Avatar name={e.contactName} />
                <div>
                  <div className="font-medium text-gray-900">{e.contactName}</div>
                  <div className="text-xs text-gray-500">{e.phone || ''}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{e.company}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{e.email}</td>
              <td className="px-4 py-3 text-sm">
                {e.status === 'suspended' ? (
                  <span className="text-sm text-red-600">Bị khóa</span>
                ) : (
                  <span className="text-sm text-green-600">Đang hoạt động</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{e.jobsCount || 0}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button className="text-sm px-3 py-1 rounded border bg-white hover:shadow-sm" onClick={() => onView(e)}>Xem</button>
                  <button className={`text-sm px-3 py-1 rounded border ${e.status === 'suspended' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`} onClick={() => onToggleSuspend(e)}>
                    {e.status === 'suspended' ? 'Mở khóa' : 'Khóa'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployersTable;
