import React from "react";
import { Briefcase, CalendarDays, Clock } from "lucide-react";

const CareerInfoTab = ({ profile, isEditing, handleChange }) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-800 mb-4">Thông tin việc làm mong muốn</h3>

            <div className="space-y-4">
                {/* Loại công việc mong muốn */}
                <div>
                    <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                        <Briefcase className="text-blue-500 h-4 w-4" />
                        Loại công việc mong muốn
                    </label>
                    {isEditing ? (
                        <select
                            name="preferredJobType"
                            value={profile.preferredJobType || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 text-gray-700 bg-gray-50"
                        >
                            <option value="">Chọn loại công việc</option>
                            <option value="FULL_TIME">Toàn thời gian</option>
                            <option value="PART_TIME">Bán thời gian</option>
                            <option value="FREELANCE">Freelance</option>
                        </select>
                    ) : (
                        <p className="font-medium text-gray-800">
                            {profile.preferredJobType === "FULL_TIME" ? "Toàn thời gian" :
                                profile.preferredJobType === "PART_TIME" ? "Bán thời gian" :
                                    profile.preferredJobType === "FREELANCE" ? "Freelance" :
                                        "Chưa cập nhật"}
                        </p>
                    )}
                </div>

                {/* Ngày có thể làm việc */}
                <div>
                    <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                        <CalendarDays className="text-green-500 h-4 w-4" />
                        Ngày có thể làm việc
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="availableDays"
                            value={profile.availableDays || ""}
                            onChange={handleChange}
                            placeholder="VD: Thứ 2, 3, 4, 5, 6"
                            className="w-full border rounded-lg p-2 text-gray-700 bg-gray-50"
                        />
                    ) : (
                        <p className="font-medium text-gray-800">
                            {profile.availableDays || "Chưa cập nhật"}
                        </p>
                    )}
                </div>

                {/* Khung giờ làm việc */}
                <div>
                    <label className="text-sm text-gray-500 mb-2 block flex items-center gap-2">
                        <Clock className="text-orange-500 h-4 w-4" />
                        Khung giờ làm việc
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="availableTime"
                            value={profile.availableTime || ""}
                            onChange={handleChange}
                            placeholder="VD: 18:00 - 22:00"
                            className="w-full border rounded-lg p-2 text-gray-700 bg-gray-50"
                        />
                    ) : (
                        <p className="font-medium text-gray-800">
                            {profile.availableTime || "Chưa cập nhật"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerInfoTab;
