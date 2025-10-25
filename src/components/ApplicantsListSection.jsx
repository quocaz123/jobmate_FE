import React, { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import ApplicantCard from './ApplicantCard'

const ApplicantsListSection = () => {
  const [activeTab, setActiveTab] = useState('Tất cả')
  
  const applicants = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      positionApplied: 'Nhân viên phục vụ',
      rating: 4.8,
      location: 'Quận 1, TP.HCM',
      experience: '6 tháng kinh nghiệm',
      skills: ['Giao tiếp tốt', 'Nhiệt tình', 'Chăm chỉ'],
      match: 92,
      status: 'Chờ duyệt'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      positionApplied: 'Nhân viên bán hàng',
      rating: 4.5,
      location: 'Quận 3, TP.HCM',
      experience: '1 năm kinh nghiệm',
      skills: ['Bán hàng', 'Tư vấn', 'Marketing'],
      match: 88,
      status: 'Chờ duyệt'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      positionApplied: 'Nhân viên phục vụ',
      rating: 4.9,
      location: 'Quận 1, TP.HCM',
      experience: '1 năm kinh nghiệm',
      skills: ['Phục vụ', 'Pha chế', 'Tiếng Anh'],
      match: 95,
      status: 'Đã chấp nhận'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      positionApplied: 'Nhân viên bán hàng',
      rating: 4.2,
      location: 'Quận 5, TP.HCM',
      experience: '3 tháng kinh nghiệm',
      skills: ['Bán hàng', 'Giao tiếp'],
      match: 75,
      status: 'Đã từ chối'
    }
  ]

  const tabs = [
    { label: 'Tất cả', count: 4, value: 'Tất cả' },
    { label: 'Chờ duyệt', count: 2, value: 'Chờ duyệt' },
    { label: 'Đã chấp nhận', count: 1, value: 'Đã chấp nhận' },
    { label: 'Đã từ chối', count: 1, value: 'Đã từ chối' }
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-2">Danh sách ứng viên</h2>
      
      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm ứng viên..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Tất cả công việc</option>
        </select>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Applicant List */}
      <div className="space-y-4">
        {applicants.map(applicant => (
          <ApplicantCard key={applicant.id} applicant={applicant} />
        ))}
      </div>
    </div>
  )
}

export default ApplicantsListSection
