import React from 'react';

const Avatar = ({ name }) => (
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-teal-50 flex items-center justify-center text-sm font-semibold text-indigo-700">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
);

const UsersTable = ({ users, onView, onToggleBlock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Người dùng</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Vai trò</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Email</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Trạng thái</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Tham gia</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Chưa có người dùng. Người dùng sẽ xuất hiện khi họ đăng ký.</td>
            </tr>
          )}

          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-3">
                <Avatar name={u.name} />
                <div>
                  <div className="font-medium text-gray-900">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.phone || ''}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">{u.role}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
              <td className="px-4 py-3 text-sm">
                {u.status === 'blocked' ? (
                  <span className="text-sm text-red-600">Bị khóa</span>
                ) : (
                  <span className="text-sm text-green-600">Đang hoạt động</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{u.createdAt}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm px-3 py-1 rounded border bg-white hover:shadow-sm flex items-center gap-2"
                    onClick={() => onView(u)}
                    title="Xem"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s4.5-7.5 9.5-7.5S21.5 12 21.5 12 17 19.5 12 19.5 2.5 12 2.5 12z" />
                    </svg>
                    <span className="hidden md:inline">Xem</span>
                  </button>
                  <button
                    className={`text-sm px-3 py-1 rounded border flex items-center gap-2 ${u.status === 'blocked' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}
                    onClick={() => onToggleBlock(u)}
                    title={u.status === 'blocked' ? 'Mở khóa' : 'Khóa'}
                  >
                    {u.status === 'blocked' ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c.667-2 4-2 4-2V7a4 4 0 10-8 0v2s3.333 0 4 2z" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 11v8h14v-8" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c.667-2 4-2 4-2V7a4 4 0 10-8 0v2s3.333 0 4 2z" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 11v8h14v-8" />
                      </svg>
                    )}
                    <span className="hidden md:inline">{u.status === 'blocked' ? 'Mở khóa' : 'Khóa'}</span>
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

export default UsersTable;
