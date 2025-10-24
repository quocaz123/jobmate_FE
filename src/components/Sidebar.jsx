import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Briefcase, 
  Zap, 
  Users, 
  MessageSquare, 
  BarChart3, 
  FileText, 
  Plus, 
  Settings, 
  Home, 
  LogOut,
  ChevronLeft
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/overview' },
    { icon: Briefcase, label: 'Tin tuyển dụng', path: '/job-postings' },
    { icon: Zap, label: 'Tìm sinh viên', path: '/find-students' },
    { icon: Users, label: 'Ứng viên', path: '/applicants' },
    { icon: MessageSquare, label: 'Tin nhắn', path: '/messages' },
    { icon: BarChart3, label: 'Thống kê', path: '/statistics' },
    { icon: FileText, label: 'Hồ sơ công ty', path: '/company-profile' }
  ]

  const handleMenuClick = (path) => {
    navigate(path)
  }

  return (
    <div className="w-80 bg-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-black">Nhà tuyển dụng</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">Logo</span>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-black">Tech Company ABC</h2>
            <p className="text-sm text-gray-500">Công ty công nghệ</p>
          </div>
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                location.pathname === item.path
                  ? 'bg-pink-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 px-4 rounded-lg flex items-center gap-3 font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          Đăng tin mới
        </button>
        
        <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center gap-3 font-medium hover:bg-gray-300 transition-colors">
          <Settings className="w-5 h-5" />
          Cài đặt
        </button>
        
        <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center gap-3 font-medium hover:bg-gray-300 transition-colors">
          <Home className="w-5 h-5" />
          Về trang chủ
        </button>
        
        <button className="w-full bg-red-500 text-white py-3 px-4 rounded-lg flex items-center gap-3 font-medium hover:bg-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default Sidebar
