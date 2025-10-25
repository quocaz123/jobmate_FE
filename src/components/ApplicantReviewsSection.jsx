import React from 'react'
import { Star } from 'lucide-react'

const ApplicantReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Môi trường làm việc tuyệt vời, đồng nghiệp thân thiện và hỗ trợ nhiệt tình.',
      time: '2 ngày trước',
      avatar: 'N'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      rating: 4,
      comment: 'Công ty chuyên nghiệp, lương thưởng đúng hẹn. Rất hài lòng với trải nghiệm làm việc.',
      time: '1 tuần trước',
      avatar: 'T'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      rating: 5,
      comment: 'Được học hỏi nhiều kinh nghiệm mới. Quản lý tận tâm và chu đáo.',
      time: '2 tuần trước',
      avatar: 'L'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      rating: 5,
      comment: 'Công ty có chính sách phúc lợi tốt, cơ hội thăng tiến rõ ràng.',
      time: '3 tuần trước',
      avatar: 'P'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      rating: 4,
      comment: 'Môi trường làm việc năng động, đồng nghiệp hỗ trợ nhiệt tình.',
      time: '1 tháng trước',
      avatar: 'H'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Đánh giá từ ứng viên
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            {/* Avatar */}
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {review.avatar}
            </div>
            
            {/* Review Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {review.name}
                </h4>
                <span className="text-sm text-gray-500">
                  {review.time}
                </span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Comment */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          Xem thêm đánh giá
        </button>
      </div>
    </div>
  )
}

export default ApplicantReviewsSection
