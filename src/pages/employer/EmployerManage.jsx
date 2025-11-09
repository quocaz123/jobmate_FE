import React, { useEffect, useState } from 'react'
import { MapPin, DollarSign, Clock, Users, Eye, MoreVertical, Trash2, Edit, Search } from 'lucide-react'

const STORAGE_KEY = 'jobmate_posted_jobs'

function loadJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

function getStatusClasses(status) {
  if (!status) return 'bg-gray-50 text-gray-700'
  if (status.includes('Đang')) return 'bg-green-50 text-green-700'
  if (status.includes('Chờ')) return 'bg-yellow-50 text-yellow-700'
  if (status.includes('Hết')) return 'bg-red-50 text-red-700'
  return 'bg-gray-50 text-gray-700'
}

function getStatusBorder(status) {
  if (!status) return 'border-l-4 border-gray-100'
  if (status.includes('Đang')) return 'border-l-4 border-green-300'
  if (status.includes('Chờ')) return 'border-l-4 border-yellow-300'
  if (status.includes('Hết')) return 'border-l-4 border-red-300'
  return 'border-l-4 border-gray-100'
}

export default function EmployerManage() {
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const existing = loadJobs()
    if (!existing || existing.length === 0) {
      // Seed demo data so the page shows the example UI you provided
      const sample = [
        { id: 'job-1', title: 'Nhân viên phục vụ', location: 'Quận 1, TP.HCM', salary: '25.000đ/giờ', type: 'Part-time', status: 'Đang hoạt động', applicants: new Array(24).fill({}), views: 156 },
        { id: 'job-2', title: 'Nhân viên bán hàng', location: 'Quận 3, TP.HCM', salary: '30.000đ/giờ', type: 'Part-time', status: 'Đang hoạt động', applicants: new Array(18).fill({}), views: 98 },
        { id: 'job-3', title: 'Gia sư Toán', location: 'Quận 7, TP.HCM', salary: '100.000đ/giờ', type: 'Freelance', status: 'Chờ duyệt', applicants: [], views: 0 },
        { id: 'job-4', title: 'Nhân viên Marketing', location: 'Quận 2, TP.HCM', salary: '35.000đ/giờ', type: 'Part-time', status: 'Hết hạn', applicants: new Array(42).fill({}), views: 234 }
      ]
      setJobs(sample)
      saveJobs(sample)
    } else {
      setJobs(existing)
    }
  }, [])

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 2500)
      return () => clearTimeout(t)
    }
  }, [message])

  function handleDelete(id) {
    const ok = window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')
    if (!ok) return
    const next = jobs.filter(j => j.id !== id)
    setJobs(next)
    saveJobs(next)
    setMessage({ type: 'success', text: 'Đã xóa tin tuyển dụng.' })
  }

  function handleEdit(id) {
    // Lightweight placeholder: open EmployerPost via navigation or show modal in a real app
    alert('Chức năng sửa chưa được cài đặt trong demo. Bạn có thể dùng form Đăng tin để thêm/cập nhật.')
  }

  function filtered() {
    const q = query.trim().toLowerCase()
    return jobs.filter(job => {
      if (filter === 'active' && !(job.status && job.status.includes('Đang'))) return false
      if (filter === 'pending' && !(job.status && job.status.includes('Chờ'))) return false
      if (filter === 'expired' && !(job.status && job.status.includes('Hết'))) return false
      if (!q) return true
      return (job.title || '').toLowerCase().includes(q) || (job.location || '').toLowerCase().includes(q)
    })
  }

  return (
    <div className="space-y-6">
      {/* Page header card (no stats, no post button) */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Tin tuyển dụng</h1>
        <p className="text-gray-500 mt-2">Quản lý và theo dõi các tin tuyển dụng của bạn</p>
      </div>

      {/* Main content: list card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Danh sách tin đăng</h2>
            <p className="text-sm text-gray-500">Quản lý các tin bạn đã đăng </p>
          </div>

          <div className="w-80">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><Search size={16} /></span>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm kiếm tin đăng..." className="w-full border border-gray-100 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-100 bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setFilter('all')} className={`px-3 py-2 rounded-full text-sm ${filter === 'all' ? 'bg-white border' : 'bg-gray-50'}`}>Tất cả</button>
            <button onClick={() => setFilter('active')} className={`px-3 py-2 rounded-full text-sm ${filter === 'active' ? 'bg-white border' : 'bg-gray-50'}`}>Đang hoạt động</button>
            <button onClick={() => setFilter('pending')} className={`px-3 py-2 rounded-full text-sm ${filter === 'pending' ? 'bg-white border' : 'bg-gray-50'}`}>Chờ duyệt</button>
            <button onClick={() => setFilter('expired')} className={`px-3 py-2 rounded-full text-sm ${filter === 'expired' ? 'bg-white border' : 'bg-gray-50'}`}>Hết hạn</button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-2 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          {filtered().length === 0 && (
            <div className="text-sm text-gray-500 py-8 text-center">Không có tin nào khớp.</div>
          )}

          {filtered().map(job => (
            <div key={job.id || job._id || job.title} className={`${getStatusBorder(job.status)} rounded-lg border border-gray-100 p-5 flex items-center justify-between hover:shadow-lg transform hover:-translate-y-0.5 transition`}>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{job.title || 'Tiêu đề công việc'}</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(job.status)}`}>{job.status || 'Đang tuyển'}</div>
                </div>

                <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-2"><MapPin size={14} /> <span>{job.location || 'Địa điểm'}</span></div>
                  <div className="flex items-center gap-2"><DollarSign size={14} /> <span>{job.salary || 'Mức lương'}</span></div>
                  <div className="flex items-center gap-2"><Clock size={14} /> <span>{job.type || 'Part-time'}</span></div>
                </div>

                <div className="mt-3 text-sm text-gray-500 flex items-center gap-6">
                  <div className="flex items-center gap-2"><Users size={14} /> <span>{(job.applicants && job.applicants.length) || 0} ứng viên</span></div>
                  <div className="flex items-center gap-2"><Eye size={14} /> <span>{job.views || 0} lượt xem</span></div>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-3">
                <button onClick={() => alert('Xem chi tiết (demo)')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded bg-white text-sm"><Eye size={16} /> Xem</button>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(job.id)} className="p-2 rounded hover:bg-gray-50" title="Sửa"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(job.id)} className="p-2 rounded hover:bg-gray-50 text-red-600" title="Xóa"><Trash2 size={16} /></button>
                  <button className="p-2 rounded hover:bg-gray-50 text-gray-400" title="Thêm"><MoreVertical size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
