import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";


export const createShipmentApi = async (shipmentData) => {
    return await axiosInstance.post(API_END_POINTS.CREATE_SHIPMENT, shipmentData);
}

export const getShipmentsApi = async () => {
    return await axiosInstance.get(API_END_POINTS.GET_SHIPMENTS);
}

