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
  Clock,
  AlertCircle,
} from "lucide-react";
import InfoTab from "./ProfileTabs/InfoTab";
import TwoFactorTab from "./ProfileTabs/TwoFactorTab";
import VerifyCCCDTab from "./ProfileTabs/VerifyCCCDTab";
import ReviewsTab from "./ProfileTabs/ReviewsTab";
import CareerInfoTab from "./ProfileTabs/CareerInfoTab";
import { uploadFile } from "../../services/uploadFileService";
import { getUserInfo, updateUserInfo, updateTwoFactorStatus } from "../../services/userService";
import { showSuccess, showError } from "../../utils/toast";

// Dữ liệu mẫu (thay bằng API sau)
const MOCK_USER = {
  fullName: "John Doe Updated",
  email: "quocthangbinh2345@gmail.com",
  address: "33 Lão Bạng, Hải Châu , Đà Nẵng",
  avatarUrl: "",
  roles: [{ name: "USER", description: "Người dùng hệ thống" }],
  verificationStatus: "VERIFIED",
  status: "ACTIVE",
  createdAt: "2025-10-25T17:28:07.042378",
  updatedAt: "2025-10-25T17:31:06.676253",
  university: "ĐH Duy Tân",
  major: "Kỹ thuật phần mềm",
  year: "Năm 4",
  gpa: "3.6",
  about:
    "Tôi là sinh viên năm cuối ngành Kỹ thuật phần mềm, có niềm đam mê với phát triển web và thiết kế UI/UX.",
  // Mock data cho rating và CCCD
  averageRating: 4.9,
  ratingCount: 12,
  cccdVerified: true,
  // Mock data cho thông tin công việc
  preferredJobType: "PART_TIME",
  availableDays: "Thứ 2, 3, 4, 5, 6",
  availableTime: "18:00 - 22:00",
  // Mock data cho skills
  skills: "React, JavaScript, Node.js, Python, UI/UX Design",
  // Mock data cho experience
  experiences: [
    {
      title: "Frontend Developer",
      company: "Công ty ABC",
      period: "2023 - Hiện tại",
      description: "Phát triển ứng dụng web với React và TypeScript"
    }
  ],
  // Mock data cho reviews
  reviews: [
    {
      id: 1,
      jobTitle: "Nhà hàng Italia",
      date: "10/1/2024",
      comment: "Làm việc chăm chỉ, nhiệt tình với khách hàng",
      rating: 4.8
    },
    {
      id: 2,
      jobTitle: "Trung tâm gia sư ABC",
      date: "5/1/2024",
      comment: "Giảng dạy tốt, học sinh tiến bộ rõ rệt",
      rating: 5.0
    }
  ]
};

