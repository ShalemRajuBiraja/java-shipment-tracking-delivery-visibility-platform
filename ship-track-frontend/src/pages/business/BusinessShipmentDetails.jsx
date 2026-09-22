import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Package,
  MapPin,
  Phone,
  Weight,
  Calendar,
  Navigation,
  Clock,
  TrendingUp,
  ShieldAlert,
  X,
} from "lucide-react";

import { getShipmentByIdApi } from "../../services/shipmentService";
import GoogleShipmentMap from "../../components/GoogleShipmentMap";

import {
  getShipmentLocation,
  getShipmentRoute,
  getShipmentEta,
} from "../../services/operatorService";

const BusinessShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);

  const [encodedPolyline, setEncodedPolyline] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

  // ================= ETA STATE =================
  const [eta, setEta] = useState(null);
  const [etaLoading, setEtaLoading] = useState(true);

  // ================= FORMAT PICKUP LOCATION =================
  const formatPickupLocation = (shipmentData = shipment) => {
    const locationParts = [
      shipmentData?.pickupAddress,
      shipmentData?.pickupCity,
      shipmentData?.pickupState,
      shipmentData?.pickupPincode,
    ].filter(Boolean);

    return locationParts.join(", ");
  };

  // ================= FORMAT DELIVERY LOCATION =================
  const formatDeliveryLocation = (shipmentData = shipment) => {
    const locationParts = [
      shipmentData?.deliveryAddress,
      shipmentData?.deliveryCity,
      shipmentData?.deliveryState,
      shipmentData?.deliveryPincode,
    ].filter(Boolean);

    return locationParts.join(", ");
  };

  // ================= FETCH SHIPMENT + MAP DATA + ETA =================
  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        setLoading(true);
        setMapLoading(true);
        setEtaLoading(true);

        // ================= GET SHIPMENT =================
        const response = await getShipmentByIdApi(id);

        if (!response.data.success) {
          console.error(response.data.message);
          return;
        }

        const shipmentData = response.data.data;
        setShipment(shipmentData);

        // ================= GET SHIPMENT FULL LOCATION =================
        try {
          const locationResponse = await getShipmentLocation(
            shipmentData.trackingNumber
          );

          const locationData = locationResponse.data.data;
          setLocation(locationData);

          // ================= GET ETA =================
          if (locationData) {
            try {
              const deliveryAddress =
                formatDeliveryLocation(shipmentData);

              const etaResponse = await getShipmentEta(
                locationData.pickupLatitude,
                locationData.pickupLongitude,
                deliveryAddress
              );

              setEta(etaResponse.data);
            } catch (error) {
              console.error("Error fetching shipment ETA:", error);
              setEta(null);
            } finally {
              setEtaLoading(false);
            }

            // ================= GET GOOGLE ROUTE =================
            try {
              const origin = `${locationData.pickupLatitude},${locationData.pickupLongitude}`;

              const destination = `${locationData.deliveryLatitude},${locationData.deliveryLongitude}`;

              const routeResponse = await getShipmentRoute(
                origin,
                destination
              );

              const polyline =
                routeResponse.data?.data?.routes?.[0]?.polyline
                  ?.encodedPolyline;

              if (polyline) {
                setEncodedPolyline(polyline);
              } else {
                setEncodedPolyline(null);
              }
            } catch (error) {
              console.error("Error fetching shipment route:", error);
              setEncodedPolyline(null);
            }
          } else {
            setEncodedPolyline(null);
            setEta(null);
          }
        } catch (error) {
          console.error("Error fetching shipment location:", error);
          setLocation(null);
          setEncodedPolyline(null);
          setEta(null);
        } finally {
          setEtaLoading(false);
        }
      } catch (error) {
        console.error("Error fetching shipment details:", error);
      } finally {
        setLoading(false);
        setMapLoading(false);
      }
    };

    if (id) {
      fetchShipmentDetails();
    }
  }, [id]);

  // ================= SHIPMENT STATUS STEPS =================
  const shipmentSteps = [
    "CREATED",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  // ================= FORMAT STATUS =================
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ================= CURRENT STEP =================
  const getCurrentStepIndex = () => {
    if (!shipment?.status) return 0;

    return shipmentSteps.indexOf(shipment.status);
  };

  const currentStepIndex = getCurrentStepIndex();

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

        <p className="mt-4 text-sm font-medium text-slate-600">
          Loading business shipment details...
        </p>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!shipment) {
    return (
      <div className="mx-auto my-12 max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
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
          onClick={() => navigate("/business/shipments")}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shipments
        </button>
      </div>
    );
  }

  const isCancelled = shipment.status === "CANCELLED";

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      {/* =========================================================
          HEADER / TRACKING
      ========================================================= */}
      <section className="border-b border-slate-200 pb-4">
        <button
          onClick={() => navigate("/business/shipments")}
          className="mb-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shipments
        </button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Shipment Details
              </h1>

              <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                #{shipment.trackingNumber}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Shipment information, live route, ETA and tracking progress.
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${getStatusStyle(
              shipment.status
            )}`}
          >
            {formatStatus(shipment.status)}
          </span>
        </div>
      </section>

      {/* =========================================================
          SHIPMENT DETAILS — ONE COMPACT FULL-WIDTH CARD
      ========================================================= */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Package className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Shipment Information
            </h2>

            <p className="text-[11px] text-slate-500">
              Sender, package and shipment locations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {/* SENDER / RECEIVER */}
          <div className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Sender & Receiver
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              <div>
                <span className="block text-[11px] font-medium text-slate-400">
                  Sender Name
                </span>

                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {shipment.senderName || "-"}
                </p>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400">
                  Receiver Name
                </span>

                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {shipment.receiverName || "-"}
                </p>
              </div>

              <div className="col-span-2 flex items-center gap-2 border-t border-slate-50 pt-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" />

                <span className="text-xs font-semibold text-slate-700">
                  {shipment.receiverPhone || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* PACKAGE */}
          <div className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Package Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              <div className="col-span-2">
                <span className="block text-[11px] font-medium text-slate-400">
                  Description
                </span>

                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {shipment.packageDescription || "-"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-slate-400" />

                <div>
                  <span className="block text-[11px] font-medium text-slate-400">
                    Weight
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                    {shipment.weight ? `${shipment.weight} kg` : "-"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />

                <div>
                  <span className="block text-[11px] font-medium text-slate-400">
                    Created
                  </span>

                  <span className="text-xs font-semibold text-slate-700">
                    {formatDate(shipment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PICKUP */}
          <div className="border-t border-slate-100 p-5 lg:border-t">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Pickup Location
              </h3>
            </div>

            <p className="text-sm font-medium leading-relaxed text-slate-700">
              {formatPickupLocation() || "-"}
            </p>
          </div>

          {/* DELIVERY */}
          <div className="border-t border-slate-100 p-5 lg:border-t">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-600" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Delivery Location
              </h3>
            </div>

            <p className="text-sm font-medium leading-relaxed text-slate-700">
              {formatDeliveryLocation() || "-"}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN TRACKING GRID
          LEFT  = MAP + FORECAST/DELAY
          RIGHT = PROGRESSION LOG
      ========================================================= */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        {/* =======================================================
            LEFT SIDE — MAP + PREDICTIVE CARDS
        ======================================================= */}
        <div className="space-y-5 lg:col-span-2">
          {/* ================= LIVE ROUTE MAP ================= */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* MAP HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Navigation className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Live Route Map
                  </h2>

                  <p className="text-[11px] text-slate-500">
                    Pickup to delivery route with current location
                  </p>
                </div>
              </div>

              {location && (
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>

                  Signal Active
                </div>
              )}
            </div>

            {/* DISTANCE / TRAVEL TIME / ETA */}
            {!mapLoading && location && (
              <div className="grid grid-cols-1 divide-y divide-slate-100 border-b border-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {/* DISTANCE */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Distance
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {etaLoading
                        ? "Loading..."
                        : eta
                        ? `${eta.distanceKm} km`
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* TRAVEL TIME */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Travel Time
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {etaLoading
                        ? "Loading..."
                        : eta
                        ? eta.travelTime
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* ETA */}
                <div className="flex items-center gap-3 bg-emerald-50/40 px-4 py-3">
                  <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                    <TrendingUp className="h-4 w-4" />
                  </div>

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                      Estimated Arrival
                    </span>

                    <span className="text-sm font-bold text-emerald-700">
                      {etaLoading
                        ? "Loading..."
                        : eta
                        ? eta.estimatedArrival
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* GOOGLE MAP */}
            <div className="bg-slate-50 p-3">
              {mapLoading ? (
                <div className="flex h-[360px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

                  <p className="mt-3 text-xs font-medium text-slate-500">
                    Loading Google Map view...
                  </p>
                </div>
              ) : location ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-inner">
                  <GoogleShipmentMap
                    pickupLatitude={location.pickupLatitude}
                    pickupLongitude={location.pickupLongitude}
                    deliveryLatitude={location.deliveryLatitude}
                    deliveryLongitude={location.deliveryLongitude}
                    encodedPolyline={encodedPolyline}
                  />
                </div>
              ) : (
                <div className="flex h-[360px] w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center">
                  <MapPin className="h-8 w-8 text-slate-300" />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Current Location Unavailable
                  </p>

                  <p className="mt-1 max-w-xs text-xs text-slate-500">
                    No active GPS vector coordinate logs found for this
                    tracking session yet.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              DELIVERY FORECAST + DELAY ASSESSMENT
          ===================================================== */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* DELIVERY FORECAST */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Delivery Forecast
                  </h2>

                  <p className="text-[10px] text-slate-500">
                    Current ETA information
                  </p>
                </div>
              </div>

              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Estimated Arrival
                </span>

                <p className="mt-1 text-lg font-bold text-emerald-700">
                  {etaLoading
                    ? "Loading..."
                    : eta?.estimatedArrival || "-"}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="block text-[10px] text-slate-400">
                      Distance
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {eta ? `${eta.distanceKm} km` : "-"}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">
                      Travel Time
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {eta?.travelTime || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* DELAY ASSESSMENT */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <ShieldAlert className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Delay Assessment
                  </h2>

                  <p className="text-[10px] text-slate-500">
                    Prediction status
                  </p>
                </div>
              </div>

              <div className="flex min-h-[132px] items-center justify-center p-4 text-center">
                <div>
                  <ShieldAlert className="mx-auto h-7 w-7 text-slate-300" />

                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    Delay prediction unavailable
                  </p>

                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                    This Business Shipment Details page does not currently
                    request delay prediction data.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* =======================================================
            RIGHT SIDE — PROGRESSION LOG
        ======================================================= */}
        <aside className="lg:col-span-1">
          <div className="sticky top-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
              <h2 className="text-sm font-bold text-slate-900">
                Progression Log
              </h2>

              <p className="text-[11px] text-slate-500">
                Shipment checkpoint status
              </p>
            </div>

            <div className="p-5">
              {isCancelled ? (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-700">
                  <div className="shrink-0 rounded-lg bg-red-100 p-1.5 text-red-600">
                    <X className="h-4 w-4 stroke-[3]" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-800">
                      Shipment Cancelled
                    </p>

                    <p className="mt-0.5 text-xs text-red-600">
                      This order has been terminated.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative pl-7">
                  {/* VERTICAL STEP LINE */}
                  <div className="absolute bottom-2 left-[9px] top-2 w-[2px] bg-slate-200" />

                  {shipmentSteps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div
                        key={step}
                        className="relative mb-7 last:mb-0"
                      >
                        {/* STEP DOT */}
                        <div
                          className={`absolute -left-[25px] top-0.5 h-5 w-5 rounded-full border-2 transition-all ${
                            isCurrent
                              ? "border-emerald-600 bg-emerald-600 ring-4 ring-emerald-100"
                              : isCompleted
                              ? "border-emerald-600 bg-emerald-600"
                              : "border-slate-300 bg-white"
                          }`}
                        />

                        {/* STEP NAME */}
                        <p
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? "text-emerald-700"
                              : isCompleted
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {formatStatus(step)}
                        </p>

                        {/* ACTIVE CHECKPOINT */}
                        {isCurrent && (
                          <span className="mt-1 inline-block rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                            Active Checkpoint
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// ================= STATUS COLOR HELPER =================
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

export default BusinessShipmentDetails;