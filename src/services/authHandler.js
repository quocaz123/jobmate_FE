import { setToken } from "./localStorageService";
import { scheduleTokenRefresh } from "./tokenService";
import { jwtDecode } from "jwt-decode";

export const handleAuthSuccess = (token, navigate) => {
    if (!token) {
        alert("Không nhận được token!");
        return;
    }

    setToken(token);
    scheduleTokenRefresh();

    const decoded = jwtDecode(token);
    const roles = decoded.scope?.split(" ") || [];

    alert("Đăng nhập thành công!");

    if (roles.includes("ROLE_ADMIN")) navigate("/home");
    else if (roles.includes("ROLE_EMPLOYER")) navigate("/employer/dashboard");
    else navigate("/home");
};