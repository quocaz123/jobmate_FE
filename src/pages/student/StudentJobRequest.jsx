import React, { useMemo, useState } from "react";
import SidebarStudent from "../../components/SidebarStudent";
import TopbarStudent from "../../components/TopbarStudent";
import {
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Activity,
  X,
} from "lucide-react";

/* Sample jobs */
const JOBS_DATA = [
  {
    id: 1,
    title: "Gia sư Tiếng Anh - Lớp 12",
    company: "Trung tâm Anh ngữ ILA",
    location: "Hà Nội",
    salary: "250,000đ/buổi",
    time: "19:00 - 21:00 • Thứ 2,4,6",
    tags: ["Tiếng Anh", "Giao tiếp", "Part-time"],
    type: "Part-time",
    description: "Dạy tiếng Anh giao tiếp và luyện đề thi tốt nghiệp cho học sinh lớp 12.",
  },
  {
    id: 2,
    title: "Thiết kế Poster sự kiện",
    company: "Công ty Event ABC",
    location: "Hà Nội",
    salary: "500,000đ/poster",
    time: "Flexible • Remote",
    tags: ["Photoshop", "Illustrator", "Freelance"],
    type: "Freelance",
    description: "Thiết kế poster sáng tạo cho các sự kiện âm nhạc và hội thảo của công ty.",
  },
  {
    id: 3,
    title: "Thực tập Frontend Developer",
    company: "Công ty Công nghệ ABC",
    location: "Hà Nội",
    salary: "8 - 12 triệu/tháng",
    time: "Toàn thời gian / Part-time",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    type: "Part-time",
    description: "Phát triển giao diện web bằng React và Tailwind, làm việc cùng team UI/UX.",
  },
  {
    id: 4,
    title: "Content Creator - TikTok",
    company: "Digital Agency XYZ",
    location: "Hà Nội",
    salary: "300,000đ/video",
    time: "Flexible • 3-4 video/tuần",
    tags: ["Video editing", "Social Media", "Freelance"],
    type: "Freelance",
    description: "Sáng tạo nội dung ngắn cho TikTok, quay và dựng video cơ bản.",
  },
];

function pickRandom(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function computeMatchPercent(requirement, job) {
  let score = 0;
  const reqSkills = requirement.skills.map((s) => s.toLowerCase().trim()).filter(Boolean);
  const jobTags = job.tags.map((t) => t.toLowerCase());
  if (reqSkills.length) {
    const matchedSkills = reqSkills.filter((s) =>
      jobTags.some((t) => t.includes(s) || s.includes(t))
    );
    score += Math.min(60, (matchedSkills.length / Math.max(1, reqSkills.length)) * 60);
  }
  if (requirement.type && job.type && job.type.toLowerCase().includes(requirement.type.toLowerCase())) score += 20;
  if (requirement.location && job.location && job.location.toLowerCase().includes(requirement.location.toLowerCase())) score += 20;
  return Math.min(100, Math.round(score));
}

function percentClass(p) {
  if (p >= 90) return "bg-green-100 text-green-700";
  if (p >= 80) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export default function StudentJobRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Hà Nội");
  const [type, setType] = useState("Part-time");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS"]);
  const [loading, setLoading] = useState(false);

  const [jobList, setJobList] = useState(JOBS_DATA);
  const [selectedJob, setSelectedJob] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const suggestedJobs = useMemo(() => {
    const req = { skills, type, location };
    return pickRandom(jobList, 3).map((j) => ({
      ...j,
      match: computeMatchPercent(req, j),
    }));
  }, [skills, type, location, jobList]);

  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    if (!skills.map((x) => x.toLowerCase()).includes(s.toLowerCase())) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillInput("");
  }

  function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Yêu cầu tìm việc đã được tạo (mô phỏng).");
    }, 800);
  }

  function handleShowMore() {
   
    const newJobs = pickRandom(JOBS_DATA, 3);
    setJobList((prev) => [...prev, ...newJobs]);
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <SidebarStudent />
      <TopbarStudent />

      <main className="ml-64 pt-20 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Tạo yêu cầu tìm việc
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <form onSubmit={handleCreate} className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
              <h2 className="text-lg font-medium text-indigo-700 mb-3">
                Thông tin cơ bản
              </h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề yêu cầu..."
                className="w-full border border-indigo-200 rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-300"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết..."
                className="w-full border border-indigo-200 rounded-md px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-indigo-300"
              />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-indigo-200 rounded-md px-3 py-2"
                >
                  <option>Hà Nội</option>
                  <option>TP.HCM</option>
                  <option>Đà Nẵng</option>
                  <option>Remote</option>
                </select>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border border-indigo-200 rounded-md px-3 py-2"
                >
                  <option>Part-time</option>
                  <option>Toàn thời gian</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
              </div>
            </section>

          
            <section className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
              <h2 className="text-lg font-medium text-indigo-700 mb-3">Kỹ năng</h2>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Nhập kỹ năng..."
                  className="flex-1 border border-indigo-200 rounded-md px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="p-2 bg-indigo-600 text-white rounded-md"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-2"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 size={12} className="text-indigo-500" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

       
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow"
              >
                {loading ? "Đang tạo..." : "Tạo yêu cầu"}
              </button>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="px-4 py-2 rounded-full border text-indigo-700 hover:bg-indigo-50"
              >
                Xem trước
              </button>
            </div>
          </form>

        
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-4">
              <h3 className="text-md font-medium text-indigo-700 mb-2">Gợi ý</h3>
              <div className="space-y-3">
                {suggestedJobs.map((j) => (
                  <div
                    key={j.id}
                    className="p-3 border border-indigo-50 rounded-lg hover:shadow transition bg-white"
                  >
                    <h4 className="text-sm font-semibold text-gray-800">{j.title}</h4>
                    <p className="text-xs text-gray-500">{j.company}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><MapPin size={14} />{j.location}</span>
                      <span className="flex items-center gap-1"><DollarSign size={14} />{j.salary}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${percentClass(j.match)}`}>
                        {j.match}% phù hợp
                      </span>
                      <button
                        onClick={() => setSelectedJob(j)}
                        className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={handleShowMore}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Xem thêm gợi ý
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-4 text-center text-sm text-gray-500">
              <Activity size={18} className="mx-auto mb-2 text-indigo-400" />
              Gợi ý dựa trên kỹ năng và loại công việc bạn chọn.
            </div>
          </aside>
        </div>
      </main>

     
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedJob(null)}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {selectedJob.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{selectedJob.company}</p>
            <p className="text-sm text-gray-500 mb-2">{selectedJob.description}</p>
            <p className="text-sm text-gray-500">
              💰 {selectedJob.salary} — 📍 {selectedJob.location}
            </p>
          </div>
        </div>
      )}

    
      {previewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[450px] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setPreviewOpen(false)}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Xem trước yêu cầu của bạn
            </h3>
            <p className="text-sm text-gray-700"><b>Tiêu đề:</b> {title || "Chưa nhập"}</p>
            <p className="text-sm text-gray-700"><b>Mô tả:</b> {description || "Chưa có mô tả"}</p>
            <p className="text-sm text-gray-700"><b>Địa điểm:</b> {location}</p>
            <p className="text-sm text-gray-700"><b>Loại:</b> {type}</p>
            <p className="text-sm text-gray-700 mt-2">
              <b>Kỹ năng:</b> {skills.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
