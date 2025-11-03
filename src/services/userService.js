import { CONFIG, API } from "../configurations/configuration";

export const getUserInfo = async () => {
    const response = await httpClient.get(API.USER.GET_USER_INFO);
    return response.data;
}
