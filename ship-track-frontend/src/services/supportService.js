import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";

// GET SUPPORT DASHBOARD STATS
export const getSupportStatsApi = async () => {
  return await axiosInstance.get(
    API_END_POINTS.SUPPORT_STATS
  );
};


// GET ACTIVE SUPPORT REQUESTS
export const getSupportRequestsApi = async () => {
  return await axiosInstance.get(
    API_END_POINTS.GET_SUPPORT_REQUESTS
  );
};


// SEARCH SUPPORT REQUESTS
export const searchSupportRequestsApi = async (keyword) => {
  return await axiosInstance.get(
    `${API_END_POINTS.SEARCH_SUPPORT_REQUESTS}?keyword=${keyword}`
  );
};


// GET RESOLVED REQUESTS
export const getResolvedRequestsApi = async () => {
  return await axiosInstance.get(
    API_END_POINTS.RESOLVED_SUPPORT_REQUESTS
  );
};


// UPDATE REQUEST STATUS

export const updateSupportRequestStatusApi = async (id, status) => {
  return await axiosInstance.put(
    `${API_END_POINTS.UPDATE_SUPPORT_REQUEST_STATUS}/${id}/status`,
    null,
    {
      params: { status },
    }
  );
};