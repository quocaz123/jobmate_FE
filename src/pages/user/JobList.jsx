import React, { useMemo, useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  User,
  Search,
  Filter,
  MoreVertical,
  List as ListIcon,
  Bookmark as BookmarkIcon,
} from "lucide-react";

const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    location: "Quận 1, TP.HCM",
    distance: "0.8km",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    rating: 4.8,
    reviews: 95,
    applicants: 12,
    tags: ["Tiếng Anh", "Giao tiếp", "Part-time", "Đã xác minh", "Phù hợp lịch"],
    salary: "250,000đ/buổi",
    recommended: true,
    saved: false,
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    location: "Quận 3, TP.HCM",
    distance: "2.1km",
    time: "Flexible • Remote",
    rating: 4.6,
    reviews: 67,
    applicants: 8,
    tags: ["Photoshop", "Illustrator", "Freelance", "Đã xác minh", "Gấp", "Phù hợp lịch"],
    salary: "500,000đ/poster",
    recommended: true,
    saved: true,
  },
  {
    id: 3,
    title: "Phục vụ bàn - Nhà hàng Nhật",
    company: "Sushi Hokkaido",
    location: "Quận 7, TP.HCM",
    distance: "3.5km",
    time: "17:00 - 22:00 • Cuối tuần",
    rating: 4.4,
    reviews: 156,
    applicants: 25,
    tags: ["Giao tiếp", "Phục vụ", "Part-time", "Đã xác minh", "Phù hợp lịch"],
    salary: "120,000đ/ca",
    recommended: true,
    saved: false,
  },
];

function companyInitials(name) {
  if (!name) return "CC";
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const COLORS = [
  "bg-gradient-to-br from-blue-50 to-indigo-100",
  "bg-gradient-to-br from-indigo-50 to-blue-100",
  "bg-gradient-to-br from-purple-50 to-blue-100",
  "bg-gradient-to-br from-green-50 to-green-100",
  "bg-gradient-to-br from-blue-50 to-purple-100",
];
function pickColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
  return COLORS[Math.abs(h) % COLORS.length];
}

function tagClass(tag) {
  const t = tag.toLowerCase();
  if (t.includes("gấp")) return "bg-red-100 text-red-600 border-red-200";
  if (t.includes("đã xác minh")) return "bg-green-100 text-green-600 border-green-200";
  if (t.includes("freelance")) return "bg-purple-100 text-purple-600 border-purple-200";
  if (t.includes("part")) return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

export default function JobList({ onViewDetail }) {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(() =>
    JOBS_DATA.reduce((acc, j) => ({ ...acc, [j.id]: j.saved }), {})
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS_DATA.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  function toggleBookmark(id) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleApply(jobTitle) {
    alert(`🎉 Bạn đã ứng tuyển vào công việc "${jobTitle}" thành công!`);
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-semibold text-gray-800">
            Tìm việc làm
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Khám phá hàng trăm công việc part-time phù hợp với bạn
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3 mb-6 border">
          <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg flex-1">
            <Search className="text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên công việc, công ty..."
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg border hover:bg-gray-100 transition">
              <Filter size={18} />
            </button>
            <button className="px-3 py-2 rounded-lg border hover:bg-gray-100 transition">
              <MoreVertical size={18} />
            </button>
            <button className="px-3 py-2 rounded-lg border hover:bg-gray-100 transition">
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        {/* Job list */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((job) => {
            const initials = companyInitials(job.company);
            const pastel = pickColor(job.company);
            const isBookmarked = bookmarks[job.id];

            return (
              <div
                key={job.id}
                className="bg-white p-5 rounded-2xl shadow-sm border relative hover:-translate-y-1 hover:shadow-lg transition"
              >
                <button
                  onClick={() => toggleBookmark(job.id)}
                  className="absolute right-4 top-4 p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <BookmarkIcon
                    size={18}
                    className={isBookmarked ? "text-pink-500" : "text-gray-400"}
                  />
                </button>

                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold ${pastel}`}
                  >
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>
                      {job.location} • Cách {job.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock size={16} className="text-gray-400" />
                    <span>{job.time}</span>
                    <Star size={16} className="text-yellow-500" />
                    <span>
                      {job.rating} ({job.reviews} đánh giá)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <User size={16} className="text-gray-400" />
                    <span>{job.applicants} người ứng tuyển</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full border ${tagClass(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-lg font-semibold text-pink-600">
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onViewDetail(job.id)}
                      className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleApply(job.title)}
                      className="px-4 py-2 rounded-lg text-white text-sm bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all"
                    >
                      Ứng tuyển
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full bg-white p-8 rounded-xl border text-center text-gray-500">
              Không có công việc phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
