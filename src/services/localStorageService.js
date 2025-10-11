export const KEY_TOKEN = "access_token";

export const setToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
}

export const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}   

export const removeToken = () => {
    localStorage.removeItem(KEY_TOKEN);
}   