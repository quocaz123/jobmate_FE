import httpClient from "../configurations/httpClient";
import { USER, AUTH, VERIFY } from "../configurations/configuration";

export const getUserInfo = async () => {
    return await httpClient.get(USER.GET_USER_INFO);
}

export const updateUserInfo = async (request) => {
    return await httpClient.put(USER.UPDATE_USER, request);
}

export const updateTwoFactorStatus = async (enabled) => {
    return await httpClient.put(AUTH.ENABLE_2FA, { enabled });
}

export const submitCCCDVerification = async () => {
    return await httpClient.post(VERIFY.VERIFY_CCCD);
}

