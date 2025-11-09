import React, { useMemo, useState } from 'react';
import StatsCard from '../Common/StatsCard';
import UserFilters from './UserFilters';
import UsersTable from './UsersTable';
import Pagination from '../Common/Pagination';
import Modal from '../Common/Modal';

const UsersManagement = () => {
  // Start with empty users list; users will appear after registration or when fetched from API
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({ q: '', role: '', status: '', pageSize: 10 });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return users.filter((u) => {
      if (filters.role && u.role !== filters.role) return false;
      if (filters.status && u.status !== filters.status) return false;
      if (!q) return true;
      return (u.name + u.email).toLowerCase().includes(q);
    });
  }, [users, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));

  // ensure page in range when filters change
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const start = (page - 1) * filters.pageSize;
  const pageItems = filtered.slice(start, start + filters.pageSize);

  const handleToggleBlock = (user) => {
    const confirmText = user.status === 'blocked' ? 'Mở khóa người dùng này?' : 'Khóa người dùng này?';
    if (!window.confirm(confirmText)) return;
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u)));
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // KPI numbers
  const total = users.length;
  const active = users.filter((u) => u.status === 'active').length;
  const blocked = users.filter((u) => u.status === 'blocked').length;

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
            <p className="text-gray-600">Quản lý danh sách người dùng trong hệ thống.</p>
          </div>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Tổng người dùng" value={total} timeAgo="Cập nhật gần nhất" />
          <StatsCard title="Đang hoạt động" value={active} timeAgo="Cập nhật gần nhất" />
          <StatsCard title="Bị khóa" value={blocked} timeAgo="Cập nhật gần nhất" />
        </div>

        <UserFilters filters={filters} onChange={(next) => { setFilters(next); setPage(1); }} />

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="mb-0 font-medium">Danh sách người dùng</div>
          </div>

          {/* Scrollable table area - keep header/filters above and pagination below */}
          <div className="p-4 max-h-[55vh] overflow-y-auto">
            <UsersTable users={pageItems} onView={handleView} onToggleBlock={handleToggleBlock} />
          </div>

          <div className="p-4">
            <Pagination currentPage={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
          </div>
        </div>

        <Modal open={open} title={selectedUser ? selectedUser.name : 'Chi tiết người dùng'} onClose={() => setOpen(false)}>
          {selectedUser ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">{selectedUser.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="text-lg font-semibold">{selectedUser.name}</div>
                  <div className="text-sm text-gray-500">{selectedUser.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Vai trò</div>
                  <div className="font-medium">{selectedUser.role}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Trạng thái</div>
                  <div className="font-medium">{selectedUser.status}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Số điện thoại</div>
                  <div className="font-medium">{selectedUser.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tham gia</div>
                  <div className="font-medium">{selectedUser.createdAt}</div>
                </div>
              </div>

              <div className="pt-2">
                <button onClick={() => { setOpen(false); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Đóng</button>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default UsersManagement;


