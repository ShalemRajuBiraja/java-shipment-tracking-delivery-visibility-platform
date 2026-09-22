import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleShipmentMap from "../../components/GoogleShipmentMap";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Truck,
  Weight,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  ShieldAlert,
} from "lucide-react";

import * as operatorService from "../../services/operatorService";
import { updateShipmentLocation } from "../../services/shipmentService";
import {
  getLatestShipmentLocation,
  getCurrentLocationToDeliveryRoute,
} from "../../services/LocationService";

const {
  getOperatorShipmentById,
  updateOperatorShipmentStatus,
  getShipmentLocation,
  getShipmentRoute,
  getShipmentEta,
  getShipmentDelayPrediction,
  getShipmentRouteHistory,
  getRoadFollowingRouteHistory,
  getShipmentDeliveryForecast,
} = operatorService;

// =========================================================
// HELPER: FORMAT ROUTE DURATION
// =========================================================
const formatDuration = (duration) => {
  if (!duration) {
    return "N/A";
  }

  const seconds = parseInt(duration.replace("s", ""), 10);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
};

// =========================================================
// HELPER: FORMAT TRAVEL TIME
// =========================================================
const formatTravelTime = (seconds) => {
  if (seconds === null || seconds === undefined) {
    return "N/A";
  }

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
};

// =========================================================
// HELPER: FORMAT DISTANCE
// =========================================================
const formatDistance = (meters) => {
  if (meters === null || meters === undefined) {
    return "N/A";
  }

  return `${(meters / 1000).toFixed(2)} km`;
};

