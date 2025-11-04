import React, { useEffect, useState } from 'react'
import { MapPin, Clock, Star, MessageCircle, Eye, CheckCircle, XCircle } from 'lucide-react'

const SAMPLE = [
  {
    id: 'c-1',
    name: 'Nguyễn Văn A',
    role: 'Nhân viên phục vụ',
    rating: 4.8,
    location: 'Quận 1, TP.HCM',
    exp: '6 tháng kinh nghiệm',
    tags: ['Giao tiếp tốt', 'Nhiệt tình', 'Chăm chỉ'],
    status: 'Chờ duyệt',
    score: 92
  },
  {
    id: 'c-2',
    name: 'Trần Thị B',
    role: 'Nhân viên bán hàng',
    rating: 4.5,
    location: 'Quận 3, TP.HCM',
    exp: '1 năm kinh nghiệm',
    tags: ['Bán hàng','Tư vấn','Marketing'],
    status: 'Chờ duyệt',
    score: 88
  },
  {
    id: 'c-3',
    name: 'Lê Văn C',
    role: 'Nhân viên phục vụ',
    rating: 4.9,
    location: 'Quận 1, TP.HCM',
    exp: '1 năm kinh nghiệm',
    tags: ['Phục vụ','Pha chế','Tiếng Anh'],
    status: 'Đã chấp nhận',
    score: 95
  },
  {
    id: 'c-4',
    name: 'Phạm Thị D',
    role: 'Nhân viên bán hàng',
    rating: 4.2,
    location: 'Quận 5, TP.HCM',
    exp: '3 tháng kinh nghiệm',
    tags: ['Bán hàng','Giao tiếp'],
    status: 'Đã từ chối',
    score: 75
  }
]

function statusBadge(status) {
  if (!status) return 'bg-gray-50 text-gray-700'
  const s = String(status).toLowerCase()
  if (s.includes('chờ')) return 'bg-yellow-50 text-yellow-700'
  if (s.includes('chấp')) return 'bg-green-50 text-green-700'
  if (s.includes('từ')) return 'bg-red-50 text-red-700'
  return 'bg-gray-50 text-gray-700'
}

function statusColor(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('chờ')) return 'border-yellow-400'
  if (s.includes('chấp')) return 'border-green-400'
  if (s.includes('từ')) return 'border-red-400'
  return 'border-gray-200'
}

function initials(name) {
  if (!name) return ''
  return name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase()
}

export default function EmployerCandidates() {
  const [candidates, setCandidates] = useState([])
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  useEffect(() => {
    // seed demo if none
    setCandidates(SAMPLE)
  }, [])

  const filtered = candidates.filter(c => {
    const st = String(c.status || '').toLowerCase()
    if (filter === 'pending' && !st.includes('chờ')) return false
    if (filter === 'accepted' && !st.includes('chấp')) return false
    if (filter === 'rejected' && !st.includes('từ')) return false
    if (!q) return true
    const s = q.toLowerCase()
    return String(c.name || '').toLowerCase().includes(s) || String(c.role || '').toLowerCase().includes(s)
  })

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm px-6 py-4">
        <h1 className="text-2xl font-bold">Quản lý ứng viên</h1>
        <p className="text-gray-500 mt-1 text-sm">Xem và quản lý các ứng viên đã ứng tuyển vào công việc của bạn</p>
      </div>

      {/* stats removed per request */}

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold">Danh sách ứng viên</h2>
            <p className="text-sm text-gray-500">Danh sách và quản lý các ứng viên đã ứng tuyển</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[260px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm kiếm ứng viên..." className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm shadow-sm" onChange={e => setFilter(e.target.value)} value={filter}>
              <option value="all">Tất cả công việc</option>
              <option value="pending">Chờ duyệt</option>
              <option value="accepted">Đã chấp nhận</option>
              <option value="rejected">Đã từ chối</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-full text-sm ${filter === 'all' ? 'bg-white border shadow-sm' : 'bg-gray-50'}`}><span className="font-medium">Tất cả</span> <span className="text-gray-500">({candidates.length})</span></button>
            <button onClick={() => setFilter('pending')} className={`px-3 py-1.5 rounded-full text-sm ${filter === 'pending' ? 'bg-white border shadow-sm' : 'bg-gray-50'}`}><span className="font-medium">Chờ duyệt</span> <span className="text-yellow-600">({candidates.filter(c=>String(c.status||'').toLowerCase().includes('chờ')).length})</span></button>
            <button onClick={() => setFilter('accepted')} className={`px-3 py-1.5 rounded-full text-sm ${filter === 'accepted' ? 'bg-white border shadow-sm' : 'bg-gray-50'}`}><span className="font-medium">Đã chấp nhận</span> <span className="text-green-600">({candidates.filter(c=>String(c.status||'').toLowerCase().includes('chấp')).length})</span></button>
            <button onClick={() => setFilter('rejected')} className={`px-3 py-1.5 rounded-full text-sm ${filter === 'rejected' ? 'bg-white border shadow-sm' : 'bg-gray-50'}`}><span className="font-medium">Đã từ chối</span> <span className="text-red-600">({candidates.filter(c=>String(c.status||'').toLowerCase().includes('từ')).length})</span></button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && <div className="text-sm text-gray-500 py-6 text-center">Không có ứng viên.</div>}

          {filtered.map(c => (
            <div key={c.id} className={`rounded-lg border border-gray-100 p-4 flex items-start justify-between group hover:shadow-lg transition-transform transform hover:-translate-y-0.5 ${statusColor(c.status)} border-l-4`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">{initials(c.name)}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-base font-medium">{c.name}</h3>
                      <div className="text-sm text-gray-500">Ứng tuyển: {c.role}</div>
                    </div>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(c.status)}`}>{c.status}</div>
                  </div>

                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-4">
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> <span className="text-sm font-medium text-gray-700">{c.rating}</span></div>
                    <div className="flex items-center gap-1"><MapPin size={14} /> <span className="text-sm">{c.location}</span></div>
                    <div className="flex items-center gap-1"><Clock size={14} /> <span className="text-sm">{c.exp}</span></div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((t,i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-36">
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div style={{ width: `${c.score}%` }} className="h-2 rounded-full bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{c.score}% phù hợp</div>
                    </div>
                    <div className="text-xs text-gray-400">ID: {c.id}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 rounded bg-white flex items-center gap-2 text-sm hover:bg-gray-50"><Eye size={16}/> Xem</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded bg-white flex items-center gap-2 text-sm hover:bg-gray-50"><MessageCircle size={16}/> Nhắn</button>
                </div>

                <div className="flex items-center gap-2">
                  {(String(c.status||'').toLowerCase().includes('chờ')) && <button className="px-3 py-1.5 bg-green-600 text-white rounded flex items-center gap-2 text-sm hover:opacity-95"><CheckCircle size={16}/> Chấp nhận</button>}
                  {(String(c.status||'').toLowerCase().includes('chờ')) && <button className="px-3 py-1.5 bg-red-600 text-white rounded flex items-center gap-2 text-sm hover:opacity-95"><XCircle size={16}/> Từ chối</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
