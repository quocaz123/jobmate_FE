import React from 'react'
import { Search, ChevronDown, Filter } from 'lucide-react'

const StudentSearchFilter = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-2">Tìm sinh viên phù hợp</h2>
      <p className="text-gray-600 mb-6">
        Kết nối với sinh viên đang tìm việc phù hợp với yêu cầu của bạn
      </p>

      {/* Search and Filter Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo kỹ năng, chuyên ngành, trường..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Tất cả địa điểm</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Tất cả kỹ năng</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Lọc</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentSearchFilter
