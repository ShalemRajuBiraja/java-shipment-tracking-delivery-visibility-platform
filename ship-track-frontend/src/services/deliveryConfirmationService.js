import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";

export const confirmDeliveryApi = async (trackingNumber) => {

  return await axiosInstance.post( `${API_END_POINTS.CONFIRM_DELIVERY}/${trackingNumber}` );
};