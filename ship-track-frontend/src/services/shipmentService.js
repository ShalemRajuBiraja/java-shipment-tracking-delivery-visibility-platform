import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";


export const createShipmentApi = async (shipmentData) => {
  return await axiosInstance.post(
    API_END_POINTS.CREATE_SHIPMENT,
    shipmentData
  );
};


export const getShipmentsApi = async () => {
  return await axiosInstance.get( API_END_POINTS.GET_SHIPMENTS );
};


// Get Single Shipment Details
export const getShipmentByIdApi = async (id) => {
  return await axiosInstance.get(
    `${API_END_POINTS.GET_SHIPMENT_BY_ID}/${id}`
  );
};


export const supportRequestApi = async (formData) => {
  return await axiosInstance.post(
    API_END_POINTS.SUPPORT_REQUEST,
    formData
  );
};


export const trackShipmentApi = async (trackingNumber) => {
  return await axiosInstance.get(
    `${API_END_POINTS.TRACK_SHIPMENT}/${trackingNumber}`
  );
};

export const getShipmentHistoryApi = async () => {
  return await axiosInstance.get(API_END_POINTS.SHIPMENT_HISTORY);
};



// SUPPORT AGENT SHIPMENT LOOKUP
export const supportShipmentLookupApi = async (
  trackingNumber
) => {
  return await axiosInstance.get(
    `${API_END_POINTS.SUPPORT_SHIPMENT_LOOKUP}/${trackingNumber}`
  );
};