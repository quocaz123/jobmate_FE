import React from 'react'
import { FileText, CheckCircle, Clock, Users } from 'lucide-react'

const JobPostingOverviewStats = () => {
  const stats = [
    {
      icon: FileText,
      label: 'Tổng tin đăng',
      value: '12',
      change: '+2',
      changeType: 'positive',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle,
      label: 'Đang hoạt động',
      value: '8',
      change: '+1',
      changeType: 'positive',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Chờ duyệt',
      value: '2',
      change: '0',
      changeType: 'neutral',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Users,
      label: 'Tổng ứng viên',
      value: '156',
      change: '+24',
      changeType: 'positive',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default JobPostingOverviewStats
