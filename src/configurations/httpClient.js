import axios from "axios";
import { CONFIG, AUTH } from "./configuration";
import { getToken, setToken, removeToken } from "../services/localStorageService";

const httpClient = axios.create({
    baseURL: CONFIG.API_GATEWAY,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        config.headers = config.headers || {};
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (newToken) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
};

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((token) => {
                    // set header and retry
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    resolve(httpClient(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const oldToken = getToken();
            if (!oldToken) throw new Error("No token available");

            const res = await axios.post(`${CONFIG.API_GATEWAY}${AUTH.REFRESH_TOKEN}`, {
                token: oldToken,
            });

            const newToken = res.data?.token;
            if (!newToken) throw new Error("No new token returned");

            setToken(newToken);
            onRefreshed(newToken);
            isRefreshing = false;

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return httpClient(originalRequest);
        } catch (err) {
            isRefreshing = false;
            removeToken();
            try {
                window.location.href = "/login";
            } catch (e) {
            }
            return Promise.reject(err);
        }
    }
);

export default httpClient;