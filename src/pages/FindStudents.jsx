import React from 'react'
import Sidebar from '../components/Sidebar'
import NotificationBell from '../components/NotificationBell'
import StudentSearchFilter from '../components/StudentSearchFilter'
import StudentListSection from '../components/StudentListSection'

const FindStudents = () => {
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
                    Tìm sinh viên
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Kết nối với sinh viên đang tìm việc phù hợp với yêu cầu của bạn
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Tất cả sinh viên</option>
                      <option>Phù hợp nhất</option>
                      <option>Mới nhất</option>
                      <option>Đánh giá cao</option>
                    </select>
                  </div>
                  
                  {/* Notification Bell */}
                  <NotificationBell />
                </div>
              </div>
            </div>
            
            {/* Student Search Filter */}
            <StudentSearchFilter />
            
            {/* Student List Section */}
            <StudentListSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindStudents
