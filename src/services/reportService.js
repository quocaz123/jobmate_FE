import httpClient from "../configurations/httpClient";
import { REPORT } from "../configurations/configuration";

export const submitReport = async (data) => {
    return await httpClient.post(REPORT.CREATE_REPORT, {
        targetType: data.targetType,
        targetId: data.targetId,
        reason: data.reason
    });
}

