export const OAuthConfig = {
    clientId: "529882234039-emb0404sjs59gor95pf3chjujm3drm7v.apps.googleusercontent.com",
    redirectUri: "http://localhost:5173/authenticate",
    authUri: "https://accounts.google.com/o/oauth2/v2/auth",
}

export const CONFIG = {
    API_GATEWAY: "http://localhost:8888/api/v1",
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

export const USER = {
    GET_USER_INFO: "/jobmate/users/my-info",
    GET_ALL_USERS: "/jobmate/users/",
    UPDATE_USER: "/jobmate/users",
    GET_USER_DETAIL: (userId) => `/jobmate/users/${userId}`,
    GET_USER_TOPRATED: "/jobmate/users/top-rated",
    GET_USER_TOP10: "/jobmate/users/top-10",
    GET_LOCATION: "/jobmate/users/locations",
    AUTO_COMPLETE_LOCATION: "/jobmate/users/location/auto",
};

export const NOTIFICATION = {
    GET_NOTIFICATIONS: "/jobmate/notifications/me",
    MARK_AS_READ: (id) => `/jobmate/notifications/${id}/read`,
    CREATE_NOTIFICATION: "/jobmate/notifications",
};

export const JOB = {
    CREATE_JOB: "/jobmate/jobs",
    UPDATE_JOB: (jobId) => `/jobmate/jobs/${jobId}`,
    VERIFY_JOB: (jobId) => `/jobmate/jobs/${jobId}/verify-job`,
    GET_JOBS: "/jobmate/jobs",
    GET_JOB_DETAIL: (jobId) => `/jobmate/jobs/${jobId}`,
    GET_JOB_DETAIL_BY_ID_FOR_USER: (jobId) => `/jobmate/jobs/details/${jobId}`,
    GET_NEARBY_JOBS: "/jobmate/jobs/nearby",
    GET_MY_JOBS: "/jobmate/jobs/my-jobs",
    GET_AVAILABLE_JOBS: "/jobmate/jobs/available",
}

export const APPLICATION = {
    APPLY_JOB: "/jobmate/applications/apply",
    GET_MY_APPLICATIONS: "/jobmate/applications/my-applications",
    GET_APPLICATION_DETAIL: (applicationId) => `/jobmate/applications/${applicationId}`,
    GET_JOB_OF_APPLICATION: (jobId) => `/jobmate/applications/job/${jobId}`,
    CANCEL_APPLICATION: (applicationId) => `/jobmate/applications/${applicationId}/cancel`,
    GET_APPLICATIONS_BY_JOB: (jobId) => `/jobmate/applications/job/${jobId}`,
    UPDATE_APPLICATION_STATUS: (applicationId) => `/jobmate/applications/${applicationId}/status`,
}

export const VERIFY = {
    VERIFY_CCCD: "/jobmate/verify/request"
}

export const UPLOAD = {
    UPLOAD_FILE: "/jobmate/files/upload",
    GET_FILE: "/jobmate/files/private-url",
}

export const ADMIN = {
    REJECT_CCCD: (userId) => `/jobmate/admin/verify/${userId}/reject`,
    APPROVE_CCCD: (userId) => `/jobmate/admin/verify/${userId}/approve`,
    GET_ALL_VERIFY_REQUESTS: "/jobmate/admin/verify/pedding",
    GET_VERIFY_DETAIL: (userId) => `/jobmate/admin/verify/pedding/${userId}/detail`,
}

export const CHAT = {
    GET_MY_CONVERSATIONS: "/chat/conversations/my-conversations",
    GET_MESSAGES_OF_CONVERSATION: "/chat/messages",
    CREATE_MESSAGE: "/chat/messages/create",
    CREATE_VERSATION: "/chat/conversations/create",
    SEARCH_CONVERSATIONS: "/chat/conversations/search",
}

export const RATING = {
    CREATE_RATING: "/jobmate/ratings",
    GET_RATINGS: "/jobmate/ratings/user",
}