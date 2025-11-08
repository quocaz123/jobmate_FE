import React from "react";

const InfoTab = ({ profile, isEditing, handleChange }) => {
    return (
        <div className="space-y-6">
            {/* Thông tin cá nhân */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                    Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {[ 
                        { label: "Họ và tên", name: "fullName" },
                        { label: "Email", name: "email", readOnlyAlways: true },
                        { label: "Địa chỉ", name: "address" },
                        { label: "Số điện thoại", name: "contactPhone" },
                    ].map((f) => {
                        const isAlwaysReadOnly = Boolean(f.readOnlyAlways);
                        const inputReadOnly = !isEditing || isAlwaysReadOnly;

                        return (
                            <div key={f.name}>
                                <label className="text-gray-500 flex items-center justify-between">
                                    <span>{f.label}</span>
                                    {isAlwaysReadOnly && (
                                        <span className="text-xs text-gray-400 italic">Liên hệ hỗ trợ để thay đổi</span>
                                    )}
                                </label>
                                <input
                                    name={f.name}
                                    className={`w-full mt-1 border rounded-lg p-2 text-gray-700 bg-gray-50 ${inputReadOnly ? "cursor-not-allowed opacity-75" : ""}`}
                                    value={profile[f.name] || ""}
                                    onChange={handleChange}
                                    readOnly={inputReadOnly}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Kỹ năng */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">Kỹ năng</h3>
                <textarea
                    name="skills"
                    className="w-full border rounded-lg p-3 text-gray-700 bg-gray-50 resize-none"
                    rows="3"
                    value={profile.skills || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder="Nhập các kỹ năng của bạn, cách nhau bởi dấu phẩy..."
                />
                {profile.skills && profile.skills.trim() && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {profile.skills.split(',').map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Giới thiệu bản thân */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                    Giới thiệu bản thân
                </h3>
                <textarea
                    name="bio"
                    className="w-full border rounded-lg p-3 text-gray-700 bg-gray-50 resize-none"
                    rows="3"
                    value={profile.bio || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
            </div>
        </div>
    );
};

export default InfoTab;

