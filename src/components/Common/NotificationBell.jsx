import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import notificationService from '../../services/notificationService'; // Đảm bảo đường dẫn đúng

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [unread, setUnread] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    // ===================== LOAD DANH SÁCH =====================
    const refreshList = async () => {
        try {
            setLoading(true);
            const response = await notificationService.getNotifications();
            console.log("🔔 Notifications API response:", response);

            // ✅ Đảm bảo lấy đúng data từ API
            const rawNotifications = response?.data || [];
            console.log("📋 Raw notifications:", rawNotifications.length, "items");
            console.log("📋 First item read status:", rawNotifications[0]?.read);

            const notifications = rawNotifications
                .map((n) => ({
                    id: n?.id,
                    isRead: Boolean(n?.read),
                    title: n?.title || '',
                    message: n?.message || '',
                    createdAt: n?.createdAt || n?.created_at || '',
                }))
                .sort((a, b) => {
                    // Chưa đọc trước, sau đó sắp theo thời gian mới nhất
                    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

            console.log("✅ Processed notifications:", notifications.length);
            console.log("📊 Unread count:", notifications.filter((n) => !n.isRead).length);

            setItems(notifications);
            setUnread(notifications.filter((n) => !n.isRead).length);
        } catch (error) {
            console.error('❌ Lỗi khi tải thông báo:', error);
        } finally {
            setLoading(false);
        }
    };

    // ===================== ĐÁNH DẤU ĐÃ ĐỌC =====================
    const handleRead = async (id) => {
        try {
            // ✅ Optimistic update - cập nhật UI ngay lập tức
            setItems(prev => prev.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            ));
            setUnread(prev => Math.max(0, prev - 1));

            console.log('🔔 Marking as read:', id);
            const response = await notificationService.markAsRead(id);
            console.log('✅ Mark as read response:', response);

            // ⚠️ KHÔNG cần refreshList() vì backend không update đúng
            // UI đã được update bằng optimistic update ở trên
        } catch (err) {
            console.error('❌ Lỗi khi đánh dấu đã đọc:', err);
            // Rollback nếu lỗi - đặt lại thành chưa đọc
            setItems(prev => prev.map(n =>
                n.id === id ? { ...n, isRead: false } : n
            ));
            setUnread(prev => prev + 1);
        }
    };

    const handleReadAll = async () => {
        try {
            const unreadItems = items.filter((n) => !n.isRead);
            if (unreadItems.length === 0) return;

            // ✅ Optimistic update
            setItems(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnread(0);

            console.log('🔔 Marking all as read:', unreadItems.length, 'items');
            await Promise.all(unreadItems.map((n) => notificationService.markAsRead(n.id)));
            console.log('✅ All marked as read');

            // ⚠️ KHÔNG cần refreshList() vì backend không update đúng
        } catch (err) {
            console.error('❌ Lỗi khi đánh dấu tất cả:', err);
            // Rollback nếu lỗi
            await refreshList();
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm('Bạn có chắc muốn xóa tất cả thông báo?')) return;

        try {
            // ✅ Optimistic update - xóa UI ngay
            setItems([]);
            setUnread(0);

            console.log('🗑️ Deleting all notifications');
            await notificationService.deleteAll();
            console.log('✅ All notifications deleted');
        } catch (err) {
            console.error('❌ Lỗi khi xóa tất cả:', err);
            // Rollback nếu lỗi
            await refreshList();
        }
    };    // ===================== UI HANDLER =====================
    useEffect(() => {
        refreshList();
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggleOpen = async () => {
        const next = !open;
        setOpen(next);
        if (next) await refreshList();
    };

    // ===================== RENDER =====================
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-700" />
                {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-lg z-50">
                    <div className="flex items-center justify-between p-3 border-b">
                        <span className="font-semibold text-gray-700">Thông báo</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReadAll}
                                className="text-xs text-indigo-600 hover:underline"
                                disabled={unread === 0}
                            >
                                Đọc tất cả
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={handleDeleteAll}
                                className="text-xs text-red-600 hover:underline"
                                disabled={items.length === 0}
                            >
                                Xóa tất cả
                            </button>
                        </div>
                    </div>

                    <div className="max-h-80 overflow-auto">
                        {loading ? (
                            <div className="p-4 space-y-3 animate-pulse">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">Không có thông báo</div>
                        ) : (
                            items.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => !n.isRead && handleRead(n.id)}
                                    className={`w-full text-left p-3 border-b last:border-b-0 transition-colors group ${n.isRead
                                        ? 'bg-white hover:bg-gray-50'
                                        : 'bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {!n.isRead && (
                                            <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                                        )}
                                        <div className="flex-1">
                                            {n.title && (
                                                <p
                                                    className={`text-sm font-medium ${n.isRead ? 'text-gray-700' : 'text-gray-900'
                                                        }`}
                                                >
                                                    {n.title}
                                                </p>
                                            )}
                                            <p
                                                className={`text-sm mt-1 ${n.isRead ? 'text-gray-600' : 'text-gray-800'
                                                    }`}
                                            >
                                                {n.message}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs text-gray-400">
                                                    {n.createdAt
                                                        ?.replace('T', ' ')
                                                        .slice(0, 19) || ''}
                                                </span>
                                                {!n.isRead && (
                                                    <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Click để đánh dấu đã đọc
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
