import React from 'react'
import ApplicantCard from './ApplicantCard'

const NewApplicantsSection = () => {
  const applicants = [
    {
      name: 'Nguyễn Văn A',
      university: 'Công nghệ thông tin - ĐH Bách Khoa Hà Nội',
      rating: '4.8',
      position: 'Frontend Developer Intern',
      positionApplied: 'Frontend Developer Intern',
      status: 'Đang chờ',
      location: 'Hà Nội',
      experience: '1 năm kinh nghiệm',
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      match: 85
    },
    {
      name: 'Trần Thị B',
      university: 'Marketing - ĐH Kinh tế Quốc dân',
      rating: '4.6',
      position: 'Content Creator',
      positionApplied: 'Content Creator',
      status: 'Phỏng vấn',
      location: 'TP.HCM',
      experience: '6 tháng kinh nghiệm',
      skills: ['Content Writing', 'Social Media', 'Photoshop'],
      match: 78
    },
    {
      name: 'Lê Văn C',
      university: 'Quản trị kinh doanh - ĐH FPT',
      rating: '4.9',
      position: 'Customer Service',
      positionApplied: 'Customer Service',
      status: 'Đã nhận',
      location: 'Đà Nẵng',
      experience: '2 năm kinh nghiệm',
      skills: ['Customer Service', 'Communication', 'Problem Solving'],
      match: 92
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Ứng viên mới</h2>
        <p className="text-gray-600">
          Ứng viên vừa ứng tuyển vào các vị trí của bạn
        </p>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {applicants.map((applicant, index) => (
          <ApplicantCard key={index} applicant={applicant} />
        ))}
      </div>
    </div>
  )
}

export default NewApplicantsSection
