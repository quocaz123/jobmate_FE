import httpClient from "../configurations/httpClient";
import { JOB } from "../configurations/configuration";

export const get_my_Jobs = async (page = 0, size = 10, status) => {
    const params = { page, size };
    if (status) params.status = status;
    return await httpClient.get(JOB.GET_MY_JOBS, { params });
};

export const createJob = async (data) => {
    return await httpClient.post(JOB.CREATE_JOB, data);
};

export const updateJob = async (jobId, data) => {
    return await httpClient.put(JOB.UPDATE_JOB(jobId), data);
};

export const getJobDetail = async (jobId) => {
    return await httpClient.get(JOB.GET_JOB_DETAIL(jobId));
};

export const getNearbyJobs = async (latitude, longitude, radius = 10) => {
    return await httpClient.get(JOB.GET_NEARBY_JOBS, { params: { latitude, longitude, radius } });
};

export const getAvailableJobs = async () => {
    return await httpClient.get(JOB.GET_AVAILABLE_JOBS);
};
