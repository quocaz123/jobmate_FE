import React from 'react'
import Sidebar from '../components/Sidebar'
import NotificationBell from '../components/NotificationBell'
import ApplicantsListSection from '../components/ApplicantsListSection'

const ApplicantsPage = () => {
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
                    Ứng viên
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Quản lý và theo dõi các ứng viên đã ứng tuyển vào công ty của bạn
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Tất cả ứng viên</option>
                      <option>Đang chờ</option>
                      <option>Phỏng vấn</option>
                      <option>Đã nhận</option>
                      <option>Từ chối</option>
                    </select>
                  </div>
                  
                  {/* Notification Bell */}
                  <NotificationBell />
                </div>
              </div>
            </div>
            
            {/* Applicants List Section */}
            <ApplicantsListSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantsPage
