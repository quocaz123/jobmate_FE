import { setToken } from "./localStorageService";
import { scheduleTokenRefresh } from "./tokenService";
import { jwtDecode } from "jwt-decode";

export const handleAuthSuccess = (token, navigate, shouldNavigate = true) => {
    if (!token) {
        alert("Không nhận được token!");
        return;
    }

    setToken(token);
    scheduleTokenRefresh();

    if (!shouldNavigate) {
        return; // Don't navigate, let caller handle it
    }

    const decoded = jwtDecode(token);
    const roles = decoded.scope?.split(" ") || [];

    alert("Đăng nhập thành công!");

    if (roles.includes("ROLE_ADMIN")) navigate("/home");
    else if (roles.includes("ROLE_EMPLOYER")) navigate("/employer/dashboard");
    else navigate("/home");
};