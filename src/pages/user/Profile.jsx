import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  ClipboardList,
  Percent,
  Camera,
} from "lucide-react";


// Dữ liệu mẫu (thay bằng API sau)
const MOCK_USER = {
  fullName: "John Doe Updated",
  email: "quocthangbinh2345@gmail.com",
  address: "33 Lão Bạng, Hải Châu , Đà Nẵng",
  avatarUrl: "https://via.placeholder.com/150",
  roles: [{ name: "USER", description: "Người dùng hệ thống" }],
  verificationStatus: "UNVERIFIED",
  status: "ACTIVE",
  createdAt: "2025-10-25T17:28:07.042378",
  updatedAt: "2025-10-25T17:31:06.676253",
  university: "ĐH Duy Tân",
  major: "Kỹ thuật phần mềm",
  year: "Năm 4",
  gpa: "3.6",
  about:
    "Tôi là sinh viên năm cuối ngành Kỹ thuật phần mềm, có niềm đam mê với phát triển web và thiết kế UI/UX.",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_USER);

  useEffect(() => {
    // Sau này thay bằng API fetch
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Lưu dữ liệu:", profile);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  const isVerified = profile.verificationStatus === "VERIFIED";

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hồ sơ cá nhân
            </h1>
            <p className="text-gray-500">
              Quản lý thông tin và hồ sơ của bạn
            </p>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-4 py-2 rounded-lg transition ${
              isEditing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-cyan-600 text-white hover:bg-cyan-700"
            }`}
          >
            {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
          </button>
        </div>

        {/* Hồ sơ chính */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center relative">
              <div className="relative w-24 h-24 mb-3">
                <img
                  src={profile.avatarUrl}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border"
                />
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 bg-cyan-600 p-1.5 rounded-full hover:bg-cyan-700 transition"
                    title="Tải ảnh lên"
                  >
                    <Camera size={16} className="text-white" />
                  </button>
                )}
              </div>

              <h2 className="font-semibold text-lg text-gray-800">
                {profile.fullName}
              </h2>
              <p className="text-gray-500 text-sm">
                {profile.major || "Chưa cập nhật chuyên ngành"}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {isVerified ? (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={14} /> Đã xác minh
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <XCircle size={14} /> Chưa xác minh
                  </span>
                )}

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    profile.status === "ACTIVE"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {profile.status === "ACTIVE" ? "Đang hoạt động" : "Tạm khóa"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {profile.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {profile.address || "Chưa cập nhật"}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Tham gia:{" "}
                  {formatDate(profile.createdAt)}
                </div>
              </div>
            </div>

            {/* Thống kê */}
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3">Thống kê</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ClipboardList size={16} /> Công việc hoàn thành
                  </span>
                  <span className="font-semibold text-gray-800">8</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Percent size={16} /> Tỷ lệ hoàn thành
                  </span>
                  <span className="font-semibold text-gray-800">95%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Star size={16} /> Đánh giá trung bình
                  </span>
                  <span className="font-semibold text-gray-800">4.9/5.0</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cột phải */}
          <div className="col-span-2 space-y-6">
            {/* Thông tin cá nhân */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Họ và tên", name: "fullName" },
                  { label: "Email", name: "email" },
                  { label: "Địa chỉ", name: "address" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-gray-500">{f.label}</label>
                    <input
                      name={f.name}
                      className="w-full mt-1 border rounded-lg p-2 text-gray-700 bg-gray-50"
                      value={profile[f.name] || ""}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Học vấn */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">
                Thông tin học vấn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Trường đại học", name: "university" },
                  { label: "Ngành học", name: "major" },
                  { label: "Năm học", name: "year" },
                  { label: "GPA", name: "gpa" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-gray-500">{f.label}</label>
                    <input
                      name={f.name}
                      className="w-full mt-1 border rounded-lg p-2 text-gray-700 bg-gray-50"
                      value={profile[f.name] || ""}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Giới thiệu */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">
                Giới thiệu bản thân
              </h3>
              <textarea
                name="about"
                className="w-full border rounded-lg p-3 text-gray-700 bg-gray-50 resize-none"
                rows="3"
                value={profile.about || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
