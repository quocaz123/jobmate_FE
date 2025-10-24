import React from 'react'
import Sidebar from '../components/Sidebar'
import StatisticsSection from '../components/StatisticsSection'
import NotificationBell from '../components/NotificationBell'
import RecentJobPostingsSection from '../components/RecentJobPostingsSection'
import NewApplicantsSection from '../components/NewApplicantsSection'

const Overview = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Tổng quan
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Chào mừng bạn quay trở lại! Đây là tổng quan về hoạt động tuyển dụng của bạn.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Time Period Dropdown */}
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Hôm nay</option>
                      <option>7 ngày qua</option>
                      <option>30 ngày qua</option>
                      <option>90 ngày qua</option>
                    </select>
                  </div>
                  
                  {/* Notification Bell */}
                  <NotificationBell />
                </div>
              </div>
            </div>
            
            {/* Statistics Section */}
            <StatisticsSection />
            
            {/* Recent Job Postings Section */}
            <div className="mb-8">
              <RecentJobPostingsSection />
            </div>
            
            {/* New Applicants Section */}
            <NewApplicantsSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