const Profile = ({ userInfo, onAvatarChange, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // "info", "2fa", "verify", "reviews"
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

  useEffect(() => {
    console.log("Received userInfo:", userInfo);
    if (userInfo) {
      const initialTwoFa =
        userInfo.twoFaEnabled ??
        userInfo.twoFactorEnabled ??
        userInfo.isTwoFaEnabled ??
        false;

      setProfile({
        ...MOCK_USER, // fallback nếu thiếu field
        ...userInfo, // dữ liệu thực từ API ưu tiên hơn
      });

      setTwoFactorEnabled(Boolean(initialTwoFa));
    }
    setAvatarError(false);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.avatarUrl) {
      setProfile((prev) => (prev ? { ...prev, avatarUrl: userInfo.avatarUrl } : prev));
    }
  }, [userInfo?.avatarUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      const res = await updateUserInfo(profile);
      const updatedProfile = res?.data?.data ? { ...profile, ...res.data.data } : profile;

      setProfile(updatedProfile);

      if (updatedProfile.avatarUrl && onAvatarChange) {
        onAvatarChange(updatedProfile.avatarUrl);
      }

      if (onProfileUpdate) {
        onProfileUpdate(updatedProfile);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  const verificationStatusRaw =
    userInfo?.verificationStatus || profile?.verificationStatus || "UNVERIFIED";
  const verificationStatus = verificationStatusRaw.toUpperCase();

  const VERIFICATION_BADGES = {
    VERIFIED: {
      label: "Đã xác minh",
      className: "bg-green-100 text-green-700 border border-green-200",
      icon: CheckCircle,
    },
    PENDING: {
      label: "Đang chờ xác minh",
      className: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      icon: Clock,
    },
    REJECTED: {
      label: "Bị từ chối xác minh",
      className: "bg-red-100 text-red-700 border border-red-200",
      icon: XCircle,
    },
    UNVERIFIED: {
      label: "Chưa xác minh",
      className: "bg-gray-100 text-gray-600 border border-gray-200",
      icon: AlertCircle,
    },
  };

  const verificationBadge = VERIFICATION_BADGES[verificationStatus] || null;
  const verificationReason =
    userInfo?.verificationReason ||
    profile?.verificationReason ||
    userInfo?.verificationNote ||
    profile?.verificationNote ||
    userInfo?.verificationMessage ||
    profile?.verificationMessage ||
    userInfo?.verificationRemark ||
    profile?.verificationRemark ||
    "";

  const handleToggleTwoFactor = async (targetState) => {
    if (twoFactorLoading || targetState === twoFactorEnabled) {
      return;
    }

    setTwoFactorLoading(true);
    try {
      const response = await updateTwoFactorStatus(targetState);
      const enabledResponse =
        response?.data?.enabled ??
        response?.data?.data?.enabled ??
        targetState;
      setTwoFactorEnabled(Boolean(enabledResponse));
      setProfile((prev) =>
        prev
          ? {
            ...prev,
            twoFaEnabled: enabledResponse,
            twoFactorEnabled: enabledResponse,
          }
          : prev
      );
      showSuccess(
        response?.data?.message ||
        (enabledResponse
          ? "Đã bật xác thực hai yếu tố."
          : "Đã tắt xác thực hai yếu tố.")
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Không thể cập nhật trạng thái 2FA. Vui lòng thử lại.";
      showError(errorMessage);
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Disable nút chỉnh sửa khi ở các tab không cho phép chỉnh sửa
  const isEditDisabled = ["2fa", "verify", "reviews"].includes(activeTab);

  if (!profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
            <p className="text-gray-500">Đang tải dữ liệu hồ sơ...</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gray-300 text-white" disabled>
            Chỉnh sửa
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm h-64 animate-pulse" />
          <div className="col-span-2 bg-white border rounded-lg p-6 shadow-sm h-64 animate-pulse" />
        </div>
      </div>
    );
  }

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
          disabled={isEditDisabled}
          className={`px-4 py-2 rounded-lg transition ${isEditDisabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : isEditing
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
                src={avatarError || !profile?.avatarUrl ? "https://via.placeholder.com/150" : profile.avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border"
                onError={() => {
                  console.error('Lỗi khi tải ảnh avatar:', profile.avatarUrl);
                  setAvatarError(true);
                }}
                onLoad={() => setAvatarError(false)}
              />
              <button
                className={`absolute bottom-0 right-0 p-1.5 rounded-full transition ${isEditing ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"}`}
                title={isEditing ? "Không thể đổi avatar khi đang chỉnh sửa" : "Tải ảnh lên"}
                disabled={isEditing}
                onClick={() => {
                  if (isEditing) return;

                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';

                  input.onchange = async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    try {
                      const uploadRes = await uploadFile(file, "AVATAR");

                      const newAvatarUrl = uploadRes?.url || uploadRes?.fileUrl || uploadRes;

                      setProfile(prev => ({
                        ...prev,
                        avatarUrl: newAvatarUrl
                      }));

                      if (onAvatarChange && newAvatarUrl) {
                        onAvatarChange(newAvatarUrl);
                      }

                    } catch (err) {
                      console.error("Lỗi upload avatar:", err);
                    }
                  };

                  input.click();
                }}
              >
                <Camera size={16} className="text-white" />
              </button>
            </div>

            <h2 className="font-semibold text-lg text-gray-800">
              {profile.fullName}
            </h2>
            <p className="text-gray-500 text-sm">
              {profile.major || "Chưa cập nhật chuyên ngành"}
            </p>

            {/* Rating và Verification Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 mb-3 px-2">
              {verificationBadge && (
                <span
                  className={`${verificationBadge.className} text-xs px-3 py-1 rounded-full flex items-center gap-1`}
                >
                  <verificationBadge.icon size={14} /> {verificationBadge.label}
                </span>
              )}

              {profile.averageRating && profile.averageRating > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-gray-800">
                    {profile.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ({profile.ratingCount || 0} đánh giá)
                  </span>
                </div>
              )}
            </div>

            {/* Thông tin công việc */}
            {(profile.preferredJobType || profile.availableDays || profile.availableTime) && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 mb-3 px-2">
                {profile.preferredJobType && (
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                    {profile.preferredJobType === "FULL_TIME" ? "Toàn thời gian" :
                      profile.preferredJobType === "PART_TIME" ? "Bán thời gian" :
                        profile.preferredJobType === "FREELANCE" ? "Freelance" :
                          profile.preferredJobType}
                  </span>
                )}
                {profile.availableDays && (
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
                    {profile.availableDays}
                  </span>
                )}
                {profile.availableTime && (
                  <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">
                    {profile.availableTime}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${profile.status === "ACTIVE"
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
          {/* Tab Navigation */}
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            {[
              { id: "info", label: "Thông tin cá nhân" },
              { id: "career", label: "Thông tin việc làm" },
              { id: "2fa", label: "Bật 2FA" },
              { id: "verify", label: "Xác minh CCCD" },
              { id: "reviews", label: "Đánh giá" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            {activeTab === "info" && (
              <InfoTab
                profile={profile}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            )}

            {activeTab === "career" && (
              <CareerInfoTab
                profile={profile}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            )}

            {activeTab === "2fa" && (
              <TwoFactorTab
                twoFactorEnabled={twoFactorEnabled}
                isUpdating={twoFactorLoading}
                onToggle={handleToggleTwoFactor}
              />
            )}

            {activeTab === "verify" && (
              <VerifyCCCDTab
                verificationStatus={verificationStatus}
                rejectionReason={verificationReason}
                onVerifySuccess={async (nextStatus = "PENDING") => {
                  setProfile((prev) => {
                    if (!prev) return prev;
                    const updatedProfile = {
                      ...prev,
                      verificationStatus: nextStatus,
                      verificationReason: nextStatus === "PENDING" ? null : prev.verificationReason,
                    };
                    if (onProfileUpdate) {
                      onProfileUpdate(updatedProfile);
                    }
                    return updatedProfile;
                  });

                  try {
                    const refreshed = await getUserInfo();
                    const latest = refreshed?.data?.data;
                    if (latest) {
                      setProfile((prev) => (prev ? { ...prev, ...latest } : latest));
                    }
                  } catch (error) {
                    console.error("Không thể làm mới trạng thái xác minh:", error);
                  }
                }}
              />
            )}

            {activeTab === "reviews" && (
              <ReviewsTab userId={userInfo?.id || profile?.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

