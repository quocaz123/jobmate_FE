import httpClient from "../configurations/httpClient";
import { APPLICATION } from "../configurations/configuration";

export const application_job = async (jobId) => {
    return await httpClient.post(APPLICATION.APPLICATION_JOB, {
        jobId: jobId
    });
}