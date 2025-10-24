import React from 'react'
import { Users, Eye, TrendingUp, Briefcase } from 'lucide-react'

const RecentActivitySection = () => {
  const activities = [
    {
      id: 1,
      icon: Users,
      description: '5 ứng viên mới ứng tuyển vào Nhân viên phục vụ',
      time: '10 phút trước',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: Eye,
      description: 'Tin tuyển dụng Nhân viên bán hàng được xem 23 lần',
      time: '1 giờ trước',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      icon: TrendingUp,
      description: 'Bạn đã chấp nhận 3 ứng viên cho vị trí Gia sư Toán',
      time: '2 giờ trước',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      icon: Briefcase,
      description: 'Tin tuyển dụng Nhân viên Marketing được phê duyệt',
      time: '1 ngày trước',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Hoạt động gần đây
      </h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            {/* Activity Icon */}
            <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
            </div>
            
            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium mb-1">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivitySection
