import React from 'react'
import { Star, MapPin, DollarSign, Clock, Calendar, MessageSquare, Eye, Zap } from 'lucide-react'

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">
              {student.name.charAt(0)}
            </span>
          </div>
          {/* Student Info */}
          <div>
            <h3 className="text-lg font-bold text-black">{student.name}</h3>
            <p className="text-gray-600 text-sm">{student.university}</p>
            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{student.rating}</span>
              <span>•</span>
              <span>{student.date}</span>
            </div>
          </div>
        </div>
        {/* Match Percentage and Actions */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-blue-600 font-semibold">
            <Zap className="w-4 h-4" />
            <span>{student.match} khớp</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            <MessageSquare className="w-4 h-4" />
            Nhắn tin
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4" />
            Xem hồ sơ
          </button>
        </div>
      </div>

      {/* Desired Job and Skills */}
      <div className="mb-4">
        <p className="text-gray-800 font-semibold mb-1">Tìm việc {student.position}</p>
        <p className="text-gray-600 text-sm mb-2">{student.description}</p>
        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{student.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{student.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{student.hours}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{student.availability}</span>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
