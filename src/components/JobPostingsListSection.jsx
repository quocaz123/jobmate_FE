import React, { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import JobPostingListItem from './JobPostingListItem'

const JobPostingsListSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('Tất cả')

  const jobPostings = [
    {
      id: 1,
      title: 'Nhân viên phục vụ',
      location: 'Quận 1, TP.HCM',
      salary: '$ 25.000đ/giờ',
      type: 'Part-time',
      status: 'Đang hoạt động',
      applicants: 24,
      views: 156
    },
    {
      id: 2,
      title: 'Nhân viên bán hàng',
      location: 'Quận 3, TP.HCM',
      salary: '$ 30.000đ/giờ',
      type: 'Part-time',
      status: 'Đang hoạt động',
      applicants: 18,
      views: 98
    },
    {
      id: 3,
      title: 'Gia sư Toán',
      location: 'Quận 7, TP.HCM',
      salary: '$ 100.000đ/giờ',
      type: 'Freelance',
      status: 'Chờ duyệt',
      applicants: 0,
      views: 0
    },
    {
      id: 4,
      title: 'Nhân viên Marketing',
      location: 'Quận 2, TP.HCM',
      salary: '$ 35.000đ/giờ',
      type: 'Part-time',
      status: 'Hết hạn',
      applicants: 42,
      views: 234
    }
  ]

  const filterOptions = ['Tất cả', 'Đang hoạt động', 'Chờ duyệt', 'Hết hạn']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-black">Danh sách tin đăng</h2>
            <p className="text-gray-600 text-sm mt-1">Quản lý và theo dõi các tin tuyển dụng của bạn</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Đăng tin mới
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm tin tuyển dụng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Postings List */}
      <div className="p-6">
        <div className="space-y-4">
          {jobPostings.map((job) => (
            <JobPostingListItem key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobPostingsListSection
