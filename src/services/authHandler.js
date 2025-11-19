import { setToken } from "./localStorageService";
import { scheduleTokenRefresh } from "./tokenService";
import { jwtDecode } from "jwt-decode";
import { showSuccess } from "../utils/toast";

export const handleAuthSuccess = (token, navigate, shouldNavigate = true) => {
    // if (!token) {
    //     alert("Không nhận được token!");
    //     return;
    // }

    setToken(token);
    scheduleTokenRefresh();

    if (!shouldNavigate) {
        return; // Don't navigate, let caller handle it
    }

    const decoded = jwtDecode(token);
    const roles = decoded.scope?.split(" ") || [];

    showSuccess("Đăng nhập thành công!");
    setTimeout(() => {
        if (roles.includes("ROLE_ADMIN")) navigate("/home");
        else if (roles.includes("ROLE_EMPLOYER")) navigate("/employer/dashboard");
        else navigate("/home");
    }, 2000);
};