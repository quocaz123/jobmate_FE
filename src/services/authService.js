import httpClient from "../configurations/httpClient";
import { getToken } from "./localStorageService";
import { jwtDecode } from "jwt-decode";
import { AUTH } from "../configurations/configuration";

const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.userId;
}

export const login = async (email, password) => {
    return await httpClient.post(AUTH.LOGIN, {
        email: email,
        password: password
    });
};

export const oauth2_login = async (code) => {
  return await httpClient.post(AUTH.OAUTH_AUTHENTICATION, null, {
    params: { code },
  });
};

export const isAuthenticated = () => {
  return getToken();
};
    
export const logout = async () => {
    const token = getToken();
    return await httpClient.post(AUTH.LOGOUT, {
        token: token
    });
};

export const verify_otp = async (otp) => {
    const userId = getUserIdFromToken();
    return await httpClient.post(AUTH.VERIFY_OTP, {
        userId: userId,
        otp: otp
    });
};

export const resend_otp = async () => {
    const userId = getUserIdFromToken();
    return await httpClient.post(AUTH.RESEND_OTP, {
        userId: userId
    });
}
