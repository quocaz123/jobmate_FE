import React from "react";
import { Loader2 } from "lucide-react";

const TwoFactorTab = ({ twoFactorEnabled, isUpdating, onToggle }) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-800 mb-4">
                Xác thực hai yếu tố (2FA)
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">
                            Bật xác thực hai yếu tố
                        </h4>
                        <p className="text-sm text-gray-500">
                            Tăng cường bảo mật tài khoản bằng cách yêu cầu mã xác thực từ ứng
                            dụng di động
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={twoFactorEnabled}
                            onChange={(e) => onToggle(e.target.checked)}
                            className="sr-only peer"
                            disabled={isUpdating}
                        />
                        <div
                            className={`relative w-11 h-6 rounded-full transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                ${twoFactorEnabled ? "bg-blue-600 after:translate-x-full after:border-white" : "bg-gray-200"}
                ${isUpdating ? "opacity-60 cursor-not-allowed" : "peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"}
              `}
                        ></div>
                    </label>
                </div>

                {isUpdating && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang cập nhật trạng thái 2FA...
                    </div>
                )}

                {twoFactorEnabled && !isUpdating && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 mb-2">
                            <strong>Hướng dẫn:</strong>
                        </p>
                        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                            <li>Tải ứng dụng xác thực như Google Authenticator hoặc Authy</li>
                            <li>Quét mã QR được hiển thị</li>
                            <li>Nhập mã xác thực 6 chữ số để hoàn tất</li>
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwoFactorTab;
