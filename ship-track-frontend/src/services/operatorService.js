import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";


export const getDashboardData = async () => {

  return await axiosInstance.get(
    API_END_POINTS.GET_LOGISTICS_OPERATOR_DASHBOARD_STATS
  );

};


export const getAllOperatorShipments = async () => {

  return await axiosInstance.get(
    API_END_POINTS.GET_LOGISTICS_OPERATOR_SHIPMENTS
  );

};


export const getOperatorShipmentById = async (id) => {

  return await axiosInstance.get(
    `${API_END_POINTS.GET_LOGISTICS_OPERATOR_SHIPMENTS}/${id}`
  );

};


export const updateOperatorShipmentStatus = async (
  id,
  status
) => {

  return await axiosInstance.put(
    `${API_END_POINTS.GET_LOGISTICS_OPERATOR_SHIPMENTS}/${id}/status`,
    {
      status: status,
    }
  );

};