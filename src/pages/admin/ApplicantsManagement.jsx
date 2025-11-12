import React, { useState } from "react";
import {
    Search,
    Star,
    MapPin,
    Clock,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle,
    XCircle,
    Eye,
    ChevronLeft,
    DollarSign,
    X,
} from "lucide-react";
import { showSuccess, showError } from "../../utils/toast";

// Mock jobs list
const mockJobs = [
    {
        id: 1,
        title: "Nhân viên phục vụ",
        applicants: 12,
        requiredSkills: ["Giao tiếp tốt", "Nhiệt tình", "Chăm chỉ"],
        salary: "25.000đ/giờ",
        workingDays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
        workingHours: "8:00 - 17:00",
        location: "Quận 1, TP.HCM",
        jobType: "Part-time",
    },
    {
        id: 2,
        title: "Nhân viên bán hàng",
        applicants: 8,
        requiredSkills: ["Bán hàng", "Tư vấn", "Marketing"],
        salary: "30.000đ/giờ",
        workingDays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
        workingHours: "9:00 - 18:00",
        location: "Quận 3, TP.HCM",
        jobType: "Part-time",
    },
    {
        id: 3,
        title: "Gia sư Toán",
        applicants: 5,
        requiredSkills: ["Toán học", "Sư phạm", "Kiên nhẫn"],
        salary: "100.000đ/giờ",
        workingDays: ["Thứ 7", "Chủ nhật"],
        workingHours: "Linh hoạt",
        location: "Quận 7, TP.HCM",
        jobType: "Freelance",
    },
];

// Mock candidates data mapped by job
const mockCandidatesByJob = {
    1: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A",
            status: "pending",
            appliedDate: "2024-01-20",
            rating: 4.8,
            experience: "6 tháng kinh nghiệm",
            location: "Quận 1, TP.HCM",
            skills: ["Giao tiếp tốt", "Nhiệt tình", "Chăm chỉ"],
            email: "nguyenvana@email.com",
            phone: "0901234567",
            matchScore: 92,
        },
        {
            id: 3,
            name: "Lê Văn C",
            avatar: "https://ui-avatars.com/api/?name=Le+Van+C",
            status: "accepted",
            appliedDate: "2024-01-18",
            rating: 4.9,
            experience: "1 năm kinh nghiệm",
            location: "Quận 1, TP.HCM",
            skills: ["Phục vụ", "Pha chế", "Tiếng Anh"],
            email: "levanc@email.com",
            phone: "0923456789",
            matchScore: 95,
        },
    ],
    2: [
        {
            id: 2,
            name: "Trần Thị B",
            avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B",
            status: "pending",
            appliedDate: "2024-01-19",
            rating: 4.5,
            experience: "1 năm kinh nghiệm",
            location: "Quận 3, TP.HCM",
            skills: ["Bán hàng", "Tư vấn", "Marketing"],
            email: "tranthib@email.com",
            phone: "0912345678",
            matchScore: 88,
        },
        {
            id: 4,
            name: "Phạm Thị D",
            avatar: "https://ui-avatars.com/api/?name=Pham+Thi+D",
            status: "rejected",
            appliedDate: "2024-01-17",
            rating: 4.2,
            experience: "3 tháng kinh nghiệm",
            location: "Quận 5, TP.HCM",
            skills: ["Bán hàng", "Giao tiếp"],
            email: "phamthid@email.com",
            phone: "0934567890",
            matchScore: 75,
        },
    ],
    3: [],
};

