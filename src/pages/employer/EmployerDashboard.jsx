import React from 'react';
import { Eye, Briefcase, UserPlus, Calendar, Star, MapPin, DollarSign, Users } from 'lucide-react';

const stats = [
  { id: 1, label: 'Tin đang tuyển', value: 8 },
  { id: 2, label: 'Ứng viên mới', value: 74 },
  { id: 3, label: 'Phỏng vấn hôm nay', value: 12 },
  { id: 4, label: 'Đánh giá công ty', value: 4.7 },
];

const jobPosts = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    location: 'Hà Nội',
    salary: '8-12 triệu/tháng',
    applicants: 24,
    status: 'Đang tuyển',
  },
  {
    id: 2,
    title: 'Content Creator',
    location: 'TP.HCM',
    salary: '6-8 triệu/tháng',
    applicants: 18,
    status: 'Đang tuyển',
  },
  {
    id: 3,
    title: 'Customer Service',
    location: 'Đà Nẵng',
    salary: '5-7 triệu/tháng',
    applicants: 32,
    status: 'Đã đóng',
  },
];

const StatusBadge = ({ status }) => {
  const base = 'text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-2';
  if (status === 'Đang tuyển') return <span className={`${base} bg-green-50 text-green-700 border border-green-100`}><span className="w-2 h-2 rounded-full bg-green-400" />{status}</span>;
  if (status === 'Đã đóng') return <span className={`${base} bg-gray-50 text-gray-700 border border-gray-100`}><span className="w-2 h-2 rounded-full bg-gray-400" />{status}</span>;
  return <span className={`${base} bg-blue-50 text-blue-700 border border-blue-100`}><span className="w-2 h-2 rounded-full bg-blue-400" />{status}</span>;
};
const ApplicantStatus = ({ status }) => {
  const base = 'text-xs font-medium px-3 py-1 rounded-full inline-block';
  if (status === 'Đang chờ') return <span className={`${base} bg-yellow-100 text-yellow-800`}>{status}</span>;
  if (status === 'Phỏng vấn') return <span className={`${base} bg-blue-100 text-blue-800`}>{status}</span>;
  return <span className={`${base} bg-green-100 text-green-800`}>{status}</span>;
};

const StatCard = ({ icon, value, label, accent, iconColor = 'text-white' }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center justify-between transition-transform transform hover:-translate-y-1 hover:shadow-xl h-24 group">
    <div>
      <p className="text-3xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
    <div className="ml-4 flex items-center">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm transform transition-transform group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.08) 100%)` }}>
        {React.isValidElement(icon) ? React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}`, strokeWidth: 3 }) : icon}
      </div>
    </div>
  </div>
);

// helper: color for status left border
const getStatusColor = (status) => {
  if (status === 'Đang tuyển') return '#10b981'; // green-500
  if (status === 'Đã đóng') return '#9ca3af'; // gray-400
  return '#3b82f6'; // blue-500
};

const avatarColors = ['#f97316', '#06b6d4', '#8b5cf6', '#ef4444', '#10b981'];
const avatarBg = (idx) => avatarColors[idx % avatarColors.length];

const ApplicantRow = ({ a }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: avatarBg(a.id - 1) }}>{a.initial}</div>
      <div>
        <div className="font-medium text-gray-800">{a.name}</div>
        <div className="text-sm text-gray-500 mt-0.5">{a.school}</div>
        <div className="text-sm text-yellow-600 mt-1 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> <span className="text-gray-700">{a.rating}</span> <span className="text-gray-400">·</span> <span className="text-gray-600">Ứng tuyển: {a.position}</span></div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <ApplicantStatus status={a.status} />
      <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
        <Eye className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
);

export const EmployerDashboard = () => {
  const applicants = [
    { id: 1, initial: 'N', name: 'Nguyễn Văn A', school: 'Công nghệ thông tin - ĐH Bách Khoa Hà Nội', rating: 4.8, position: 'Frontend Developer Intern', status: 'Đang chờ' },
    { id: 2, initial: 'T', name: 'Trần Thị B', school: 'Marketing - ĐH Kinh tế Quốc dân', rating: 4.6, position: 'Content Creator', status: 'Phỏng vấn' },
    { id: 3, initial: 'L', name: 'Lê Văn C', school: 'Quản trị kinh doanh - ĐH FPT', rating: 4.9, position: 'Customer Service', status: 'Đã nhận' },
  ];

  return (
    <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Briefcase />} value={8} label="Tin đang tuyển" accent="#e6f7ff" iconColor="text-teal-500" />
          <StatCard icon={<UserPlus />} value={74} label="Ứng viên mới" accent="#fff0f6" iconColor="text-pink-500" />
          <StatCard icon={<Calendar />} value={12} label="Phỏng vấn hôm nay" accent="#f0fdfa" iconColor="text-cyan-500" />
          <StatCard icon={<Star />} value={4.7} label="Đánh giá công ty" accent="#fff7ed" iconColor="text-yellow-500" />
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="px-6 py-6 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Tin tuyển dụng gần đây</h3>
            <p className="text-sm text-gray-500 mt-1">Quản lý các tin tuyển dụng của bạn</p>
          </div>

          <div className="p-6 space-y-4">
            {jobPosts.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border border-gray-100 p-4 transition transform hover:-translate-y-1 hover:shadow-md hover:border-gray-200 group" style={{ borderLeft: `6px solid ${getStatusColor(job.status)}` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h4 className="font-semibold text-gray-800 text-base">{job.title}</h4>
                    <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-6 items-center">
                      <span className="flex items-center gap-2 text-gray-500"><MapPin className="w-4 h-4 text-gray-400" /> <span>{job.location}</span></span>
                      <span className="flex items-center gap-2 text-gray-500"><DollarSign className="w-4 h-4 text-gray-400" /> <span>{job.salary}</span></span>
                      <span className="flex items-center gap-2 text-gray-500"><Users className="w-4 h-4 text-gray-400" /> <span>{job.applicants} ứng viên</span></span>
                    </div>
                    {job.description && <p className="mt-3 text-sm text-gray-600 line-clamp-2">{job.description}</p>}
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <div className="transition-transform duration-150 group-hover:scale-105">
                      <StatusBadge status={job.status} />
                    </div>
                    <button aria-label={`view-${job.id}`} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-shadow hover:shadow-sm">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="px-6 py-6 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Ứng viên mới</h3>
            <p className="text-sm text-gray-500 mt-1">Ứng viên vừa ứng tuyển vào các vị trí của bạn</p>
          </div>

          <div className="p-6 space-y-4">
            {applicants.map((a) => (
              <div key={a.id} className="bg-white rounded-lg border border-gray-100 p-4 transition transform hover:-translate-y-1 hover:shadow-sm group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 font-semibold bg-gray-50 border border-gray-100 transition ring-0 group-hover:ring-2 group-hover:ring-gray-200">{a.initial}</div>
                    <div>
                      <div className="font-medium text-gray-800">{a.name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{a.school}</div>
                      <div className="text-sm text-yellow-600 mt-1 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> <span className="text-gray-700">{a.rating}</span> <span className="text-gray-400">·</span> <span className="text-gray-600">Ứng tuyển: {a.position}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="transition-transform duration-150 group-hover:scale-105"><ApplicantStatus status={a.status} /></div>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-shadow hover:shadow-sm">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default EmployerDashboard;
