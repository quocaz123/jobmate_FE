import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin, getMockAccountsInfo } from '../../utils/mockAuth';
import { getUserInfo } from '../../utils/userUtils';
import { Check, Copy, LogIn } from 'lucide-react';

const MockLogin = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('user');
    const [copiedIndex, setCopiedIndex] = useState(null);

    const accounts = getMockAccountsInfo();

    const handleLogin = (role) => {
        const result = mockLogin(role);
        if (result?.success) {
            // Chuyển hướng dựa trên role
            const userInfo = getUserInfo();
            if (userInfo) {
                if (userInfo.role === 'Admin') {
                    navigate('/admin');
                } else if (userInfo.role === 'Employer') {
                    navigate('/employer');
                } else {
                    navigate('/user');
                }
            }
        }
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleQuickLogin = () => {
        handleLogin(selectedRole);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Mock Login - Testing</h1>
                    <p className="text-gray-600">Sử dụng các tài khoản mock để test ứng dụng</p>
                </div>

                {/* Quick Login */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Login</h2>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Chọn role để đăng nhập:
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="user">User (Người dùng)</option>
                                <option value="employer">Employer (Nhà tuyển dụng)</option>
                                <option value="admin">Admin (Quản trị viên)</option>
                            </select>
                        </div>
                        <button
                            onClick={handleQuickLogin}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <LogIn className="w-5 h-5" />
                            Đăng nhập ngay
                        </button>
                    </div>
                </div>

                {/* Account List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Danh sách tài khoản mock</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {accounts.map((account, index) => (
                            <div
                                key={account.key}
                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                            {account.role}
                                        </h3>
                                        <p className="text-sm text-gray-500">{account.fullName}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${account.role === 'Admin' ? 'bg-red-100 text-red-700' :
                                            account.role === 'Employer' ? 'bg-purple-100 text-purple-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {account.role}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Email:</p>
                                        <p className="text-sm font-mono text-gray-700 break-all">{account.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <p className="text-xs text-gray-500 mb-1">Token:</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-mono text-gray-700 break-all flex-1 truncate">
                                                {account.token.substring(0, 50)}...
                                            </p>
                                            <button
                                                onClick={() => copyToClipboard(account.token, index)}
                                                className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                title="Copy token"
                                            >
                                                {copiedIndex === index ? (
                                                    <Check className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleLogin(account.key)}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Đăng nhập với tài khoản này
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hướng dẫn */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">📝 Hướng dẫn:</h3>
                    <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Chọn role và click "Đăng nhập ngay" để test nhanh</li>
                        <li>Hoặc click "Đăng nhập với tài khoản này" ở từng card</li>
                        <li>Token sẽ được tự động lưu vào localStorage</li>
                        <li>Bạn có thể copy token để chia sẻ với người khác test</li>
                        <li>Sau khi login, sẽ tự động redirect đến trang phù hợp với role</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MockLogin;

