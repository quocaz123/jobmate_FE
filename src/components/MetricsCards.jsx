import React from 'react'
import { Eye, Users, Briefcase, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'

const MetricsCards = () => {
  const metrics = [
    {
      icon: Eye,
      title: 'Tổng lượt xem',
      value: '2,456',
      change: '+12.5%',
      isPositive: true,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Tổng ứng viên',
      value: '184',
      change: '+8.2%',
      isPositive: true,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Briefcase,
      title: 'Tin đang hoạt động',
      value: '8',
      change: '-2',
      isPositive: false,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: TrendingUp,
      title: 'Tỷ lệ chấp nhận',
      value: '68%',
      change: '+5.3%',
      isPositive: true,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
              <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
            </div>
            <div className="flex items-center gap-1">
              {metric.isPositive ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricsCards
