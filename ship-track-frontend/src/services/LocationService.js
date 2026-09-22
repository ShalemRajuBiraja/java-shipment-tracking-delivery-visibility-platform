import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";


export const getLatestShipmentLocation = async (trackingNumber) => {
  return await axiosInstance.get( `${API_END_POINTS.GET_SHIPMENT_LATEST_LOCATION}/${trackingNumber}/location/latest`);
};

export const getCurrentLocationToDeliveryRoute = async (trackingNumber) => {
  return await axiosInstance.get( `${API_END_POINTS.GET_CURRENT_LOCATION_TO_DELIVERY_ROUTE}/${trackingNumber}/location/current-route`);
};