import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { OAuthConfig } from "../../configurations/configuration"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("⚠️ Mật khẩu xác nhận không khớp!")
      return
    }
    console.log("Signup submitted:", { name, email, password })
  }

  const handleGoogleSignup = () => {
    const callbackUrl = OAuthConfig.redirectUri
    const authUrl = OAuthConfig.authUri
    const googleClientId = OAuthConfig.clientId

    const params = new URLSearchParams({
      redirect_uri: callbackUrl,
      response_type: "code",
      client_id: googleClientId,
      scope: "openid email profile",
      prompt: "consent",
      access_type: "offline",
    })

    window.location.href = `${authUrl}?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-white to-indigo-300 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="text-center p-8 pb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
            Tạo tài khoản mới 🌟
          </h1>
          <p className="text-gray-600 mt-2">Tham gia ngay để không bỏ lỡ cơ hội</p>
        </div>

        <div className="p-8 pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Họ tên */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Đăng ký
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center font-medium"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53..." />
            </svg>
            Đăng ký với Google
          </button>

          <div className="text-center mt-6 text-gray-600">
            Đã có tài khoản?{" "}
            <a href="http://localhost:5173/login" className="text-pink-600 hover:underline font-medium">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
