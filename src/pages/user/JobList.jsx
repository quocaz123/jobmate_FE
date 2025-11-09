import React, { useMemo, useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  User,
  Search,
  SlidersHorizontal,
  Lightbulb,
  Bookmark as BookmarkIcon,
  Sparkles,
} from "lucide-react";

const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    location: "TP.HCM",
    distance: "0.8km",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    type: "Part-time",
    rating: 4.8,
    reviews: 95,
    applicants: 12,
    tags: ["Tiếng Anh", "Part-time", "Đã xác minh"],
    salary: "250,000đ/buổi",
    saved: false,
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    location: "TP.HCM",
    distance: "2.1km",
    time: "Flexible • Remote",
    type: "Freelance",
    rating: 4.6,
    reviews: 67,
    applicants: 8,
    tags: ["Design", "Freelance", "Gấp"],
    salary: "500,000đ/poster",
    saved: true,
  },
  {
    id: 3,
    title: "Phục vụ bàn - Nhà hàng Nhật",
    company: "Sushi Hokkaido",
    location: "Đà Nẵng",
    distance: "3.5km",
    time: "17:00 - 22:00 • Cuối tuần",
    type: "Part-time",
    rating: 4.4,
    reviews: 156,
    applicants: 25,
    tags: ["Phục vụ", "Part-time", "Đã xác minh"],
    salary: "120,000đ/ca",
    saved: false,
  },
  {
    id: 4,
    title: "Nhân viên Marketing Online",
    company: "Công ty ABC Media",
    location: "Hà Nội",
    distance: "Remote",
    time: "Toàn thời gian",
    type: "Full-time",
    rating: 4.9,
    reviews: 88,
    applicants: 18,
    tags: ["Marketing", "Full-time", "Đã xác minh"],
    salary: "15-20 triệu/tháng",
    saved: false,
  },
];

