import React from 'react';

const PostsTable = ({ posts, onView, onTogglePublish, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Tiêu đề</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Tác giả</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Chuyên mục</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Trạng thái</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Ngày tạo</th>
            <th className="px-4 py-3 sticky top-0 bg-white z-10">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">Chưa có bài viết. Bài viết sẽ xuất hiện khi được tạo.</td>
            </tr>
          )}

          {posts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{p.title}</div>
                <div className="text-xs text-gray-500">{p.excerpt}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{p.author || '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{p.category || '-'}</td>
              <td className="px-4 py-3 text-sm">
                {p.status === 'published' ? (
                  <span className="text-sm text-green-600">Đã xuất bản</span>
                ) : (
                  <span className="text-sm text-gray-600">Bản nháp</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{p.createdAt}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm px-3 py-1 rounded border bg-white hover:shadow-sm"
                    onClick={() => onView(p)}
                  >Xem</button>

                  <button
                    className={`text-sm px-3 py-1 rounded border flex items-center ${p.status === 'published' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}
                    onClick={() => onTogglePublish(p)}
                  >{p.status === 'published' ? 'Hủy xuất bản' : 'Xuất bản'}</button>

                  <button
                    className="text-sm px-3 py-1 rounded border bg-red-50 text-red-700"
                    onClick={() => onDelete(p)}
                  >Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
