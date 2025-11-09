import React, { useMemo, useState } from 'react';
import StatsCard from '../Common/StatsCard';
import EmployerFilters from './EmployerFilters';
import EmployersTable from './EmployersTable';
import Pagination from '../Common/Pagination';
import Modal from '../Common/Modal';

const EmployersManagement = () => {
  const [employers, setEmployers] = useState([]);
  const [filters, setFilters] = useState({ q: '', industry: '', status: '', pageSize: 10 });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return employers.filter((e) => {
      if (filters.industry && e.industry !== filters.industry) return false;
      if (filters.status && e.status !== filters.status) return false;
      if (!q) return true;
      return (e.company + e.email).toLowerCase().includes(q);
    });
  }, [employers, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));
  React.useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages]);

  const start = (page - 1) * filters.pageSize;
  const pageItems = filtered.slice(start, start + filters.pageSize);

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (item) => { setSelected(item); setOpen(true); };
  const handleToggle = (item) => {
    const confirmText = item.status === 'suspended' ? 'Mở khóa nhà tuyển dụng này?' : 'Khóa nhà tuyển dụng này?';
    if (!window.confirm(confirmText)) return;
    setEmployers((prev) => prev.map((e) => (e.id === item.id ? { ...e, status: e.status === 'suspended' ? 'active' : 'suspended' } : e)));
  };

  const total = employers.length;
  const active = employers.filter((e) => e.status === 'active').length;
  const jobs = employers.reduce((s, e) => s + (e.jobsCount || 0), 0);

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quản lý nhà tuyển dụng</h2>
            <p className="text-gray-600">Quản lý tài khoản và hoạt động của nhà tuyển dụng.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Tổng nhà tuyển dụng" value={total} timeAgo="Cập nhật gần nhất" />
          <StatsCard title="Đang hoạt động" value={active} timeAgo="Cập nhật gần nhất" />
          <StatsCard title="Tin đang đăng" value={jobs} timeAgo="Cập nhật gần nhất" />
        </div>

        <EmployerFilters filters={filters} onChange={(n) => { setFilters(n); setPage(1); }} />

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="mb-0 font-medium">Danh sách nhà tuyển dụng</div>
          </div>

          <div className="p-4 max-h-[55vh] overflow-y-auto">
            <EmployersTable employers={pageItems} onView={handleView} onToggleSuspend={handleToggle} />
          </div>

          <div className="p-4">
            <Pagination currentPage={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
          </div>
        </div>

        <Modal open={open} title={selected ? selected.company : 'Chi tiết nhà tuyển dụng'} onClose={() => setOpen(false)}>
          {selected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">{selected.contactName?.charAt(0)?.toUpperCase()}</div>
                <div>
                  <div className="text-lg font-semibold">{selected.company}</div>
                  <div className="text-sm text-gray-500">{selected.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Người liên hệ</div>
                  <div className="font-medium">{selected.contactName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Trạng thái</div>
                  <div className="font-medium">{selected.status}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Ngành</div>
                  <div className="font-medium">{selected.industry}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tin đăng</div>
                  <div className="font-medium">{selected.jobsCount || 0}</div>
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

export default EmployersManagement;



