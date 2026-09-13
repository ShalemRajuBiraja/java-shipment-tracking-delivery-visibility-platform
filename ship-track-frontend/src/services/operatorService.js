import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";


export const getDashboardData = async () => {

  return await axiosInstance.get( API_END_POINTS.GET_LOGISTICS_OPERATOR_DASHBOARD_STATS );

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

// ================= GET LATEST SHIPMENT LOCATION =================

export const getLatestShipmentLocation = async (trackingNumber) => {

  return await axiosInstance.get(`${API_END_POINTS.GET_SHIPMENT_LOCATION}/${trackingNumber}/location/latest` );

};

// ================= GET SHIPMENT ROUTE =================

export const getShipmentRoute = async ( origin, destination) => {

  return await axiosInstance.get(
    "/api/routes/calculate",
    {
      params: {
        origin: origin,
        destination: destination,
      },
    }
  );

};

// ================= GET SHIPMENT ETA =================

export const getShipmentEta = async (latitude, longitude, destination) => {

  return await axiosInstance.get(
    "/api/routes/eta",
    {
      params: {
        latitude: latitude,
        longitude: longitude,
        destination: destination,
      },
    }
  );
};

export const getShipmentDelayPrediction = async ( trackingNumber) => {
  return await axiosInstance.get(
    `/api/routes/delay-prediction/${trackingNumber}`
  );
};

// ================= GET SHIPMENT ROUTE HISTORY =================

export const getShipmentRouteHistory = async (
  trackingNumber
) => {
  return await axiosInstance.get(
    `${API_END_POINTS.GET_SHIPMENT_LOCATION}/${trackingNumber}/locations`
  );
};

// ================= GET ROAD-FOLLOWING ROUTE HISTORY =================

export const getRoadFollowingRouteHistory = async (
  trackingNumber
) => {
  return await axiosInstance.get(
    `${API_END_POINTS.GET_SHIPMENT_LOCATION}/${trackingNumber}/route-history`
  );
};

export const getShipmentDeliveryForecast = async (
  trackingNumber
) => {
  return await axiosInstance.get(
    `/api/routes/delivery-forecast/${trackingNumber}`
  );
};

