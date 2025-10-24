import React from 'react'
import { Camera, MapPin, Users, Calendar, Star, Edit } from 'lucide-react'

const CompanyOverviewCard = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Company Logo */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 relative group">
            <Camera className="w-8 h-8 text-gray-400" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tech Company ABC
          </h2>
          <p className="text-gray-600 mb-4">
            Công ty công nghệ
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.8</span>
            <span className="text-gray-600">(124 đánh giá)</span>
          </div>
          
          {/* Company Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Quận 1, TP. Hồ Chí Minh</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">50-100 nhân viên</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Thành lập 2020</span>
            </div>
          </div>
        </div>
        
        {/* Edit Button */}
        <div className="lg:self-end">
          <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 px-6 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-opacity">
            <Edit className="w-5 h-5" />
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyOverviewCard
