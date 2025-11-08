import httpClient from "../configurations/httpClient";
import { USER } from "../configurations/configuration";

export const getUserInfo = async () => {
    return await httpClient.get(USER.GET_USER_INFO);
}

export const updateUserInfo = async (request) => {
    return await httpClient.put(USER.UPDATE_USER, request);
}
