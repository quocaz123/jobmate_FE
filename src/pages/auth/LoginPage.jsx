import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { OAuthConfig } from "../../configurations/configuration"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login submitted:", { email, password })
        // TODO: Integrate with authentication API
    }

    const handleGoogleLogin = () => {
        console.log("Google login clicked")
        const callbackUrl = OAuthConfig.redirectUri;
        const authUrl = OAuthConfig.authUri;
        const googleClientId = OAuthConfig.clientId;

        const params = new URLSearchParams({
            redirect_uri: callbackUrl,
            response_type: 'code',
            client_id: googleClientId,
            scope: 'openid email profile',
            prompt: 'consent',
            access_type: 'offline'
        });

        const targetUrl = `${authUrl}?${params.toString()}`;

        console.log('Redirecting to Google auth URL:', targetUrl);

        window.location.href = targetUrl;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500/5 via-gray-50 to-purple-500/5 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="text-center p-6 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
                    <p className="text-gray-500 mt-1.5">Chào mừng trở lại! Đăng nhập để tiếp tục</p>
                </div>

                <div className="p-6 pt-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 rounded-r-md transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-base"
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Hoặc tiếp tục với</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors font-semibold text-base flex items-center justify-center"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Đăng nhập với Google
                    </button>

                    <div className="text-center mt-6">
                        <span className="text-sm text-gray-600">
                            Chưa có tài khoản?{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Đăng ký ngay
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}