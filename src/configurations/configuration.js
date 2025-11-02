export const OAuthConfig = {
    clientId: "529882234039-emb0404sjs59gor95pf3chjujm3drm7v.apps.googleusercontent.com",
    redirectUri: "http://localhost:5173/authenticate",
    authUri: "https://accounts.google.com/o/oauth2/v2/auth",
}

export const CONFIG = {
    API_GATEWAY : "http://localhost:8888/api/v1",
};

export const AUTH = {
    LOGIN: "/jobmate/auth/login",
    OAUTH_AUTHENTICATION: "/jobmate/auth/outbound/authentication",
    REFRESH_TOKEN: "/jobmate/auth/refresh",
    LOGOUT: "/jobmate/auth/logout",
    VERIFY_OTP: "/jobmate/auth/verify-otp",
    RESEND_OTP: "/jobmate/auth/resend-otp",
    SET_PASSWORD: "/jobmate/auth/set-password",
};