function companyInitials(name) {
  const words = name.split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function pickColor(name) {
  const colors = [
    "bg-gradient-to-br from-pink-100 to-pink-50",
    "bg-gradient-to-br from-cyan-100 to-cyan-50",
    "bg-gradient-to-br from-amber-100 to-amber-50",
    "bg-gradient-to-br from-green-100 to-green-50",
    "bg-gradient-to-br from-indigo-100 to-indigo-50",
  ];
  return colors[Math.abs(name.charCodeAt(0)) % colors.length];
}

function tagClass(tag) {
  const t = tag.toLowerCase();
  if (t.includes("gấp")) return "bg-red-100 text-red-600 border-red-200";
  if (t.includes("đã xác minh")) return "bg-green-100 text-green-600 border-green-200";
  if (t.includes("freelance")) return "bg-pink-100 text-pink-600 border-pink-200";
  if (t.includes("part")) return "bg-cyan-100 text-cyan-800 border-cyan-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

export default function JobList({ onViewDetail }) {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(() =>
    JOBS_DATA.reduce((acc, j) => ({ ...acc, [j.id]: j.saved }), {})
  );
  const [activeDrop, setActiveDrop] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    area: null,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS_DATA.filter((j) => {
      const matchesQuery =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.join(" ").toLowerCase().includes(q);

      const matchesType = !filters.type || j.type === filters.type;
      const matchesArea = !filters.area || j.location === filters.area;

      return matchesQuery && matchesType && matchesArea;
    });
  }, [query, filters]);

  function toggleBookmark(id) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleApply(jobTitle) {
    alert(`🎉 Bạn đã ứng tuyển vào công việc "${jobTitle}" thành công!`);
  }

  function handleFilterChange(type, value) {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
    setActiveDrop(null); // tự động đóng dropdown
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-pink-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center relative">
          <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
            <Sparkles className="text-pink-500" /> Tìm việc làm phù hợp với bạn
          </h1>
          <p className="text-gray-500 mt-2">
            Hàng trăm cơ hội mới được cập nhật mỗi ngày.
          </p>

          {/* Search bar + dropdowns */}
          <div className="mt-6 bg-white p-3 rounded-2xl shadow-sm flex items-center gap-2 max-w-3xl mx-auto border relative">
            <Search className="text-gray-400 ml-2" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên công việc, công ty..."
              className="flex-1 outline-none text-sm text-gray-700"
            />

            {/* Dropdown buttons */}
            <div className="flex items-center gap-2 relative">
              {[
                { id: "filter", icon: <SlidersHorizontal size={16} />, label: "Bộ lọc" },
                { id: "suggest", icon: <Lightbulb size={16} />, label: "Gợi ý" },
                { id: "area", icon: <MapPin size={16} />, label: "Khu vực" },
              ].map((btn) => (
                <div key={btn.id} className="relative">
                  <button
                    onClick={() =>
                      setActiveDrop(activeDrop === btn.id ? null : btn.id)
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition ${
                      activeDrop === btn.id
                        ? "bg-gray-100 text-gray-800"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {btn.icon} {btn.label}
                  </button>

                  {/* Dropdown nội dung */}
                  {activeDrop === btn.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-md p-3 text-left text-sm z-10">
                      {btn.id === "filter" && (
                        <div className="space-y-2">
                          {["Part-time", "Full-time", "Freelance"].map((f) => (
                            <button
                              key={f}
                              onClick={() => handleFilterChange("type", f)}
                              className={`block w-full text-left px-2 py-1 rounded-lg transition ${
                                filters.type === f
                                  ? "bg-pink-100 text-pink-600 font-medium"
                                  : "hover:bg-gray-50 text-gray-600"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      )}
                      {btn.id === "suggest" && (
                        <ul className="space-y-1 text-gray-600">
                          {["Gia sư tiếng Anh", "Thiết kế đồ họa", "Phục vụ quán ăn", "Marketing online"].map(
                            (s) => (
                              <li
                                key={s}
                                onClick={() => {
                                  setQuery(s);
                                  setActiveDrop(null);
                                }}
                                className="cursor-pointer hover:text-pink-500"
                              >
                                • {s}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {btn.id === "area" && (
                        <ul className="space-y-1 text-gray-600">
                          {["TP.HCM", "Hà Nội", "Đà Nẵng"].map((a) => (
                            <li
                              key={a}
                              onClick={() => handleFilterChange("area", a)}
                              className={`cursor-pointer px-2 py-1 rounded-lg transition ${
                                filters.area === a
                                  ? "bg-pink-100 text-pink-600 font-medium"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              • {a}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bộ đếm */}
          <p className="text-sm text-gray-500 mt-3">
            🔍 Hiện có <b>{filtered.length}</b> công việc phù hợp
          </p>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((job) => {
          const initials = companyInitials(job.company);
          const pastel = pickColor(job.company);
          const isBookmarked = bookmarks[job.id];

          return (
            <div
              key={job.id}
              className="group bg-white p-6 rounded-2xl border shadow-sm relative hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <button
                onClick={() => toggleBookmark(job.id)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <BookmarkIcon
                  size={18}
                  className={isBookmarked ? "text-pink-500" : "text-gray-400"}
                />
              </button>

              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold ${pastel}`}
                >
                  {initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-cyan-500" />
                  <span>
                    {job.location} • {job.distance}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-pink-400" />
                  <span>{job.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Star size={15} className="text-yellow-400" />
                  <span>
                    {job.rating} ({job.reviews} đánh giá)
                  </span>
                  <User size={15} className="text-gray-400" />
                  <span>{job.applicants} ứng tuyển</span>
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
                <div className="text-lg font-semibold text-pink-600">{job.salary}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetail?.(job.id)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleApply(job.title)}
                    className="px-4 py-2 rounded-lg text-white text-sm bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-95"
                  >
                    Ứng tuyển
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full bg-white p-10 rounded-2xl border text-center text-gray-500 shadow-sm">
            Không có công việc phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
