import React, { useState } from "react";
import SidebarStudent from "../../components/SidebarStudent";
import TopbarStudent from "../../components/TopbarStudent";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    CheckCircle,
    Star,
    ClipboardList,
    Percent,
    Camera,
} from "lucide-react";

export default function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Nguyễn Văn A",
        birth: "15/05/2003",
        email: "nguyenvana@email.com",
        phone: "0123 456 789",
        gender: "Nam",
        address: "Quận 1, TP.HCM",
        university: "ĐH Bách Khoa TP.HCM",
        major: "Công nghệ thông tin",
        year: "Năm 3",
        gpa: "3.5",
        about:
            "Tôi là sinh viên năm 3 ngành CNTT, có kinh nghiệm làm việc part-time tại nhà hàng và gia sư. Tôi có khả năng giao tiếp tốt, làm việc chăm chỉ và có trách nhiệm.",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Dữ liệu cập nhật:", profile);
    };

    const handleUpload = () => {
        console.log("Chọn ảnh đại diện (sẽ gọi API upload sau)");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <SidebarStudent />
            <TopbarStudent />

            <main className="ml-64 pt-20 p-6 space-y-6 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
                        <p className="text-gray-500">Quản lý thông tin và hồ sơ của bạn</p>
                    </div>
                    <button
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        className={`px-4 py-2 rounded-lg transition ${isEditing
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
                            {/* Avatar */}
                            <div className="relative w-24 h-24 mb-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=11"
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                                {isEditing && (
                                    <button
                                        onClick={handleUpload}
                                        className="absolute bottom-0 right-0 bg-cyan-600 p-1.5 rounded-full hover:bg-cyan-700 transition"
                                        title="Tải ảnh lên"
                                    >
                                        <Camera size={16} className="text-white" />
                                    </button>
                                )}
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800">
                                {profile.name}
                            </h2>
                            <p className="text-gray-500 text-sm">Sinh viên CNTT</p>

                            {/* Xác minh */}
                            <div className="flex flex-wrap justify-center gap-2 mt-3">
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle size={14} /> Đã xác minh
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                                    CCCD đã xác thực
                                </span>
                            </div>

                            {/* Đánh giá */}
                            <div className="flex items-center mt-3 text-yellow-500">
                                <Star size={18} fill="#facc15" className="mr-1" />
                                <p className="font-semibold text-gray-700">4.9</p>
                                <p className="text-sm text-gray-500 ml-1">(12 đánh giá)</p>
                            </div>

                            {/* Liên hệ */}
                            <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> {profile.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} /> {profile.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} /> {profile.address}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} /> Tham gia từ 01/2024
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
                                    { label: "Họ và tên", name: "name" },
                                    { label: "Ngày sinh", name: "birth" },
                                    { label: "Email", name: "email" },
                                    { label: "Số điện thoại", name: "phone" },
                                    { label: "Giới tính", name: "gender" },
                                    { label: "Địa chỉ", name: "address" },
                                ].map((f) => (
                                    <div key={f.name}>
                                        <label className="text-gray-500">{f.label}</label>
                                        <input
                                            name={f.name}
                                            className="w-full mt-1 border rounded-lg p-2 text-gray-700 bg-gray-50"
                                            value={profile[f.name]}
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
                                            value={profile[f.name]}
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Giới thiệu bản thân */}
                        <div className="bg-white border rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-4">
                                Giới thiệu bản thân
                            </h3>
                            <textarea
                                name="about"
                                className="w-full border rounded-lg p-3 text-gray-700 bg-gray-50 resize-none"
                                rows="3"
                                value={profile.about}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
