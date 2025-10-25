import React from 'react'
import { Bell, User, Briefcase, MessageSquare, Clock } from 'lucide-react'

const NotificationsSection = () => {
  const notifications = [
    {
      icon: User,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Ứng viên mới',
      description: 'Nguyễn Văn A đã ứng tuyển vào vị trí Frontend Developer',
      time: '5 phút trước',
      unread: true
    },
    {
      icon: Briefcase,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Tin tuyển dụng',
      description: 'Tin tuyển dụng "Backend Developer" đã được duyệt',
      time: '1 giờ trước',
      unread: true
    },
    {
      icon: MessageSquare,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'Tin nhắn mới',
      description: 'Bạn có 3 tin nhắn chưa đọc từ ứng viên',
      time: '2 giờ trước',
      unread: false
    },
    {
      icon: Clock,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Nhắc nhở',
      description: 'Cuộc phỏng vấn với Trần Thị B vào lúc 14:00 hôm nay',
      time: '3 giờ trước',
      unread: false
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-black">Thông báo</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border transition-colors ${
              notification.unread 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${notification.bgColor} rounded-lg flex items-center justify-center`}>
                <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-black">{notification.title}</h3>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{notification.description}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsSection
