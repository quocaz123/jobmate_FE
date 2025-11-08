import React, { useMemo, useState, useEffect } from "react";
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
import { getNearbyJobs } from "../../services/jobService";
import ApplicationModal from "../../components/User/ApplicationModal";

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

export default function JobList({ onViewDetail, userInfo }) {
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const res = await getNearbyJobs();
        console.log(res);
        const list = res?.data?.data?.data || res?.data?.data || [];
        setJobs(list);
      } catch (err) {
        console.error('Lỗi khi tải danh sách công việc:', err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs
      .map((j) => {
        let distanceText = null;
        if (j.distance !== undefined && j.distance !== null) {
          const dist = Number(j.distance);
          if (!isNaN(dist) && dist > 0) {
            if (dist < 1) {
              distanceText = `${Math.round(dist * 1000)}m`;
            } else {
              distanceText = `${dist.toFixed(1)}km`;
            }
          }
        }
        const tags = [];
        if (j.skills) {
          tags.push(...j.skills.split(',').map(s => s.trim()).filter(Boolean));
        }
        if (j.jobType) {
          const typeMap = { PART_TIME: 'Part-time', FULL_TIME: 'Toàn thời gian', FREELANCE: 'Freelance', INTERNSHIP: 'Thực tập' };
          tags.push(typeMap[j.jobType] || j.jobType);
        }
        if (j.workMode === 'REMOTE') tags.push('Từ xa');
        if (j.status === 'APPROVED') tags.push('Đã xác minh');

        return { ...j, distance: distanceText, tags };
      })
      .filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.companyName?.toLowerCase().includes(q) ||
          j.company?.toLowerCase().includes(q) ||
          (j.skills && j.skills.toLowerCase().includes(q))
      );
  }, [query, jobs]);

  function toggleBookmark(id) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleApply(job) {
    setSelectedJob(job);
    setShowModal(true);
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
        {loading && (
          <div className="text-center py-8 text-gray-500">Đang tải danh sách công việc...</div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((job) => {
              const jobId = job.id || job.job_id || job.jobId;
              const companyName = job.companyName || job.company || 'Công ty';
              const initials = companyInitials(companyName);
              const pastel = pickColor(companyName);

              return (
                <div
                  key={jobId}
                  className="bg-white p-5 rounded-2xl shadow-sm border relative hover:-translate-y-1 hover:shadow-lg transition"
                >
                  <button
                    onClick={() => toggleBookmark(jobId)}
                    className="absolute right-4 top-4 p-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <BookmarkIcon
                      size={18}
                      className={bookmarks[jobId] ? "text-pink-500" : "text-gray-400"}
                    />
                  </button>

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold ${pastel}`}
                    >
                      {initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis" title={job.title}>
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{job.companyName || job.company}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>
                        {job.location || job.address}
                        {job.distance ? ` • Cách ${job.distance}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>
                        {job.workingHours || 'Linh hoạt'} • {job.workingDays || 'Linh hoạt'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star size={16} className={job.averageRating && job.averageRating > 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
                      <span>
                        {job.averageRating && job.averageRating > 0
                          ? `${job.averageRating.toFixed(1)} (${job.ratingCount || 0} đánh giá)`
                          : `Chưa có đánh giá (${job.ratingCount || 0} đánh giá)`
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <User size={16} className="text-gray-400" />
                      <span>{job.applicationCount || 0} người ứng tuyển</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags && Array.isArray(job.tags) && job.tags.length > 0 ? (
                      job.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full border ${tagClass(t)}`}
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                        {job.jobType || 'Part-time'}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-lg font-semibold text-pink-600">
                      {job.salary ?
                        typeof job.salary === 'number'
                          ? `${job.salary.toLocaleString('vi-VN')}đ/${job.salaryUnit || 'buổi'}`
                          : job.salary
                        : 'Thỏa thuận'}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onViewDetail(jobId)}
                        className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => handleApply(job)}
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
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedJob(null);
          }}
          jobTitle={selectedJob.title}
          userInfo={userInfo}
          jobId={selectedJob.id || selectedJob.job_id || selectedJob.jobId}
        />
      )}
    </div>
  );
}
