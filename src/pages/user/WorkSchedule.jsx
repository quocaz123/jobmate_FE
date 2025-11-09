import React from "react";
import { Calendar, Plus, Clock, BookOpen, Briefcase, Gift } from "lucide-react";

export default function WorkSchedule() {
  const stats = [
    { title: "Giờ làm tuần này", value: "12h", icon: <Briefcase className="text-cyan-500 w-6 h-6" /> },
    { title: "Giờ học tuần này", value: "15h", icon: <BookOpen className="text-pink-500 w-6 h-6" /> },
    { title: "Sự kiện sắp tới", value: "3", icon: <Gift className="text-purple-500 w-6 h-6" /> },
    { title: "Giờ rảnh/tuần", value: "25h", icon: <Clock className="text-green-500 w-6 h-6" /> },
  ];

  const events = [
    { id: 1, day: "Thứ 2", start: "08:00", end: "10:00", title: "Học - Lập trình Web", location: "ĐH Bách Khoa", type: "study" },
    { id: 2, day: "Thứ 4", start: "13:00", end: "15:00", title: "Học - Cơ sở dữ liệu", location: "ĐH Bách Khoa", type: "study" },
    { id: 3, day: "Thứ 5", start: "18:00", end: "21:00", title: "Làm việc - Nhà hàng Itihra", location: "Quận 1, TP HCM", type: "work" },
    { id: 4, day: "Thứ 6", start: "18:00", end: "21:00", title: "Làm việc - Nhà hàng Itihra", location: "Quận 1, TP HCM", type: "work" },
    { id: 5, day: "Thứ 7", start: "18:00", end: "21:00", title: "Làm việc - Nhà hàng Itihra", location: "Quận 1, TP HCM", type: "work" },
    { id: 6, day: "CN", start: "14:00", end: "17:00", title: "Gia sư Toán", location: "Quận 3, TP HCM", type: "work" },
  ];

  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7h - 21h

  const timeToPercent = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const minutes = h * 60 + m;
    const dayStart = 7 * 60;
    const total = 14 * 60;
    return ((minutes - dayStart) / total) * 100;
  };

  // trả về lớp màu nền nhạt + border nhạt + chữ tối
  const getPaleClass = (type) => {
    if (type === "work")
      return "bg-green-100 border border-green-200 text-green-800";
    if (type === "study")
      return "bg-pink-100 border border-pink-200 text-pink-800";
    return "bg-gray-100 border border-gray-200 text-gray-800";
  };

  const getIcon = (type) =>
    type === "work" ? <Briefcase size={14} className="inline mr-2 text-green-700" /> : <BookOpen size={14} className="inline mr-2 text-pink-700" />;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-[15px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lịch học & làm việc</h1>
          <p className="text-base text-gray-500">Quản lý thời gian học tập và làm việc hiệu quả</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2 border rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 transition">
            <Calendar size={18} /> Đồng bộ Google Calendar
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-md bg-black text-white shadow hover:bg-gray-800 transition">
            <Plus size={18} /> Thêm sự kiện
          </button>
        </div>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((item, i) => (
          <div key={i} className="bg-white border rounded-xl shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Lịch tuần */}
      <div className="bg-white border rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Lịch tuần</h2>

        <div className="overflow-x-auto">
          <div className="min-w-max grid grid-cols-[90px_repeat(7,1fr)] border-t border-l rounded-lg overflow-hidden text-sm">
            {/* Cột giờ */}
            <div className="border-r bg-gray-50">
              <div className="h-14 border-b flex items-center justify-center text-sm font-medium bg-gray-100">Giờ</div>
              {hours.map((h) => (
                <div key={h} className="h-20 border-b flex items-start justify-center text-gray-600 font-medium">
                  {h}:00
                </div>
              ))}
            </div>

            {/* Cột ngày */}
            {days.map((day) => (
              <div key={day} className="relative border-r">
                <div className="h-14 border-b flex items-center justify-center text-base font-semibold bg-gray-100 text-gray-700">
                  {day}
                </div>

                {/* Đường chia giờ */}
                <div className="absolute inset-x-0 top-[56px] bottom-0 pointer-events-none">
                  {hours.map((_, idx) => (
                    <div key={idx} className="h-20 border-b border-dashed border-gray-200" />
                  ))}
                </div>

                {/* Sự kiện */}
                <div className="relative" style={{ height: `${hours.length * 80}px` }}>
                  {events
                    .filter((e) => e.day === day)
                    .map((ev) => {
                      const top = timeToPercent(ev.start);
                      const height = timeToPercent(ev.end) - top;
                      return (
                        <div
                          key={ev.id}
                          className={`absolute left-3 right-3 rounded-lg px-3 py-3 shadow-sm transition-transform hover:scale-[1.02] ${getPaleClass(ev.type)}`}
                          style={{ top: `${top}%`, height: `${height}%`, overflow: "hidden" }}
                          title={`${ev.title} • ${ev.start} - ${ev.end}`}
                        >
                          <div className="flex items-center gap-2 font-semibold text-[14px] leading-tight truncate">
                            {getIcon(ev.type)} <span className="truncate">{ev.title}</span>
                          </div>
                          <div className="text-[12px] opacity-95 mt-1">{ev.location}</div>
                          <div className="text-[12px] opacity-85 mt-0.5">
                            {ev.start} - {ev.end}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