const ApplicantsManagement = () => {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMatch, setFilterMatch] = useState("all");
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const candidates = selectedJobId ? mockCandidatesByJob[selectedJobId] || [] : [];

    const filteredCandidates = candidates.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchScoreMatch =
            filterMatch === "all" ||
            (filterMatch === "high" && c.matchScore >= 90) ||
            (filterMatch === "medium" && c.matchScore >= 75 && c.matchScore < 90) ||
            (filterMatch === "low" && c.matchScore < 75);
        return nameMatch && matchScoreMatch;
    });

    const handleAccept = (candidateId) => {
        showSuccess(`Đã chấp nhận ứng viên ${candidateId}`);
        // TODO: Call API
    };

    const handleReject = (candidateId) => {
        showError(`Đã từ chối ứng viên ${candidateId}`);
        // TODO: Call API
    };

    if (selectedJobId) {
        const selectedJob = mockJobs.find((j) => j.id === selectedJobId);

        return (
            <div className="p-6 space-y-6">
                {/* Back Button */}
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={() => {
                            setSelectedJobId(null);
                            setSearchQuery("");
                            setFilterMatch("all");
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Quay lại
                    </button>
                </div>

                {/* Job Header */}
                <div className="bg-gradient-to-r from-cyan-50 to-pink-50 border border-cyan-200 rounded-lg p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">{selectedJob?.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {selectedJob?.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {selectedJob?.workingHours}
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {selectedJob?.salary}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {selectedJob?.requiredSkills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Tổng ứng viên</p>
                            <p className="text-3xl font-bold text-cyan-600">{selectedJob?.applicants}</p>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white border rounded-lg p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                placeholder="Tìm kiếm ứng viên..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            value={filterMatch}
                            onChange={(e) => setFilterMatch(e.target.value)}
                            className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="high">90%+ phù hợp</option>
                            <option value="medium">75-89% phù hợp</option>
                            <option value="low">Dưới 75%</option>
                        </select>
                    </div>
                </div>

                {/* Candidates List */}
                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">
                            Danh sách ứng viên ({filteredCandidates.length})
                        </h2>
                    </div>
                    <div className="p-6">
                        {filteredCandidates.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Không có ứng viên nào</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredCandidates.map((candidate) => {
                                    const skillMatch = candidate.skills.filter((skill) =>
                                        selectedJob?.requiredSkills.some(
                                            (req) =>
                                                req.toLowerCase().includes(skill.toLowerCase()) ||
                                                skill.toLowerCase().includes(req.toLowerCase())
                                        )
                                    ).length;
                                    const skillMatchPercent = Math.round(
                                        (skillMatch / (selectedJob?.requiredSkills.length || 1)) * 100
                                    );

                                    return (
                                        <div
                                            key={candidate.id}
                                            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 hover:border-cyan-300 hover:shadow-sm transition-all lg:flex-row lg:items-center lg:justify-between"
                                        >
                                            <div className="flex items-start gap-4 flex-1">
                                                <img
                                                    src={candidate.avatar}
                                                    alt={candidate.name}
                                                    className="h-12 w-12 rounded-full"
                                                />
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                                                            <p className="text-sm text-gray-600">Ngày nộp: {candidate.appliedDate}</p>
                                                        </div>
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${candidate.status === "accepted"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : candidate.status === "pending"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {candidate.status === "accepted"
                                                                ? "Đã chấp nhận"
                                                                : candidate.status === "pending"
                                                                    ? "Chờ duyệt"
                                                                    : "Đã từ chối"}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            {candidate.rating}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            {candidate.location}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {candidate.experience}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {candidate.skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className={`px-2 py-1 text-xs rounded border ${selectedJob?.requiredSkills.some(
                                                                    (req) =>
                                                                        req.toLowerCase().includes(skill.toLowerCase()) ||
                                                                        skill.toLowerCase().includes(req.toLowerCase())
                                                                )
                                                                        ? "border-green-300 bg-green-50 text-green-700"
                                                                        : "border-gray-200 bg-white text-gray-700"
                                                                    }`}
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-cyan-600 to-pink-600 h-2 rounded-full"
                                                                style={{ width: `${candidate.matchScore}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {candidate.matchScore}% phù hợp
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 pt-1">
                                                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                                            <div
                                                                className="bg-green-500 h-1.5 rounded-full"
                                                                style={{ width: `${skillMatchPercent}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-gray-600">
                                                            {skillMatch}/{selectedJob?.requiredSkills.length} kỹ năng khớp
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 lg:flex-col">
                                                <button
                                                    onClick={() => setSelectedCandidate(candidate)}
                                                    className="flex-1 lg:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Xem hồ sơ
                                                </button>
                                                <button className="flex-1 lg:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                                                    <MessageSquare className="h-4 w-4" />
                                                    Nhắn tin
                                                </button>
                                                {candidate.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAccept(candidate.id)}
                                                            className="flex-1 lg:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            Chấp nhận
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(candidate.id)}
                                                            className="flex-1 lg:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                            Từ chối
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal xem hồ sơ */}
                {selectedCandidate && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Hồ sơ ứng viên</h2>
                                    <p className="text-sm text-gray-600">Thông tin chi tiết về ứng viên</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCandidate(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={selectedCandidate.avatar}
                                        alt={selectedCandidate.name}
                                        className="h-16 w-16 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                                        <p className="text-gray-600">{selectedCandidate.experience}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{selectedCandidate.rating}</span>
                                            <span className="text-sm text-gray-500">(24 đánh giá)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Thông tin liên hệ</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <span>{selectedCandidate.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span>{selectedCandidate.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span>{selectedCandidate.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Kỹ năng</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCandidate.skills.map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Độ phù hợp</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-cyan-600 to-pink-600 h-3 rounded-full"
                                                    style={{ width: `${selectedCandidate.matchScore}%` }}
                                                />
                                            </div>
                                            <span className="text-lg font-bold text-gray-900">{selectedCandidate.matchScore}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Nhắn tin
                                    </button>
                                    {selectedCandidate.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    handleAccept(selectedCandidate.id);
                                                    setSelectedCandidate(null);
                                                }}
                                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Chấp nhận
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleReject(selectedCandidate.id);
                                                    setSelectedCandidate(null);
                                                }}
                                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Từ chối
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý ứng viên</h1>
                <p className="text-gray-600 mt-1">Chọn công việc để xem danh sách ứng viên</p>
            </div>

            {/* Jobs List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockJobs.map((job) => (
                    <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-cyan-300 hover:shadow-md transition-all"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            <span className="text-2xl font-bold text-cyan-600">{job.applicants}</span> ứng viên
                        </p>
                        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-600 to-pink-600 text-white rounded-lg hover:from-cyan-700 hover:to-pink-700">
                            Xem danh sách
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicantsManagement;
