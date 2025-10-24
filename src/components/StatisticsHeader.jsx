import React from 'react'
import { ChevronDown, Bell } from 'lucide-react'
import NotificationBell from './NotificationBell'

const StatisticsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thống kê & Báo cáo
          </h1>
          <p className="text-gray-600 text-lg">
            Theo dõi hiệu suất tuyển dụng của bạn
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Time Period Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>30 ngày qua</option>
              <option>7 ngày qua</option>
              <option>90 ngày qua</option>
              <option>1 năm qua</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Notification Bell */}
          <NotificationBell />
        </div>
      </div>
    </div>
  )
}

export default StatisticsHeader
