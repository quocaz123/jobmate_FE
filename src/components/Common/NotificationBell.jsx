import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [unread, setUnread] = useState(2);
    const [items, setItems] = useState([]);
    const dropdownRef = useRef(null);

    // 🧩 Mock data
    const mockNotifications = [
        {
            notification_id: 1,
            message: 'Công việc mới phù hợp với bạn vừa được đăng!',
            is_read: false,
            sent_at: '2025-11-01T12:00:00'
        },
        {
            notification_id: 2,
            message: 'Ứng tuyển của bạn đã được chấp nhận.',
            is_read: false,
            sent_at: '2025-11-01T10:20:00'
        },
        {
            notification_id: 3,
            message: 'Nhà tuyển dụng đã xem hồ sơ của bạn.',
            is_read: true,
            sent_at: '2025-10-31T16:45:00'
        }
    ];

    // ✅ Giả lập load dữ liệu
    const refreshCount = async () => {
        const unreadCount = mockNotifications.filter(n => !n.is_read).length;
        setUnread(unreadCount);
    };

    const refreshList = async () => {
        setItems(mockNotifications);
    };

    useEffect(() => {
        refreshCount();
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggleOpen = async () => {
        const next = !open;
        setOpen(next);
        if (next) await refreshList();
    };

    const handleRead = async (id) => {
        const updated = items.map(n =>
            n.notification_id === id ? { ...n, is_read: true } : n
        );
        setItems(updated);
        setUnread(updated.filter(n => !n.is_read).length);
    };

    const handleReadAll = async () => {
        const updated = items.map(n => ({ ...n, is_read: true }));
        setItems(updated);
        setUnread(0);
    };

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
                        <button onClick={handleReadAll} className="text-sm text-indigo-600 hover:underline">
                            Đánh dấu đã đọc tất cả
                        </button>
                    </div>
                    <div className="max-h-80 overflow-auto">
                        {items.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">Không có thông báo</div>
                        ) : (
                            items.map((n) => (
                                <div
                                    key={n.notification_id}
                                    className={`p-3 border-b last:border-b-0 ${n.is_read ? 'bg-white' : 'bg-indigo-50'}`}
                                >
                                    <div className="text-sm text-gray-800">{n.message}</div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            {n.sent_at.replace('T', ' ').slice(0, 19)}
                                        </span>
                                        {!n.is_read && (
                                            <button
                                                onClick={() => handleRead(n.notification_id)}
                                                className="text-xs text-indigo-600 hover:underline"
                                            >
                                                Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
