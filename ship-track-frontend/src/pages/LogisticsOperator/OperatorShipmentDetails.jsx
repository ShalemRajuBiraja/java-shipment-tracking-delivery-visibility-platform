import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoogleShipmentMap from "../../components/GoogleShipmentMap";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Truck,
  Weight,
} from "lucide-react";
import {
  getOperatorShipmentById,
  updateOperatorShipmentStatus,
  getLatestShipmentLocation,
  getShipmentRoute,
  getShipmentEta,
  getShipmentDelayPrediction,
  getShipmentRouteHistory,
  getRoadFollowingRouteHistory,
  getShipmentDeliveryForecast,
} from "../../services/operatorService";

const formatDuration = (duration) => {
  if (!duration) {
    return "N/A";
  }

  const seconds = parseInt(
    duration.replace("s", ""),
    10
  );

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

// MAIN FUNCTION
const OperatorShipmentDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [shipmentLocation, setShipmentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [routeLoading, setRouteLoading] = useState(true);
  const [eta, setEta] = useState(null);
  const [etaLoading, setEtaLoading] = useState(true);
  const [etaArrival, setEtaArrival] = useState(null);
  const [delayPrediction, setDelayPrediction] = useState(null);
  const [delayLoading, setDelayLoading] = useState(true);
  const [locationHistory, setLocationHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRoute, setHistoryRoute] = useState(null);
  const [historyRouteLoading, setHistoryRouteLoading] = useState(false);
  const [deliveryForecast, setDeliveryForecast] = useState(null);

  // ================= SHIPMENT STATUS FLOW =================

  const shipmentStatusFlow = [
    "CREATED",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  // ================= LIVE LOCATION POLLING =================

  useEffect(() => {
    if (!shipment?.trackingNumber) {
      return;
    }

    const interval = setInterval(() => {
      fetchShipmentLocation(
        shipment.trackingNumber,
        shipment
      );
    }, 900000);

    return () => {
      clearInterval(interval);
    };
  }, [shipment?.trackingNumber]);

  // ================= FETCH SHIPMENT DETAILS =================

  useEffect(() => {
    fetchShipmentDetails();
  }, [id]);

  useEffect(() => {
    if (!shipment?.trackingNumber) {
      return;
    }

    fetchShipmentRouteHistory(
      shipment.trackingNumber
    );

    fetchRoadFollowingRouteHistory(
      shipment.trackingNumber
    );

  }, [shipment?.trackingNumber]);

  const fetchShipmentDetails = async () => {
    try {
      const response =
        await getOperatorShipmentById(id);

      if (response.data.success === true) {
        const shipmentData =
          response.data.data;

        setShipment(shipmentData);

        fetchShipmentLocation(
          shipmentData.trackingNumber,
          shipmentData
        );

        fetchShipmentRoute(
          shipmentData
        );

        fetchDelayPrediction(
          shipmentData.trackingNumber
        );
      }
    } catch (error) {
      console.error(
        "Error fetching shipment details:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH SHIPMENT LOCATION =================

  const fetchShipmentLocation = async (
    trackingNumber,
    shipmentData
  ) => {
    try {
      setLocationLoading(true);

      const response =
        await getLatestShipmentLocation(
          trackingNumber
        );

      if (response.data) {
        setShipmentLocation(
          response.data
        );

        fetchShipmentEta(
          response.data,
          shipmentData
        );
      }
    } catch (error) {
      console.error(
        "Error fetching shipment location:",
        error
      );

      setShipmentLocation(null);
      setEta(null);
      setEtaArrival(null);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchShipmentRouteHistory = async (
    trackingNumber
  ) => {
    try {
      setHistoryLoading(true);

      const response =
        await getShipmentRouteHistory(
          trackingNumber
        );

      setLocationHistory(
        response.data || []
      );

    } catch (error) {
      console.error(
        "Error fetching shipment route history:",
        error
      );

      setLocationHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchRoadFollowingRouteHistory = async (
    trackingNumber
  ) => {
    try {
      setHistoryRouteLoading(true);

      const response =
        await getRoadFollowingRouteHistory(
          trackingNumber
        );

      const routeData =
        response.data?.routes?.[0];

      setHistoryRoute(
        routeData || null
      );

    } catch (error) {
      console.error(
        "Error fetching road-following route history:",
        error
      );

      setHistoryRoute(null);
    } finally {
      setHistoryRouteLoading(false);
    }
  };

  // ================= FETCH SHIPMENT ROUTE =================

  const fetchShipmentRoute = async (
    shipmentData
  ) => {
    try {
      setRouteLoading(true);

      const origin = [
        shipmentData.pickupAddress,
        shipmentData.pickupCity,
        shipmentData.pickupState,
        shipmentData.pickupPincode,
      ]
        .filter(Boolean)
        .join(", ");

      const destination = [
        shipmentData.deliveryAddress,
        shipmentData.deliveryCity,
        shipmentData.deliveryState,
        shipmentData.deliveryPincode,
      ]
        .filter(Boolean)
        .join(", ");

      const response =
        await getShipmentRoute(
          origin,
          destination
        );

      if (
        response.data &&
        response.data.routes &&
        response.data.routes.length > 0
      ) {
        setRoute(
          response.data.routes[0]
        );
      } else {
        setRoute(null);
      }
    } catch (error) {
      console.error(
        "Error fetching shipment route:",
        error
      );

      setRoute(null);
    } finally {
      setRouteLoading(false);
    }
  };

  // ================= FETCH SHIPMENT ETA =================

  const fetchShipmentEta = async (
    location,
    shipmentData
  ) => {
    try {
      setEtaLoading(true);

      const destination = [
        shipmentData.deliveryAddress,
        shipmentData.deliveryCity,
        shipmentData.deliveryState,
        shipmentData.deliveryPincode,
      ]
        .filter(Boolean)
        .join(", ");

      const response =
        await getShipmentEta(
          location.latitude,
          location.longitude,
          destination
        );

      if (
        response.data &&
        response.data.routes &&
        response.data.routes.length > 0
      ) {
        const etaData =
          response.data.routes[0];

        setEta(etaData);

        const durationSeconds =
          parseInt(
            etaData.duration.replace("s", ""),
            10
          );

        const arrivalTime =
          new Date().getTime() +
          durationSeconds * 1000;

        setEtaArrival(arrivalTime);
      } else {
        setEta(null);
        setEtaArrival(null);
      }
    } catch (error) {
      console.error(
        "Error fetching shipment ETA:",
        error
      );

      setEta(null);
      setEtaArrival(null);
    } finally {
      setEtaLoading(false);
    }
  };

  // ================= FETCH DELAY PREDICTION =================

  const fetchDelayPrediction = async (
    trackingNumber
  ) => {
    try {
      setDelayLoading(true);

      const response =
        await getShipmentDelayPrediction(
          trackingNumber
        );

      const forecastResponse =
        await getShipmentDeliveryForecast(
          trackingNumber
        );

      setDeliveryForecast(
        forecastResponse.data
      );

      if (response.data) {
        setDelayPrediction(
          response.data
        );
      } else {
        setDelayPrediction(null);
      }
    } catch (error) {
      console.error(
        "Error fetching delay prediction:",
        error
      );

      setDelayPrediction(null);
    } finally {
      setDelayLoading(false);
    }
  };

  // ================= GET NEXT VALID STATUS =================

  const getNextStatus = () => {
    if (!shipment) {
      return null;
    }

    const currentIndex =
      shipmentStatusFlow.indexOf(
        shipment.status
      );

    if (
      currentIndex === -1 ||
      currentIndex ===
        shipmentStatusFlow.length - 1
    ) {
      return null;
    }

    return shipmentStatusFlow[
      currentIndex + 1
    ];
  };

  // ================= UPDATE SHIPMENT STATUS =================

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      return;
    }

    try {
      setUpdating(true);

      const response =
        await updateOperatorShipmentStatus(
          id,
          selectedStatus
        );

      if (response.data.success === true) {
        setShipment(
          response.data.data
        );

        setSelectedStatus("");
      }
    } catch (error) {
      console.error(
        "Error updating shipment status:",
        error
      );
    } finally {
      setUpdating(false);
    }
  };

  // ================= FORMAT STATUS =================

  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // ================= STATUS COLOR =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-700";

      case "CREATED":
        return "bg-amber-100 text-amber-700";

      case "PICKED_UP":
        return "bg-purple-100 text-purple-700";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-100 text-orange-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        Loading shipment details...
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!shipment) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        Shipment not found.
      </div>
    );
  }

  const nextStatus = getNextStatus();

  const isCompleted =
    shipment.status === "DELIVERED";

  const isCancelled =
    shipment.status === "CANCELLED";

  return (
    <div className="space-y-6">

      {/* ================= BACK BUTTON ================= */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Back to Shipments
      </button>

      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Shipment Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Tracking Number:

            <span className="ml-2 font-semibold text-emerald-600">
              {shipment.trackingNumber}
            </span>
          </p>
        </div>

        {/* Current Status */}

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${getStatusStyle(
            shipment.status
          )}`}
        >
          {formatStatus(
            shipment.status
          )}
        </span>
      </div>

      {/* ================= STATUS UPDATE ================= */}

      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Status Information */}

        <div>
          <div className="flex items-center gap-2">

            <Truck
              size={20}
              className="text-emerald-600"
            />

            <h2 className="font-semibold text-slate-800">
              Shipment Status
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Update the shipment as it progresses.
          </p>
        </div>

        {/* Status Update Controls */}

        {!isCompleted &&
          !isCancelled &&
          nextStatus && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              {/* Status Select */}

              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(
                    event.target.value
                  )
                }
                className="min-w-[220px] rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="">
                  Select next status
                </option>

                <option value={nextStatus}>
                  {formatStatus(
                    nextStatus
                  )}
                </option>
              </select>

              {/* Update Button */}

              {selectedStatus && (
                <button
                  onClick={
                    handleStatusUpdate
                  }
                  disabled={updating}
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating
                    ? "Updating..."
                    : "Update Status"}
                </button>
              )}
            </div>
          )}

        {/* Completed Message */}

        {(isCompleted ||
          isCancelled) && (
          <p className="text-sm font-medium text-slate-500">
            {isCompleted
              ? "Shipment has been delivered successfully."
              : "This shipment has been cancelled."}
          </p>
        )}
      </div>

      {/* ================= SENDER & RECEIVER ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Sender */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-emerald-50 p-2">

              <User
                size={20}
                className="text-emerald-600"
              />

            </div>

            <h2 className="font-semibold text-slate-800">
              Sender Information
            </h2>

          </div>

          <p className="text-sm text-slate-500">
            Sender Name
          </p>

          <p className="mt-1 font-medium text-slate-800">
            {shipment.senderName}
          </p>

        </div>

        {/* Receiver */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-blue-50 p-2">

              <User
                size={20}
                className="text-blue-600"
              />

            </div>

            <h2 className="font-semibold text-slate-800">
              Receiver Information
            </h2>

          </div>

          <div className="space-y-3">

            <div>
              <p className="text-sm text-slate-500">
                Receiver Name
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {shipment.receiverName}
              </p>
            </div>

            <div className="flex items-center gap-2">

              <Phone
                size={16}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-700">
                {shipment.receiverPhone}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= PICKUP & DELIVERY ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Pickup Location */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-purple-50 p-2">

              <MapPin
                size={20}
                className="text-purple-600"
              />

            </div>

            <h2 className="font-semibold text-slate-800">
              Pickup Location
            </h2>

          </div>

          <div className="space-y-2 text-sm text-slate-700">

            <p>
              {shipment.pickupAddress}
            </p>

            <p>
              {shipment.pickupCity},{" "}
              {shipment.pickupState}
            </p>

            <p>
              PIN: {shipment.pickupPincode}
            </p>

          </div>

        </div>

        {/* Delivery Location */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-orange-50 p-2">

              <MapPin
                size={20}
                className="text-orange-600"
              />

            </div>

            <h2 className="font-semibold text-slate-800">
              Delivery Location
            </h2>

          </div>

          <div className="space-y-2 text-sm text-slate-700">

            <p>
              {shipment.deliveryAddress}
            </p>

            <p>
              {shipment.deliveryCity},{" "}
              {shipment.deliveryState}
            </p>

            <p>
              PIN: {shipment.deliveryPincode}
            </p>

          </div>

        </div>

      </div>

      {/* ================= SHIPMENT MAP ================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">

            <MapPin
              size={20}
              className="text-emerald-600"
            />

          </div>

          <div>

            <h2 className="font-semibold text-slate-800">
              Shipment Location
            </h2>

            <p className="text-sm text-slate-500">
              Current location of the shipment
            </p>

          </div>

        </div>

        {locationLoading ? (

          <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">

            <p className="text-sm text-slate-500">
              Loading shipment location...
            </p>

          </div>

        ) : shipmentLocation ? (

          <>

            <GoogleShipmentMap
              latitude={shipmentLocation.latitude}
              longitude={shipmentLocation.longitude}
              encodedPolyline={
                route?.polyline?.encodedPolyline
              }
              historyEncodedPolyline={
                historyRoute?.polyline?.encodedPolyline
              }
            />

            {/* ================= ROUTE INFORMATION ================= */}

            {route && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Route Distance
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    {(
                      route.distanceMeters /
                      1000
                    ).toFixed(1)}{" "}
                    km
                  </p>

                </div>

                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Estimated Travel Time
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    {formatDuration(
                      route.duration
                    )}
                  </p>

                </div>

              </div>
            )}

            {/* ================= ETA ================= */}

            {etaLoading ? (

              <div className="mt-4 rounded-lg bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Calculating estimated arrival time...
                </p>

              </div>

            ) : eta ? (

              <div className="mt-4 rounded-lg bg-emerald-50 p-4">

                <p className="text-sm text-emerald-700">
                  Estimated Arrival
                </p>

                <p className="mt-1 text-xl font-semibold text-emerald-800">

                  {etaArrival
                    ? new Date(
                        etaArrival
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "N/A"}

                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  Based on current shipment location
                </p>

              </div>

            ) : null}

            {/* ================= DELAY PREDICTION ================= */}

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">

              <div className="mb-3">

                <h3 className="font-semibold text-slate-800">
                  Delay Prediction
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Current delivery prediction based on shipment progress.
                </p>

              </div>

              {delayLoading ? (

                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Calculating delay prediction...
                  </p>

                </div>

              ) : delayPrediction ? (

                <div className="space-y-4">

                  {/* Prediction Status */}

                  <div
                    className={`rounded-lg p-4 ${
                      delayPrediction.prediction ===
                      "DELAYED"
                        ? "bg-red-50"
                        : delayPrediction.prediction ===
                          "ON_TIME"
                        ? "bg-emerald-50"
                        : "bg-slate-50"
                    }`}
                  >

                    <p className="text-sm text-slate-500">
                      Prediction
                    </p>

                    <p
                      className={`mt-1 text-lg font-semibold ${
                        delayPrediction.prediction ===
                        "DELAYED"
                          ? "text-red-700"
                          : delayPrediction.prediction ===
                            "ON_TIME"
                          ? "text-emerald-700"
                          : "text-slate-700"
                      }`}
                    >
                      {delayPrediction.prediction ===
                      "DELAYED"
                        ? "Delayed"
                        : delayPrediction.prediction ===
                          "ON_TIME"
                        ? "On Time"
                        : "Not Started"}
                    </p>

                  </div>

                  {/* Arrival Information */}

                  {delayPrediction.expectedArrivalTime && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <div className="rounded-lg bg-slate-50 p-4">

                        <p className="text-sm text-slate-500">
                          Expected Arrival
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {new Date(
                            delayPrediction.expectedArrivalTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>

                      </div>

                      {delayPrediction.currentEstimatedArrivalTime && (
                        <div className="rounded-lg bg-slate-50 p-4">

                          <p className="text-sm text-slate-500">
                            Current Estimated Arrival
                          </p>

                          <p className="mt-1 font-semibold text-slate-800">
                            {new Date(
                              delayPrediction.currentEstimatedArrivalTime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>

                        </div>
                      )}

                    </div>
                  )}

                  {/* Delay */}

                  {delayPrediction.prediction ===
                    "DELAYED" &&
                    delayPrediction.delayMinutes !==
                      null && (
                      <div className="rounded-lg bg-red-50 p-4">

                        <p className="text-sm text-red-600">
                          Estimated Delay
                        </p>

                        <p className="mt-1 text-xl font-semibold text-red-700">
                          {delayPrediction.delayMinutes} minutes
                        </p>

                      </div>
                    )}

                  {/* Message */}

                  {delayPrediction.message && (
                    <p className="text-sm text-slate-600">
                      {delayPrediction.message}
                    </p>
                  )}

                </div>

              ) : (

                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Delay prediction is currently unavailable.
                  </p>

                </div>

              )}

            </div>

            {/* ================= DELIVERY FORECAST ================= */}

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">

              <div className="mb-3">

                <h3 className="font-semibold text-slate-800">
                  Delivery Forecast
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Forecasted delivery based on the current shipment location and route.
                </p>

              </div>

              {deliveryForecast ? (

                <div className="space-y-4">

                  {/* Forecast Status */}

                  <div
                    className={`rounded-lg p-4 ${
                      deliveryForecast.forecast ===
                      "DELIVERED"
                        ? "bg-green-50"
                        : deliveryForecast.forecast ===
                          "EXPECTED"
                        ? "bg-emerald-50"
                        : "bg-slate-50"
                    }`}
                  >

                    <p className="text-sm text-slate-500">
                      Forecast
                    </p>

                    <p
                      className={`mt-1 text-lg font-semibold ${
                        deliveryForecast.forecast ===
                        "DELIVERED"
                          ? "text-green-700"
                          : deliveryForecast.forecast ===
                            "EXPECTED"
                          ? "text-emerald-700"
                          : "text-slate-700"
                      }`}
                    >
                      {deliveryForecast.forecast ===
                      "DELIVERED"
                        ? "Delivered"
                        : deliveryForecast.forecast ===
                          "EXPECTED"
                        ? "Expected"
                        : deliveryForecast.forecast ===
                          "NOT_STARTED"
                        ? "Not Started"
                        : deliveryForecast.forecast}
                    </p>

                  </div>

                  {/* Forecast Information */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* Forecasted Delivery */}

                    <div className="rounded-lg bg-slate-50 p-4">

                      <p className="text-sm text-slate-500">
                        Forecasted Delivery
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {deliveryForecast.forecastedDeliveryTime
                          ? new Date(
                              deliveryForecast.forecastedDeliveryTime
                            ).toLocaleString([], {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "N/A"}
                      </p>

                    </div>

                    {/* Travel Time */}

                    <div className="rounded-lg bg-slate-50 p-4">

                      <p className="text-sm text-slate-500">
                        Estimated Travel Time
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {deliveryForecast.estimatedTravelTimeMinutes !==
                        null &&
                        deliveryForecast.estimatedTravelTimeMinutes !==
                        undefined
                          ? `${deliveryForecast.estimatedTravelTimeMinutes} minutes`
                          : "N/A"}
                      </p>

                    </div>

                    {/* Distance */}

                    <div className="rounded-lg bg-slate-50 p-4">

                      <p className="text-sm text-slate-500">
                        Remaining Distance
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {deliveryForecast.estimatedDistanceMeters !==
                        null &&
                        deliveryForecast.estimatedDistanceMeters !==
                        undefined
                          ? `${(
                              deliveryForecast.estimatedDistanceMeters /
                              1000
                            ).toFixed(1)} km`
                          : "N/A"}
                      </p>

                    </div>

                    {/* Current Status */}

                    <div className="rounded-lg bg-slate-50 p-4">

                      <p className="text-sm text-slate-500">
                        Current Shipment Status
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {formatStatus(
                          deliveryForecast.currentStatus
                        )}
                      </p>

                    </div>

                  </div>

                  {/* Forecast Message */}

                  {deliveryForecast.message && (
                    <p className="text-sm text-slate-600">
                      {deliveryForecast.message}
                    </p>
                  )}

                </div>

              ) : (

                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Delivery forecast is currently unavailable.
                  </p>

                </div>

              )}

            </div>

          </>

        ) : (

          <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">

            <p className="text-sm text-slate-500">
              No location data available for this shipment.
            </p>

          </div>

        )}

      </div>

      {/* ================= PACKAGE DETAILS ================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">

            <Package
              size={20}
              className="text-emerald-600"
            />

          </div>

          <h2 className="font-semibold text-slate-800">
            Package Details
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Description */}

          <div>

            <p className="text-sm text-slate-500">
              Package Description
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {shipment.packageDescription ||
                "Not provided"}
            </p>

          </div>

          {/* Weight */}

          <div>

            <div className="flex items-center gap-2">

              <Weight
                size={16}
                className="text-slate-400"
              />

              <p className="text-sm text-slate-500">
                Weight
              </p>

            </div>

            <p className="mt-1 text-sm font-medium text-slate-800">

              {shipment.weight
                ? `${shipment.weight} kg`
                : "Not provided"}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OperatorShipmentDetails;