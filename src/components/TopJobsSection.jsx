import React from 'react'
import { Eye, Users } from 'lucide-react'

const TopJobsSection = () => {
  const topJobs = [
    {
      id: 1,
      title: 'Nhân viên phục vụ',
      views: 456,
      candidates: 42,
      acceptanceRate: 72
    },
    {
      id: 2,
      title: 'Nhân viên bán hàng',
      views: 398,
      candidates: 38,
      acceptanceRate: 65
    },
    {
      id: 3,
      title: 'Gia sư Toán',
      views: 234,
      candidates: 28,
      acceptanceRate: 85
    },
    {
      id: 4,
      title: 'Nhân viên Marketing',
      views: 189,
      candidates: 24,
      acceptanceRate: 58
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Tin tuyển dụng hiệu quả nhất
      </h2>
      
      <div className="space-y-4">
        {topJobs.map((job, index) => (
          <div key={job.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            {/* Ranking Number */}
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            
            {/* Job Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{job.views} lượt xem</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{job.candidates} ứng viên</span>
                </div>
              </div>
            </div>
            
            {/* Acceptance Rate */}
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Tỷ lệ chấp nhận</div>
              <div className="text-lg font-bold text-green-600">
                {job.acceptanceRate}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopJobsSection
