import React from 'react'
import { MapPin, DollarSign, Users, Eye, Calendar, Edit, Briefcase } from 'lucide-react'

const RecentJobPostingsSection = () => {
  const jobPostings = [
    {
      title: 'Frontend Developer',
      location: 'Hà Nội',
      salary: '8-12 triệu/tháng',
      applicants: 45,
      status: 'Đang mở',
      statusColor: 'bg-green-100 text-green-800',
      postedDate: '2 ngày trước',
      views: 234
    },
    {
      title: 'Backend Developer',
      location: 'TP.HCM',
      salary: '10-15 triệu/tháng',
      applicants: 32,
      status: 'Đang mở',
      statusColor: 'bg-green-100 text-green-800',
      postedDate: '5 ngày trước',
      views: 189
    },
    {
      title: 'UI/UX Designer',
      location: 'Đà Nẵng',
      salary: '6-9 triệu/tháng',
      applicants: 28,
      status: 'Tạm dừng',
      statusColor: 'bg-yellow-100 text-yellow-800',
      postedDate: '1 tuần trước',
      views: 156
    },
    {
      title: 'Marketing Specialist',
      location: 'Hà Nội',
      salary: '5-8 triệu/tháng',
      applicants: 67,
      status: 'Đã đóng',
      statusColor: 'bg-red-100 text-red-800',
      postedDate: '2 tuần trước',
      views: 312
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-black">Tin tuyển dụng gần đây</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {jobPostings.map((job, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black mb-2">{job.title}</h3>
                
                <div className="flex items-center gap-6 text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{job.applicants} ứng viên</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Đăng {job.postedDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{job.views} lượt xem</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${job.statusColor}`}>
                  {job.status}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentJobPostingsSection
