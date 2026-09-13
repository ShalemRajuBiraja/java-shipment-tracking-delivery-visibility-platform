import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

import TrackingProgress from "./TrackingProgress";
import ShipmentDetails from "./ShipmentDetails";
import GoogleShipmentMap from "../../components/GoogleShipmentMap";

import {
  trackShipmentApi
} from "../../services/shipmentService";
import { getLatestShipmentLocation, getShipmentRoute } from "../../services/operatorService";

const ShipmentTracking = () => {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);
  const [location, setLocation] = useState(null);
  const [encodedPolyline, setEncodedPolyline] = useState(null);

  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        setLoading(true);

        // ==========================================
        // 1. GET SHIPMENT DETAILS
        // ==========================================
        const shipmentResponse =
          await trackShipmentApi(trackingNumber);

        if (shipmentResponse.data.success !== true) {
          setShipment(null);

          toast.error(
            shipmentResponse.data.message ||
              "Shipment not found."
          );

          return;
        }

        const shipmentData = shipmentResponse.data.data;

        setShipment(shipmentData);

        // ==========================================
        // 2. GET LATEST SHIPMENT LOCATION
        // ==========================================
        setMapLoading(true);

        try {
          const locationResponse =
            await getLatestShipmentLocation(
              trackingNumber
            );

          setLocation(locationResponse.data);
        } catch (locationError) {
          console.error(
            "Error fetching shipment location:",
            locationError
          );

          setLocation(null);

          // Do not show a blocking error.
          // Shipment details can still be displayed.
          console.warn(
            "No current shipment location available."
          );
        }

        // ==========================================
        // 3. GET PLANNED ROUTE
        // ==========================================
        try {
          const routeResponse =
            await getShipmentRoute(
              shipmentData.pickupAddress,
              shipmentData.deliveryAddress
            );

          const routes =
            routeResponse.data?.routes;

          const polyline =
            routes?.[0]?.polyline?.encodedPolyline;

          if (polyline) {
            setEncodedPolyline(polyline);
          } else {
            setEncodedPolyline(null);

            console.warn(
              "No encoded polyline returned from route API."
            );
          }
        } catch (routeError) {
          console.error(
            "Error fetching shipment route:",
            routeError
          );

          setEncodedPolyline(null);
        }
      } catch (error) {
        console.error(
          "Error fetching shipment:",
          error
        );

        setShipment(null);

        toast.error(
          error.response?.data?.message ||
            "Unable to load shipment details."
        );
      } finally {
        setLoading(false);
        setMapLoading(false);
      }
    };

    if (trackingNumber) {
      fetchShipmentData();
    }
  }, [trackingNumber]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="text-sm text-slate-500">
            Loading shipment details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // SHIPMENT NOT FOUND
  // ==========================================

  if (!shipment) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-800">
          Shipment Not Found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We could not find the shipment associated
          with this tracking number.
        </p>

        <button
          onClick={() =>
            navigate("/customer/dashboard")
          }
          className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Shipment Tracking
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your shipment and view complete
            shipment details.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/customer/dashboard")
          }
          className="flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={17} />

          Back to Dashboard
        </button>
      </div>

      {/* ================= TRACKING PROGRESS ================= */}

      <TrackingProgress shipment={shipment} />

      {/* ================= SHIPMENT MAP ================= */}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Live Shipment Location
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current shipment position and planned
            delivery route.
          </p>
        </div>

        {mapLoading ? (
          <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

              <p className="text-sm text-slate-500">
                Loading map...
              </p>
            </div>
          </div>
        ) : location ? (
          <GoogleShipmentMap
            latitude={location.latitude}
            longitude={location.longitude}
            encodedPolyline={encodedPolyline}
          />
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">
            <div className="text-center px-6">
              <p className="text-sm font-semibold text-slate-700">
                Current location unavailable
              </p>

              <p className="mt-1 text-xs text-slate-500">
                No location has been recorded for this
                shipment yet.
              </p>
            </div>
          </div>
        )}

      </section>

      {/* ================= SHIPMENT DETAILS ================= */}

      <ShipmentDetails shipment={shipment} />

    </div>
  );
};

export default ShipmentTracking;