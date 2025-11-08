import React from "react";

const TwoFactorTab = ({ twoFactorEnabled, setTwoFactorEnabled }) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-800 mb-4">Xác thực hai yếu tố (2FA)</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">Bật xác thực hai yếu tố</h4>
                        <p className="text-sm text-gray-500">
                            Tăng cường bảo mật tài khoản bằng cách yêu cầu mã xác thực từ ứng dụng di động
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={twoFactorEnabled}
                            onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {twoFactorEnabled && (
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