// =========================================================
// COMPONENT: OPERATOR SHIPMENT DETAILS
// =========================================================
const OperatorShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // COMPONENT STATES
  // =========================================================
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const [locationUpdating, setLocationUpdating] = useState(false);
  const [shipmentLocation, setShipmentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const [route, setRoute] = useState(null);
  const [routeLoading, setRouteLoading] = useState(true);
  const [encodedPolyline, setEncodedPolyline] = useState(null);
  const [currentRoutePolyline, setCurrentRoutePolyline] = useState(null);

  const [eta, setEta] = useState(null);
  const [etaLoading, setEtaLoading] = useState(true);

  const [delayPrediction, setDelayPrediction] = useState(null);
  const [delayLoading, setDelayLoading] = useState(true);

  const [locationHistory, setLocationHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [historyRoute, setHistoryRoute] = useState(null);
  const [historyRouteLoading, setHistoryRouteLoading] = useState(false);

  const [deliveryForecast, setDeliveryForecast] = useState(null);
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  // =========================================================
  // SHIPMENT STATUS FLOW
  // =========================================================
  const shipmentStatusFlow = [
    "CREATED",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  // =========================================================
  // LIVE LOCATION POLLING
  // =========================================================
  useEffect(() => {
    if (!shipment?.trackingNumber) {
      return;
    }

    const interval = setInterval(() => {
      fetchShipmentLocation(shipment.trackingNumber, shipment);
    }, 900000);

    return () => {
      clearInterval(interval);
    };
  }, [shipment?.trackingNumber]);

  // =========================================================
  // FETCH SHIPMENT DETAILS
  // =========================================================
  useEffect(() => {
    fetchShipmentDetails();
  }, [id]);

  // =========================================================
  // FETCH ROUTE HISTORY
  // =========================================================
  useEffect(() => {
    if (!shipment?.trackingNumber) {
      return;
    }

    fetchShipmentRouteHistory(shipment.trackingNumber);
    fetchRoadFollowingRouteHistory(shipment.trackingNumber);
  }, [shipment?.trackingNumber]);

  // =========================================================
  // FETCH SHIPMENT DETAILS
  // =========================================================
  const fetchShipmentDetails = async () => {
    try {
      setLoading(true);

      const response = await getOperatorShipmentById(id);

      if (response.data.success === true) {
        const shipmentData = response.data.data;

        setShipment(shipmentData);

        // Location -> Route -> ETA
        fetchShipmentLocation(
          shipmentData.trackingNumber,
          shipmentData
        );

        fetchDelayPrediction(shipmentData.trackingNumber);
      }
    } catch (error) {
      console.error("Error fetching shipment details:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH SHIPMENT LOCATION
  // =========================================================
  const fetchShipmentLocation = async (
    trackingNumber,
    shipmentData
  ) => {
    try {
      setLocationLoading(true);
      setRouteLoading(true);

      const response = await getShipmentLocation(trackingNumber);
      const locationData = response.data?.data;

      try {
        const latestLocationResponse =
          await getLatestShipmentLocation(trackingNumber);

        const latestLocation =
          latestLocationResponse.data?.data;

        setLiveLocation(latestLocation);

        // Fetch Current Live Location -> Delivery Route
        try {
          const currentRouteResponse =
            await getCurrentLocationToDeliveryRoute(
              trackingNumber
            );

          const currentRouteData =
            currentRouteResponse.data?.routes?.[0];

          if (currentRouteData) {
            const currentPolyline =
              currentRouteData?.polyline?.encodedPolyline;

            setCurrentRoutePolyline(
              currentPolyline || null
            );
          } else {
            setCurrentRoutePolyline(null);
          }
        } catch (currentRouteError) {
          console.warn(
            "Current location → delivery route unavailable:",
            currentRouteError
          );

          setCurrentRoutePolyline(null);
        }
      } catch (latestLocationError) {
        console.warn(
          "Current shipment location not available yet:",
          latestLocationError
        );

        setLiveLocation(null);
      }

      if (!locationData) {
        setShipmentLocation(null);
        setRoute(null);
        setEncodedPolyline(null);
        setEta(null);
        return;
      }

      setShipmentLocation(locationData);

      if (
        locationData.pickupLatitude != null &&
        locationData.pickupLongitude != null &&
        locationData.deliveryLatitude != null &&
        locationData.deliveryLongitude != null
      ) {
        try {
          const routeOrigin =
            `${locationData.pickupLatitude},${locationData.pickupLongitude}`;

          const routeDestination =
            `${locationData.deliveryLatitude},${locationData.deliveryLongitude}`;

          const routeResponse =
            await getShipmentRoute(
              routeOrigin,
              routeDestination
            );

          const routeData =
            routeResponse.data?.data?.routes?.[0];

          if (routeData) {
            setRoute(routeData);

            const polyline =
              routeData?.polyline?.encodedPolyline;

            if (polyline) {
              setEncodedPolyline(polyline);
            } else {
              setEncodedPolyline(null);
            }
          } else {
            setRoute(null);
            setEncodedPolyline(null);
          }
        } catch (routeError) {
          console.error(
            "Error fetching shipment route:",
            routeError
          );

          setRoute(null);
          setEncodedPolyline(null);
        } finally {
          setRouteLoading(false);
        }
      } else {
        setRoute(null);
        setEncodedPolyline(null);
        setRouteLoading(false);
      }

      fetchShipmentEta(
        locationData,
        shipmentData
      );
    } catch (error) {
      console.error(
        "Error fetching shipment location:",
        error
      );

      setShipmentLocation(null);
      setRoute(null);
      setEncodedPolyline(null);
      setEta(null);
    } finally {
      setLocationLoading(false);
    }
  };

  // =========================================================
  // FETCH SHIPMENT ROUTE HISTORY
  // =========================================================
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

  // =========================================================
  // FETCH ROAD FOLLOWING ROUTE HISTORY
  // =========================================================
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

  // =========================================================
  // FETCH SHIPMENT ETA
  // =========================================================
  const fetchShipmentEta = async (
    locationData,
    shipmentData
  ) => {
    try {
      setEtaLoading(true);

      if (
        locationData?.pickupLatitude == null ||
        locationData?.pickupLongitude == null
      ) {
        setEta(null);
        return;
      }

      const destination = [
        shipmentData.deliveryAddress,
        shipmentData.deliveryCity,
        shipmentData.deliveryState,
        shipmentData.deliveryPincode,
      ]
        .filter(Boolean)
        .join(", ");

      if (!destination) {
        setEta(null);
        return;
      }

      const response =
        await getShipmentEta(
          locationData.pickupLatitude,
          locationData.pickupLongitude,
          destination
        );

      if (response.data) {
        setEta(response.data);
      } else {
        setEta(null);
      }
    } catch (error) {
      console.error(
        "Error fetching shipment ETA:",
        error
      );

      setEta(null);
    } finally {
      setEtaLoading(false);
    }
  };

  // =========================================================
  // FETCH DELAY PREDICTION
  // =========================================================
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

  // =========================================================
  // GET NEXT VALID STATUS
  // =========================================================
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

  // =========================================================
  // UPDATE SHIPMENT STATUS
  // =========================================================
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

      if (
        response.data.success === true
      ) {
        const updatedShipment =
          response.data.data;

        setShipment(
          updatedShipment
        );

        setSelectedStatus("");

        fetchShipmentLocation(
          updatedShipment.trackingNumber,
          updatedShipment
        );
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

  // =========================================================
  // OPEN DELIVERY CONFIRMATION
  // =========================================================
  const handleOpenDeliveryConfirmation = async () => {
    try {
      /*
       * Backend API will be connected here.
       *
       * Example future API:
       *
       * await openDeliveryConfirmation(
       *   shipment.trackingNumber
       * );
       *
       * For now, we only confirm that the
       * button is working.
       */

      toast.info(
        "Delivery Confirmation API is not connected yet."
      );
    } catch (error) {
      console.error(
        "Error opening delivery confirmation:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to open delivery confirmation."
      );
    }
  };

  // =========================================================
  // UPDATE SHIPMENT LOCATION
  // =========================================================
  const handleLocationUpdate = async () => {
    const newLocation =
      locationInput.trim();

    if (!newLocation) {
      toast.error(
        "Please enter a location."
      );

      return;
    }

    try {
      setLocationUpdating(true);

      const response =
        await updateShipmentLocation(
          shipment.trackingNumber,
          newLocation
        );

      if (
        response.data?.success === true
      ) {
        toast.success(
          "Shipment location updated successfully."
        );

        setLocationInput("");

        await fetchShipmentLocation(
          shipment.trackingNumber,
          shipment
        );
      }
    } catch (error) {
      console.error(
        "Error updating shipment location:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update shipment location."
      );

      console.log(error);
    } finally {
      setLocationUpdating(false);
    }
  };

  // =========================================================
  // LOADING STATE
  // =========================================================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

        <p className="mt-4 text-sm font-medium text-slate-600">
          Loading operator shipment telemetry...
        </p>
      </div>
    );
  }

  // =========================================================
  // SHIPMENT NOT FOUND STATE
  // =========================================================
  if (!shipment) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <ShieldAlert className="h-7 w-7 text-slate-600" />
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          Shipment Unreachable
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We could not locate records for shipment ID:{" "}
          <span className="font-mono font-semibold text-slate-700">
            {id}
          </span>
          .
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shipments
        </button>
      </div>
    );
  }

  // =========================================================
  // DERIVED VALUES
  // =========================================================
  const nextStatus =
    getNextStatus();

  const isCompleted =
    shipment.status === "DELIVERED";

  const isCancelled =
    shipment.status === "CANCELLED";

  const estimatedArrival =
    eta?.estimatedArrival ||
    deliveryForecast?.forecastedDeliveryTime;

  const isDelayed =
    delayPrediction?.prediction ===
      "DELAYED" ||
    delayPrediction?.delayMinutes > 0;

  const isOnTime =
    delayPrediction?.prediction ===
    "ON_TIME";

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">

      {/* =====================================================
          HEADER BAR
      ===================================================== */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shipments
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Shipment Details
              </h1>

              <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                #{shipment.trackingNumber}
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Manage operator controls, stage transitions, and live route vectors.
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${getStatusStyle(
              shipment.status
            )}`}
          >
            {formatStatus(
              shipment.status
            )}
          </span>

        </div>
      </div>

      {/* =====================================================
          OPERATOR STATUS & LOCATION UPDATE CONTROLS BAR
      ===================================================== */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* =================================================
              LOCATION UPDATE
          ================================================= */}
          <div className="flex w-full flex-col gap-2 xl:max-w-[500px] xl:flex-1">

            <p className="px-1 text-xs font-semibold text-slate-500">
              Update Shipment Location here
            </p>

            <div className="flex w-full flex-col gap-2 sm:flex-row">

              <input
                type="text"
                value={locationInput}
                onChange={(e) =>
                  setLocationInput(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLocationUpdate();
                  }
                }}
                placeholder="Enter current location"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={
                  handleLocationUpdate
                }
                disabled={
                  locationUpdating
                }
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                  locationInput.trim()
                    ? "bg-emerald-600 text-white ring-emerald-600 hover:bg-emerald-700 hover:ring-emerald-700"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-emerald-300"
                }`}
              >
                <MapPin
                  className={`h-4 w-4 ${
                    locationInput.trim()
                      ? "text-white"
                      : "text-emerald-600"
                  }`}
                />

                {locationUpdating
                  ? "Updating..."
                  : "Update Location"}
              </button>

            </div>
          </div>

          {/* =================================================
              STATUS UPDATE + DELIVERY CONFIRMATION
          ================================================= */}
          <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[390px]">

            <p className="px-1 text-xs font-semibold text-slate-500">
              Shipment Actions
            </p>

            {/* STATUS UPDATE */}
            {!isCompleted &&
            !isCancelled &&
            nextStatus ? (
              <div className="flex w-full flex-col gap-2 sm:flex-row">

                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value
                    )
                  }
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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

                <button
                  onClick={
                    handleStatusUpdate
                  }
                  disabled={
                    !selectedStatus ||
                    updating
                  }
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating
                    ? "Updating..."
                    : "Update Status"}
                </button>

              </div>
            ) : (
              <p className="py-2 text-xs font-medium text-slate-500">
                {isCompleted
                  ? "Shipment has been delivered successfully."
                  : "This shipment status is locked."}
              </p>
            )}

            {/* =================================================
                OPEN DELIVERY CONFIRMATION
            ================================================= */}
            {shipment.status ===
              "OUT_FOR_DELIVERY" && (
              <button
                type="button"
                onClick={
                  handleOpenDeliveryConfirmation
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:shadow active:scale-[0.98]"
              >
                <CheckCircle2 className="h-4 w-4" />

                Open Delivery Confirmation
              </button>
            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          SENDER & RECEIVER CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* SENDER CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">

            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <User className="h-4 w-4" />
            </div>

            <h2 className="text-sm font-bold text-slate-900">
              Sender Information
            </h2>

          </div>

          <div className="space-y-1">

            <span className="text-xs font-medium text-slate-400">
              Sender Name
            </span>

            <p className="text-sm font-semibold text-slate-800">
              {shipment.senderName ||
                "N/A"}
            </p>

          </div>
        </div>

        {/* RECEIVER CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">

            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <User className="h-4 w-4" />
            </div>

            <h2 className="text-sm font-bold text-slate-900">
              Receiver Information
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div>

              <span className="text-xs font-medium text-slate-400">
                Receiver Name
              </span>

              <p className="text-sm font-semibold text-slate-800">
                {shipment.receiverName ||
                  "N/A"}
              </p>

            </div>

            <div className="flex items-center gap-2 pt-3 sm:pt-0">

              <Phone className="h-4 w-4 text-slate-400" />

              <span className="text-sm font-semibold text-slate-700">
                {shipment.receiverPhone ||
                  "N/A"}
              </span>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          PICKUP & DELIVERY LOCATION CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* PICKUP LOCATION */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">

            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <MapPin className="h-4 w-4" />
            </div>

            <h2 className="text-sm font-bold text-slate-900">
              Pickup Location
            </h2>

          </div>

          <div className="space-y-1 text-sm text-slate-700">

            <p className="font-semibold">
              {shipment.pickupAddress}
            </p>

            <p className="text-xs text-slate-500">
              {shipment.pickupCity},{" "}
              {shipment.pickupState}
            </p>

            <p className="font-mono text-xs text-slate-400">
              PIN: {shipment.pickupPincode}
            </p>

          </div>
        </div>

        {/* DELIVERY LOCATION */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">

            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
              <MapPin className="h-4 w-4" />
            </div>

            <h2 className="text-sm font-bold text-slate-900">
              Delivery Location
            </h2>

          </div>

          <div className="space-y-1 text-sm text-slate-700">

            <p className="font-semibold">
              {shipment.deliveryAddress}
            </p>

            <p className="text-xs text-slate-500">
              {shipment.deliveryCity},{" "}
              {shipment.deliveryState}
            </p>

            <p className="font-mono text-xs text-slate-400">
              PIN: {shipment.deliveryPincode}
            </p>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN TRACKING & MAP GRID
      ===================================================== */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

        {/* MAP & ROUTE TELEMETRY */}
        <div className="space-y-6 lg:col-span-2">

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* MAP HEADER TOOLBAR */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/50 px-6 py-4">

              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Navigation className="h-4 w-4" />
                </div>

                <div>

                  <h2 className="text-base font-bold text-slate-900">
                    Live Route Map
                  </h2>

                  <p className="text-xs text-slate-500">
                    Pickup to delivery route coordinate vector
                  </p>

                </div>
              </div>

              {shipmentLocation && (
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>

                  </span>

                  Signal Active
                </div>
              )}

            </div>

            {/* QUICK TELEMETRY BAR */}
            {!locationLoading &&
              shipmentLocation && (
                <div className="grid grid-cols-1 divide-y divide-slate-100 border-b border-slate-100 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                  {/* DISTANCE */}
                  <div className="flex items-center gap-3.5 p-4">

                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>

                      <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                        Distance
                      </span>

                      <span className="text-base font-bold text-slate-900">

                        {routeLoading
                          ? "Calculating..."
                          : route?.distanceMeters !=
                              null
                          ? formatDistance(
                              route.distanceMeters
                            )
                          : eta?.distanceKm !=
                            null
                          ? `${Number(
                              eta.distanceKm
                            ).toFixed(2)} km`
                          : "N/A"}

                      </span>

                    </div>
                  </div>

                  {/* TRANSIT TIME */}
                  <div className="flex items-center gap-3.5 p-4">

                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                      <Clock className="h-5 w-5" />
                    </div>

                    <div>

                      <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                        Est. Transit Time
                      </span>

                      <span className="text-base font-bold text-slate-900">

                        {routeLoading
                          ? "Calculating..."
                          : route?.duration
                          ? formatDuration(
                              route.duration
                            )
                          : eta?.durationSeconds
                          ? formatTravelTime(
                              eta.durationSeconds
                            )
                          : eta?.travelTime ||
                            "N/A"}

                      </span>

                    </div>
                  </div>

                  {/* ESTIMATED ARRIVAL */}
                  <div className="flex items-center gap-3.5 bg-emerald-50/30 p-4">

                    <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
                      <TrendingUp className="h-5 w-5" />
                    </div>

                    <div>

                      <span className="block text-xs font-medium uppercase tracking-wider text-emerald-800">
                        Estimated Arrival
                      </span>

                      <span className="text-base font-bold text-emerald-700">

                        {etaLoading
                          ? "Calculating..."
                          : estimatedArrival ||
                            "N/A"}

                      </span>

                    </div>
                  </div>

                </div>
              )}

            {/* GOOGLE MAP VIEWPORT */}
            <div className="bg-slate-50 p-4">

              {locationLoading ? (

                <div className="flex h-[380px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">

                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Loading Google Map vector...
                  </p>

                </div>

              ) : shipmentLocation ? (

                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-inner">

                  <GoogleShipmentMap
                    pickupLatitude={
                      shipmentLocation.pickupLatitude
                    }
                    pickupLongitude={
                      shipmentLocation.pickupLongitude
                    }
                    deliveryLatitude={
                      shipmentLocation.deliveryLatitude
                    }
                    deliveryLongitude={
                      shipmentLocation.deliveryLongitude
                    }
                    currentLatitude={
                      liveLocation?.latitude
                    }
                    currentLongitude={
                      liveLocation?.longitude
                    }
                    encodedPolyline={
                      encodedPolyline
                    }
                    currentRoutePolyline={
                      currentRoutePolyline
                    }
                  />

                </div>

              ) : (

                <div className="flex h-[380px] w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center">

                  <MapPin className="h-8 w-8 text-slate-300" />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Current Location Unavailable
                  </p>

                  <p className="mt-1 max-w-xs text-xs text-slate-500">
                    No active GPS vector coordinate logs found for this tracking session yet.
                  </p>

                </div>
              )}

            </div>
          </section>

          {/* =================================================
              PREDICTIVE INSIGHTS
          ================================================= */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* DELIVERY FORECAST */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">

                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <h2 className="text-sm font-bold text-slate-900">
                  Delivery Forecast
                </h2>

              </div>

              {deliveryForecast ? (

                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

                    <span className="text-xs font-medium text-slate-500">
                      Status
                    </span>

                    <span className="text-xs font-bold text-slate-800">
                      {deliveryForecast.currentStatus ||
                        deliveryForecast.status ||
                        "N/A"}
                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

                    <span className="text-xs font-medium text-slate-500">
                      Forecast Target
                    </span>

                    <span className="text-xs font-bold text-emerald-600">

                      {deliveryForecast.forecastedDelivery
                        ? new Date(
                            deliveryForecast.forecastedDelivery
                          ).toLocaleString([], {
                            dateStyle:
                              "short",
                            timeStyle:
                              "short",
                          })
                        : "N/A"}

                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    <div className="rounded-xl border border-slate-100 p-2.5 text-center">

                      <span className="block text-[11px] text-slate-400">
                        Est. Distance
                      </span>

                      <span className="text-xs font-bold text-slate-700">

                        {deliveryForecast.distanceMeters !=
                        null
                          ? formatDistance(
                              deliveryForecast.distanceMeters
                            )
                          : "N/A"}

                      </span>

                    </div>

                    <div className="rounded-xl border border-slate-100 p-2.5 text-center">

                      <span className="block text-[11px] text-slate-400">
                        Est. Time
                      </span>

                      <span className="text-xs font-bold text-slate-700">

                        {deliveryForecast.travelTimeMinutes !=
                        null
                          ? formatTravelTime(
                              deliveryForecast.travelTimeMinutes *
                                60
                            )
                          : "N/A"}

                      </span>

                    </div>

                  </div>

                </div>

              ) : (

                <p className="mt-6 text-center text-xs text-slate-400">
                  Delivery forecast telemetry unavailable.
                </p>

              )}

            </section>

            {/* DELAY PREDICTION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                <div className="flex items-center gap-2.5">

                  <div
                    className={`rounded-lg p-2 ${
                      isDelayed
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Delay Assessment
                  </h2>

                </div>

                {delayPrediction && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isDelayed
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {isDelayed
                      ? "Risk Flagged"
                      : "On Schedule"}
                  </span>
                )}

              </div>

              {delayPrediction ? (

                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

                    <span className="text-xs font-medium text-slate-500">
                      Prediction Model
                    </span>

                    <span className="text-xs font-bold text-slate-800">
                      {delayPrediction.prediction ||
                        "N/A"}
                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

                    <span className="text-xs font-medium text-slate-500">
                      Estimated Variance
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        isDelayed
                          ? "text-amber-600"
                          : "text-slate-800"
                      }`}
                    >
                      {delayPrediction.delayMinutes !=
                      null
                        ? `+${delayPrediction.delayMinutes} mins`
                        : "0 mins"}
                    </span>

                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">

                    <span className="block text-[11px] font-semibold uppercase text-slate-400">
                      Analysis Note
                    </span>

                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {delayPrediction.message ||
                        "No operational warnings logged for current trajectory."}
                    </p>

                  </div>

                </div>

              ) : (

                <p className="mt-6 text-center text-xs text-slate-400">
                  Delay prediction models unavailable.
                </p>

              )}

            </section>
          </div>
        </div>

        {/* ===================================================
            TRACKING PROGRESSION SIDEBAR
        =================================================== */}
        <div className="space-y-6 lg:col-span-1">

          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">

              <h2 className="text-base font-bold text-slate-900">
                Tracking Progress
              </h2>

              <p className="text-xs text-slate-500">
                Checkpoint verification status flow
              </p>

            </div>

            <div className="p-5">

              <div className="relative pl-7">

                {/* VERTICAL STEP LINE */}
                <div className="absolute bottom-2 left-[10px] top-2 w-[2px] bg-slate-200" />

                {shipmentStatusFlow.map(
                  (status, index) => {

                    const currentIndex =
                      shipmentStatusFlow.indexOf(
                        shipment.status
                      );

                    const isCompletedStep =
                      !isCancelled &&
                      index <= currentIndex;

                    const isCurrentStep =
                      !isCancelled &&
                      index === currentIndex;

                    return (
                      <div
                        key={status}
                        className="relative mb-6 last:mb-0"
                      >

                        <div
                          className={`absolute -left-[25px] top-0.5 h-5 w-5 rounded-full border-2 transition-all ${
                            isCurrentStep
                              ? "border-emerald-600 bg-emerald-600 ring-4 ring-emerald-100"
                              : isCompletedStep
                              ? "border-emerald-600 bg-emerald-600"
                              : "border-slate-300 bg-white"
                          }`}
                        />

                        <p
                          className={`text-sm font-semibold ${
                            isCurrentStep
                              ? "text-emerald-700"
                              : isCompletedStep
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {formatStatus(
                            status
                          )}
                        </p>

                        {isCurrentStep && (
                          <span className="mt-1 inline-block rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                            Current Stage
                          </span>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

              {/* DELIVERY EXPECTATION */}
              <div className="mt-6 border-t border-slate-100 pt-4">

                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Delivery Expectation
                </span>

                <p
                  className={`mt-1 text-xs font-bold ${
                    isDelayed
                      ? "text-red-600"
                      : isOnTime
                      ? "text-emerald-600"
                      : "text-slate-700"
                  }`}
                >
                  {delayLoading
                    ? "Calculating..."
                    : isDelayed
                    ? "Shipment may arrive late"
                    : isOnTime
                    ? "Shipment is on schedule"
                    : deliveryForecast?.forecast ===
                      "DELIVERED"
                    ? "Shipment has been delivered"
                    : "Prediction unavailable"}
                </p>

                {isDelayed &&
                  delayPrediction?.delayMinutes !=
                    null && (
                    <div className="mt-2 rounded-lg border border-red-100 bg-red-50 p-2">

                      <span className="text-xs text-red-600">
                        Estimated delay:{" "}
                        <strong className="font-bold">
                          {
                            delayPrediction.delayMinutes
                          }{" "}
                          min
                        </strong>
                      </span>

                    </div>
                  )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// HELPER: STATUS COLOR STYLES
// =========================================================
const getStatusStyle = (status) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700 border border-green-200";

    case "IN_TRANSIT":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    case "CREATED":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    case "PICKED_UP":
      return "bg-purple-100 text-purple-700 border border-purple-200";

    case "OUT_FOR_DELIVERY":
      return "bg-orange-100 text-orange-700 border border-orange-200";

    case "CANCELLED":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

// =========================================================
// HELPER: FORMAT STATUS STRING
// =========================================================
const formatStatus = (status) => {
  return status
    ?.replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

export default OperatorShipmentDetails;