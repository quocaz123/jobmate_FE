import React, { useState } from 'react'
import { Bell, X } from 'lucide-react'

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: 'Ứng viên mới',
      message: 'Nguyễn Văn A đã ứng tuyển vào vị trí Frontend Developer',
      time: '5 phút trước',
      unread: true
    },
    {
      id: 2,
      title: 'Tin tuyển dụng',
      message: 'Tin tuyển dụng "Backend Developer" đã được duyệt',
      time: '1 giờ trước',
      unread: true
    },
    {
      id: 3,
      title: 'Tin nhắn mới',
      message: 'Bạn có 3 tin nhắn chưa đọc từ ứng viên',
      time: '2 giờ trước',
      unread: false
    }
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="relative">
    {/* Bell Icon */}
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
    >
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>

    {/* Dropdown */}
    {isOpen && (
      <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Thông báo</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                notification.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            Xem tất cả thông báo
          </button>
        </div>
      </div>
    )}

    {/* Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setIsOpen(false)}
      />
    )}
  </div>
  )
}

export default NotificationBell
