import React from 'react'
import StudentCard from './StudentCard'

const StudentListSection = () => {
  const students = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      university: 'Công nghệ thông tin - ĐH Bách Khoa Hà Nội',
      rating: '4.8',
      date: '2024-01-20',
      position: 'Frontend Developer part-time',
      description: 'Sinh viên năm 3 CNTT, có 1 năm kinh nghiệm React. Tìm việc part-time cuối tuần.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      location: 'Hà Nội',
      salary: '$ 8-12 triệu/tháng',
      hours: '16 giờ/tuần',
      availability: 'Thứ 7, Chủ nhật',
      match: '95%'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      university: 'Marketing - ĐH Kinh tế Quốc dân',
      rating: '4.6',
      date: '2024-01-19',
      position: 'Content Creator freelance',
      description: 'Có kinh nghiệm viết content cho fanpage 50k followers. Tìm việc freelance linh hoạt.',
      skills: ['Content Writing', 'Social Media', 'Photoshop', 'Canva'],
      location: 'TP.HCM',
      salary: '$ 6-10 triệu/tháng',
      hours: '20 giờ/tuần',
      availability: 'Linh hoạt',
      match: '88%'
    },
    {
      id: 3,
      name: 'Phạm Thị D',
      university: 'Kinh doanh quốc tế - ĐH Ngoại thương',
      rating: '4.7',
      date: '2024-01-17',
      position: 'Sales Assistant part-time',
      description: 'Có kinh nghiệm bán hàng online. Tìm việc sales part-time để phát triển kỹ năng.',
      skills: ['Sales', 'Negotiation', 'English', 'Customer Service'],
      location: 'Hà Nội',
      salary: '$ 6-9 triệu/tháng',
      hours: '20 giờ/tuần',
      availability: 'Thứ 3, Thứ 5, Thứ 7',
      match: '78%'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-4">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Trước
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
          1
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          2
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          3
        </button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Sau
        </button>
      </div>
    </div>
  )
}

export default StudentListSection
