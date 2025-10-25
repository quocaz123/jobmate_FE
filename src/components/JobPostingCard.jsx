import React from 'react'
import { MapPin, DollarSign, Users, Eye } from 'lucide-react'

const JobPostingCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-4">Customer Service</h2>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Đà Nẵng</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span>5-7 triệu/tháng</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>32 ứng viên</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors">
            <span>Đã đóng</span>
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobPostingCard
