import React from 'react'
import { MapPin, DollarSign, Clock, Users, Eye, MoreVertical } from 'lucide-react'

const JobPostingListItem = ({ job }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang hoạt động':
        return 'bg-green-100 text-green-800'
      case 'Chờ duyệt':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hết hạn':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-bold text-black">{job.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
          
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
              <Clock className="w-4 h-4" />
              <span className="text-sm">{job.type}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">{job.applicants} ứng viên</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{job.views} lượt xem</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Xem</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobPostingListItem
