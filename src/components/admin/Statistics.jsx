import React from 'react';
import Card from '../Common/Card';
import StatsCard from '../Common/StatsCard';
import { Users, Briefcase, FileText, BarChart3 } from 'lucide-react';

// Simple responsive SVG sparkline/area chart (no external deps)
const Sparkline = ({ data = [], stroke = '#10b981', fill = 'rgba(16,185,129,0.08)' }) => {
  // If no data provided, render a small flat baseline so the chart shows the zero line
  const safeData = (data && data.length > 0) ? data : [0, 0, 0, 0];

  const width = 300;
  const height = 120;
  const padding = 8;

  const max = Math.max(...safeData);
  const min = Math.min(...safeData);
  const range = max - min || 1; // avoid division by zero

  const points = safeData.map((d, i) => {
    const x = padding + (i / (safeData.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (d - min) / range) * (height - padding * 2);
    return [x, y];
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const areaD = `${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" role="img" aria-label="Sparkline chart">
      <path d={areaD} fill={fill} />
      <path d={pathD} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={2} fill={stroke} />
      ))}
    </svg>
  );
};

const Statistics = () => {
  // Placeholder values for now. These will be wired to API later.
  const stats = [
    { title: 'Tổng người dùng', value: '0', change: '+0', timeAgo: 'Hôm nay', icon: <Users size={28} /> },
    { title: 'Nhà tuyển dụng', value: '0', change: '+0', timeAgo: 'Hôm nay', icon: <Briefcase size={28} /> },
    { title: 'Bài viết', value: '0', change: '+0', timeAgo: 'Hôm nay', icon: <FileText size={28} /> },
    { title: 'Tin tuyển dụng', value: '0', change: '+0', timeAgo: 'Hôm nay', icon: <BarChart3 size={28} /> },
  ];

  const recentUsers = [];
  const recentEmployers = [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Thống kê</h2>
        <p className="text-gray-600">Báo cáo và biểu đồ hiệu năng hệ thống.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatsCard
            key={s.title}
            title={s.title}
            value={s.value}
            change={s.change}
            timeAgo={s.timeAgo}
            icon={s.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="h-64 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Biểu đồ người dùng</h3>
              <p className="text-sm text-gray-500">Số lượng người dùng theo thời gian</p>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded">
            {/* Simple SVG sparkline chart using mock data */}
            <Sparkline data={[5, 8, 6, 10, 12, 9, 14, 11, 15, 18]} stroke="#0ea5a4" fill="rgba(14,165,164,0.08)" />
          </div>
        </Card>

        <Card className="h-64 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Biểu đồ tin tuyển dụng</h3>
              <p className="text-sm text-gray-500">Số lượng tin tuyển dụng theo thời gian</p>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded">
            {/* Simple SVG sparkline chart using mock data */}
            <Sparkline data={[3, 4, 5, 7, 6, 8, 9, 10, 9, 11]} stroke="#6366f1" fill="rgba(99,102,241,0.08)" />
          </div>
        </Card>
      </div>

      {/* Recent lists removed per request */}
    </div>
  );
};

export default Statistics;


