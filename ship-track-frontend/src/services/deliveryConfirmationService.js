import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";

export const openDeliveryConfirmationApi = async (trackingNumber) => {
  return await axiosInstance.post(
    `${API_END_POINTS.OPEN_DELIVERY_CONFIRMATION}/${trackingNumber}`
  );
};

export const confirmDeliveryApi = async (trackingNumber, payload) => {
  return await axiosInstance.post(
    `${API_END_POINTS.CONFIRM_DELIVERY}/${trackingNumber}`,
    payload
  );
};

export const getProofOfDeliveryApi = async (trackingNumber) => {
  return await axiosInstance.get(
    `${API_END_POINTS.GET_POD}/${trackingNumber}`
  );
};

export const getPodDownloadUrl = (trackingNumber) => {
  return `${API_END_POINTS.GET_POD}/${trackingNumber}/download`;
};

export const getSignatureImageUrl = (trackingNumber) => {
  return `${API_END_POINTS.GET_SIGNATURE}/${trackingNumber}`;
};
