import React, { useState } from 'react'
import { Clock, Star, DollarSign } from 'lucide-react'

const DetailedAnalysisSection = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'by-job', label: 'Theo công việc' },
    { id: 'by-applicant', label: 'Theo ứng viên' },
    { id: 'by-time', label: 'Theo thời gian' }
  ]

  const analysisMetrics = [
    {
      icon: Clock,
      title: 'Thời gian phản hồi trung bình',
      value: '2.4 giờ',
      description: 'Nhanh hơn 15% so với tháng trước',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Star,
      title: 'Đánh giá trung bình',
      value: '4.7/5.0',
      description: 'Từ 48 đánh giá của ứng viên',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: DollarSign,
      title: 'Mức lương trung bình',
      value: '32.000đ/giờ',
      description: 'Cạnh tranh trong khu vực',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Phân tích chi tiết
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Analysis Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysisMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {metric.title}
                </h3>
              </div>
            </div>
            
            <div className="mb-2">
              <p className="text-2xl font-bold text-gray-900">
                {metric.value}
              </p>
            </div>
            
            <p className="text-sm text-gray-600">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailedAnalysisSection
