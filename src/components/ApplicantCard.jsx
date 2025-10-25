import React from 'react'
import { Star, MapPin, Clock, MessageSquare, Eye, CheckCircle, XCircle } from 'lucide-react'

const ApplicantCard = ({ applicant }) => {
  // Kiểm tra và cung cấp giá trị mặc định cho các trường có thể undefined
  const safeApplicant = {
    name: applicant?.name || 'N/A',
    positionApplied: applicant?.positionApplied || applicant?.position || 'N/A',
    rating: applicant?.rating || 'N/A',
    location: applicant?.location || 'N/A',
    experience: applicant?.experience || 'N/A',
    skills: applicant?.skills || [],
    match: applicant?.match || 0,
    status: applicant?.status || 'N/A'
  }

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Chờ duyệt':
      case 'Đang chờ':
        return 'bg-yellow-100 text-yellow-800'
      case 'Đã chấp nhận':
      case 'Đã nhận':
        return 'bg-green-100 text-green-800'
      case 'Đã từ chối':
        return 'bg-red-100 text-red-800'
      case 'Phỏng vấn':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
      {/* Status Tag */}
      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(safeApplicant.status)}`}>
        {safeApplicant.status}
      </span>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-gray-600">
            {safeApplicant.name.charAt(0)}
          </span>
        </div>
        
        {/* Applicant Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black mb-1">{safeApplicant.name}</h3>
          <p className="text-gray-600 text-sm mb-3">
            Ứng tuyển: <span className="font-medium">{safeApplicant.positionApplied}</span>
          </p>

          <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{safeApplicant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{safeApplicant.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{safeApplicant.experience}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {safeApplicant.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                {skill}
              </span>
            ))}
          </div>

          {/* Match Percentage */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-pink-500 h-2.5 rounded-full" 
                style={{ width: `${safeApplicant.match}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{safeApplicant.match}% phù hợp</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Xem hồ sơ</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Nhắn tin</span>
          </button>
          {(safeApplicant.status === 'Chờ duyệt' || safeApplicant.status === 'Đang chờ') && (
            <>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <CheckCircle className="w-5 h-5" />
                <span>Chấp nhận</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <XCircle className="w-5 h-5" />
                <span>Từ chối</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicantCard
