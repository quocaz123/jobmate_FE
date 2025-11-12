import React, { useEffect, useMemo, useState } from 'react';
import { Search, Eye, Check, X } from 'lucide-react';
import { getAllUsers } from '../../services/userService';

const PAGE_SIZE = 10;

const badgeByStatus = (status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'ACTIVE':
      return 'bg-green-100 text-green-700';
    case 'BANNED':
    case 'REJECTED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function EmployersManagement() {
  const [tab, setTab] = useState('pending'); // pending | approved | rejected
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true);
      setError('');
      try {
        const serverStatus =
          tab === 'pending' ? 'PENDING' : tab === 'approved' ? 'ACTIVE' : 'BANNED';
        const res = await getAllUsers(Math.max(page - 1, 0), PAGE_SIZE, serverStatus, 'EMPLOYER');
        const payload = res?.data?.data || {};
        const data = Array.isArray(payload?.data) ? payload.data : [];

        const mapped = data.map((u) => ({
          id: u.id,
          name: u.fullName || 'Chưa cập nhật',
          email: u.email || '',
          phone: u.contactPhone || '',
          company: u.companyName || u.address || '—',
          address: u.address || '—',
          createdAt: u.createdAt || null,
          status: u.status || 'UNKNOWN',
          avatarUrl: u.avatarUrl || '',
        }));

        setRows(mapped);
        setTotalPages(payload.totalPages || 1);
        setTotalElements(payload.totalElements || mapped.length);
      } catch (err) {
        setError(err?.response?.data?.message || 'Không tải được danh sách NTD');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, [tab, page]);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        (r.company || '').toLowerCase().includes(q)
    );
  }, [rows, search]);

  const start = totalElements === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = totalElements === 0 ? 0 : Math.min(page * PAGE_SIZE, totalElements);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Quản lý Nhà tuyển dụng</h1>
        <p className="text-gray-500 mt-2">Duyệt và quản lý tài khoản nhà tuyển dụng</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('pending')}
            className={`px-4 py-2 rounded-full ${tab === 'pending' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Chờ duyệt
          </button>
          <button
            onClick={() => setTab('approved')}
            className={`px-4 py-2 rounded-full ${tab === 'approved' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setTab('rejected')}
            className={`px-4 py-2 rounded-full ${tab === 'rejected' ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">
              Nhà tuyển dụng {tab === 'pending' ? 'chờ duyệt' : tab === 'approved' ? 'đã duyệt' : 'đã từ chối'}
            </h2>
            <p className="text-sm text-gray-500">
              Hiển thị {start}-{end} trên tổng số {totalElements} tài khoản
            </p>
          </div>
          <div className="w-80">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Search size={16} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Người đại diện</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Công ty</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Liên hệ</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Ngày đăng ký</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Trạng thái</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-600 uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Đang tải...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-red-500">{error}</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Không có dữ liệu</td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {r.avatarUrl ? (
                          <img
                            src={r.avatarUrl}
                            alt={r.name}
                            className="h-10 w-10 rounded-full object-cover border"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-100 border flex items-center justify-center text-gray-600 font-semibold">
                            {(r.name || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{r.name}</p>
                          <p className="text-xs text-gray-500">ID: {r.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{r.company}</div>
                      <div className="text-xs text-gray-500">{r.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{r.email}</div>
                      <div className="text-xs text-gray-500">{r.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeByStatus(r.status)}`}>
                        {r.status === 'PENDING' ? 'Chờ duyệt' : r.status === 'ACTIVE' ? 'Đang hoạt động' : 'Đã từ chối/Khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 text-xs hover:bg-gray-50">
                          <Eye size={14} /> Xem
                        </button>
                        {r.status === 'PENDING' && (
                          <>
                            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-600 text-xs hover:opacity-90">
                              <Check size={14} /> Duyệt
                            </button>
                            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-red-600 text-xs hover:bg-red-700">
                              <X size={14} /> Từ chối
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-500">
            Hiển thị {start}-{end} trên {totalElements}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`h-9 w-9 rounded border ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              ‹
            </button>
            <span className="text-sm text-gray-600">
              Trang {page} / {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`h-9 w-9 rounded border ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}