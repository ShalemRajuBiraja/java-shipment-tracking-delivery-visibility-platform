import axiosInstance from "../config/axiosInstance";

import { API_END_POINTS } from "../constants/ApiEndPoints";


export const getAdminDashboardStatsApi = async () => {

  return await axiosInstance.get(
    API_END_POINTS.ADMIN_DASHBOARD_STATS
  );

};