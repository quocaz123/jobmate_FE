import React, { useMemo, useState } from 'react';
import StatsCard from '../Common/StatsCard';
import PostFilters from './PostFilters';
import PostsTable from './PostsTable';
import Pagination from '../Common/Pagination';
import Modal from '../Common/Modal';

const PostsManagement = () => {
  const [posts, setPosts] = useState([]); // start empty until connected to API

  const [filters, setFilters] = useState({ q: '', category: '', status: '', pageSize: 10 });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return posts.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (!q) return true;
      return (p.title + (p.author || '')).toLowerCase().includes(q);
    });
  }, [posts, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));
  React.useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages]);

  const start = (page - 1) * filters.pageSize;
  const pageItems = filtered.slice(start, start + filters.pageSize);

  const handleTogglePublish = (post) => {
    const ok = window.confirm(post.status === 'published' ? 'Hủy xuất bản bài viết này?' : 'Xuất bản bài viết này?');
    if (!ok) return;
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
  };

  const handleDelete = (post) => {
    if (!window.confirm('Xóa bài viết này?')) return;
    setPosts(prev => prev.filter(p => p.id !== post.id));
  };

  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (post) => { setSelectedPost(post); setOpen(true); };

  // KPI numbers
  const total = posts.length;
  const published = posts.filter(p => p.status === 'published').length;
  const drafts = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
            <p className="text-gray-600">Quản lý nội dung bài viết trên hệ thống</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Tổng bài viết" value={total} timeAgo="Cập nhật: —" />
          <StatsCard title="Đã xuất bản" value={published} timeAgo="Cập nhật: —" />
          <StatsCard title="Bản nháp" value={drafts} timeAgo="Cập nhật: —" />
        </div>

        <PostFilters filters={filters} onChange={(next) => { setFilters(next); setPage(1); }} />

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="mb-0 font-medium">Danh sách bài viết</div>
          </div>

          <div className="p-4 max-h-[55vh] overflow-y-auto">
            <PostsTable posts={pageItems} onView={handleView} onTogglePublish={handleTogglePublish} onDelete={handleDelete} />
          </div>

          <div className="p-4">
            <Pagination currentPage={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
          </div>
        </div>

        <Modal open={open} title={selectedPost ? selectedPost.title : 'Chi tiết bài viết'} onClose={() => setOpen(false)}>
          {selectedPost ? (
            <div className="space-y-3">
              <div className="text-lg font-semibold">{selectedPost.title}</div>
              <div className="text-sm text-gray-500">Tác giả: {selectedPost.author || '-'}</div>
              <div className="pt-2 text-gray-700">{selectedPost.content || selectedPost.excerpt || 'Không có nội dung chi tiết.'}</div>
              <div className="pt-4">
                <button onClick={() => setOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded">Đóng</button>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default PostsManagement;
