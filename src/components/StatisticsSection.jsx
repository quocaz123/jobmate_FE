import React from 'react'
import { Users, Briefcase, Eye, TrendingUp } from 'lucide-react'

const StatisticsSection = () => {
  const stats = [
    {
      icon: Users,
      label: 'Tổng ứng viên',
      value: '1,234',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: Briefcase,
      label: 'Tin đang mở',
      value: '8',
      change: '+2',
      changeType: 'positive'
    },
    {
      icon: Eye,
      label: 'Lượt xem hôm nay',
      value: '456',
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: TrendingUp,
      label: 'Tỷ lệ ứng tuyển',
      value: '15.2%',
      change: '+2.1%',
      changeType: 'positive'
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
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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

export default StatisticsSection
