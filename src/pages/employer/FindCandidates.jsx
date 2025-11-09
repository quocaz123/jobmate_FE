import React, { useMemo, useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Calendar, Star, MessageSquare, Eye } from 'lucide-react';

const mockCandidates = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: '/vite.svg',
    uni: 'Công nghệ thông tin - ĐH Bách Khoa Hà Nội',
    rating: 4.8,
    date: '2024-01-20',
    title: 'Tìm việc Frontend Developer part-time',
    desc: 'Sinh viên năm 3 CNTT, có 1 năm kinh nghiệm React. Tìm việc part-time cuối tuần.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    location: 'Hà Nội',
    salary: '8-12 triệu/tháng',
    hours: '16 giờ/tuần',
    days: 'Thứ 7, Chủ nhật',
    match: 95,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: '/vite.svg',
    uni: 'Marketing - ĐH Kinh tế Quốc dân',
    rating: 4.6,
    date: '2024-01-19',
    title: 'Tìm việc Content Creator freelance',
    desc: 'Có kinh nghiệm viết content cho fanpage 50k followers. Tìm việc freelance linh hoạt.',
    tags: ['Content Writing', 'SEO', 'Social Media', 'Canva'],
    location: 'Hà Nội',
    salary: '6-10 triệu/tháng',
    hours: '20 giờ/tuần',
    days: 'Thứ 2, Thứ 4, Thứ 6',
    match: 88,
  },
  {
    id: 3,
    name: 'Lê Văn C',
    avatar: '/vite.svg',
    uni: 'Quản trị kinh doanh - ĐH FPT',
    rating: 4.9,
    date: '2024-01-18',
    title: 'Tìm việc Customer Service part-time',
    desc: 'Kỹ năng giao tiếp tốt, tiếng Anh lưu loát. Tìm việc customer service cuối tuần.',
    tags: ['Communication', 'Problem Solving', 'MS Office', 'English'],
    location: 'Hà Nội',
    salary: '5-8 triệu/tháng',
    hours: '24 giờ/tuần',
    days: 'Thứ 7, Chủ nhật',
    match: 82,
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    avatar: '/vite.svg',
    uni: 'Kinh doanh quốc tế - ĐH Ngoại thương',
    rating: 4.7,
    date: '2024-01-17',
    title: 'Tìm việc Sales Assistant part-time',
    desc: 'Có kinh nghiệm bán hàng online. Tìm việc sales part-time để phát triển kỹ năng.',
    tags: ['Sales', 'Negotiation', 'English', 'Customer Service'],
    location: 'Hà Nội',
    salary: '6-9 triệu/tháng',
    hours: '20 giờ/tuần',
    days: 'Thứ 3, Thứ 5, Thứ 7',
    match: 78,
  },
  {
    id: 5,
    name: 'Phan Văn E',
    avatar: '/vite.svg',
    uni: 'Thiết kế đồ họa - ĐH Mỹ thuật',
    rating: 4.5,
    date: '2024-01-16',
    title: 'Tìm việc Graphic Designer freelance',
    desc: 'Có kỹ năng Illustrator, Photoshop và thiết kế UI cơ bản. Nhận project freelance.',
    tags: ['Illustrator', 'Photoshop', 'Figma', 'UI'],
    location: 'Hồ Chí Minh',
    salary: '5-10 triệu/tháng',
    hours: '15 giờ/tuần',
    days: 'Linh hoạt',
    match: 84,
  },
  {
    id: 6,
    name: 'Hoàng Thị F',
    avatar: '/vite.svg',
    uni: 'Marketing - ĐH Văn hóa',
    rating: 4.3,
    date: '2024-01-15',
    title: 'Tìm việc Marketing Intern',
    desc: 'Đam mê content marketing và social media. Muốn học hỏi và thực chiến.',
    tags: ['Social Media', 'Content', 'SEO'],
    location: 'Hà Nội',
    salary: '3-5 triệu/tháng',
    hours: '12 giờ/tuần',
    days: 'Thứ 2, Thứ 4',
    match: 73,
  },
];

// Stats section removed per request

const CandidateCard = ({ c }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-start">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <div className="text-sm text-gray-500">{c.uni}</div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-2"><Star className="w-3 h-3 text-yellow-500" /> <strong className="text-black">{c.rating}</strong> • <span className="text-gray-400 text-sm">{c.date}</span></span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="bg-gray-100 rounded-full text-xs text-gray-700 px-2 py-0.5">{c.match}% khớp</div>
            <div className="flex flex-col gap-2">
              <button className="px-3 py-1 bg-black text-white rounded-md flex items-center gap-2 text-sm"><MessageSquare className="w-3 h-3" /> Nhắn tin</button>
              <button className="px-3 py-1 bg-white border rounded-md flex items-center gap-2 text-sm"><Eye className="w-3 h-3" /> Xem hồ sơ</button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-base font-medium">{c.title}</h4>
          <p className="text-gray-600 mt-1 text-sm">{c.desc}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {c.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {c.location}</span>
            <span className="flex items-center gap-2"><DollarSign className="w-3 h-3" /> {c.salary}</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {c.hours}</span>
            <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {c.days}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ page, totalPages, setPage }) => {
  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) arr.push(i);
    return arr;
  }, [totalPages]);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button className="px-3 py-1 bg-white border rounded-md text-sm" onClick={() => setPage(Math.max(1, page - 1))}>Trước</button>
      {pages.map((p) => (
        <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-md ${p === page ? 'bg-black text-white' : 'bg-white border text-sm'}`}>{p}</button>
      ))}
      <button className="px-3 py-1 bg-white border rounded-md text-sm" onClick={() => setPage(Math.min(totalPages, page + 1))}>Sau</button>
    </div>
  );
};

const FindCandidates = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Tất cả địa điểm');
  const [skill, setSkill] = useState('Tất cả kỹ năng');
  const [page, setPage] = useState(1);

  const perPage = 2;

  const filtered = useMemo(() => {
    return mockCandidates.filter((c) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${c.name} ${c.title} ${c.desc} ${c.tags.join(' ')}`.toLowerCase().includes(q))) return false;
      if (location !== 'Tất cả địa điểm' && c.location !== location) return false;
      if (skill !== 'Tất cả kỹ năng' && !c.tags.includes(skill)) return false;
      return true;
    });
  }, [query, location, skill]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-gray-50 rounded-md border px-3 py-1">
              <Search className="w-4 h-4 text-gray-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm theo kỹ năng, chuyên ngành, trường..." className="bg-transparent w-full outline-none text-sm" />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <select className="border rounded-md px-2 py-1 bg-white text-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Tất cả địa điểm</option>
              <option>Hà Nội</option>
              <option>Hồ Chí Minh</option>
            </select>
            <select className="border rounded-md px-2 py-1 bg-white text-sm" value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option>Tất cả kỹ năng</option>
              <option>React</option>
              <option>Communication</option>
            </select>
            <button className="px-3 py-1 bg-white border rounded-md text-sm">Lọc</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pageItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Không tìm thấy ứng viên phù hợp.</div>
        ) : (
          pageItems.map((c) => <CandidateCard key={c.id} c={c} />)
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default FindCandidates;
