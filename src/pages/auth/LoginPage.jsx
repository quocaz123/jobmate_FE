import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { OAuthConfig } from "../../configurations/configuration";
import { login } from "../../services/authService";
import { handleAuthSuccess } from "../../services/authHandler";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(email, password);
    const data = res.data.data;

    // Nếu tài khoản bị cấm / khoá
    if (data.status === "BANNED" || data.banned === true) {
      showError("Tài khoản của bạn đã bị khóa do vi phạm quy định.");
      return;
    }

    // Nếu bật xác thực 2FA (OTP)
    if (data.twoFaEnabled) {
      showSuccess("Vui lòng nhập mã OTP để tiếp tục");
      navigate("/verify-otp", {
        state: {
          userId: data.userId,
          otpExpiryTime: data.otpExpiryTime
        }
      });
      return;
    }

    // Đăng nhập bình thường
    showSuccess("Đăng nhập thành công!");
    setTimeout(() => {
      handleAuthSuccess(data.token, navigate);
    }, 1200);

  } catch (error) {
    const msg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
    showError(msg);
  }
};

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const params = new URLSearchParams({
      redirect_uri: callbackUrl,
      response_type: "code",
      client_id: googleClientId,
      scope: "openid email profile",
      prompt: "consent",
      access_type: "offline",
    });

    const targetUrl = `${authUrl}?${params.toString()}`;
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Hiệu ứng nền */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-transparent to-purple-50 opacity-80 pointer-events-none" />

        {/* Logo + Tiêu đề */}
        <div className="relative text-center p-8">
          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            StudentJobs
          </div>
          <p className="text-gray-500 text-sm">
            Nền tảng giúp sinh viên kết nối cơ hội việc làm tốt nhất.
          </p>
        </div>

        {/* Form */}
        <div className="relative px-8 pb-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Quên mật khẩu */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform"
            >
              Đăng nhập
            </button>
          </form>

          {/* Hoặc tiếp tục với */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <span className="relative bg-white px-3 text-sm text-gray-500">
              Hoặc tiếp tục với
            </span>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 bg-white py-3 rounded-lg hover:bg-gray-50 transition-all hover:shadow-md"
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
            <span className="font-medium text-gray-700">
              Đăng nhập với Google
            </span>
          </button>

          {/* Đăng ký */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a
                href="http://localhost:5173/signup"
                className="text-purple-600 font-medium hover:underline hover:text-purple-700"
              >
                Đăng ký ngay
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
