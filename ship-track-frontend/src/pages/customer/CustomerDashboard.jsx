import { useState } from "react";
import { toast } from "react-toastify";

import DashboardHeader from "./DashboardHeader";
import ShipmentDetails from "./ShipmentDetails";
import TrackingProgress from "./TrackingProgress";
import { trackShipmentApi } from "../../services/shipmentService";

const CustomerDashboard = () => {

  // Input state
  const [trackingNumber, setTrackingNumber] = useState("");

  // Complete shipment tracking data
  const [shipment, setShipment] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);


  const handleTrackShipment = async () => {

    // Validation
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number.");
      return;
    }

    try {

      setLoading(true);

      const response = await trackShipmentApi(
        trackingNumber.trim()
      );

      if (response.data.success === true) {

        // Backend response:
        // response.data.data = TrackingResponseDto

        setShipment(response.data.data);

        toast.success("Shipment found successfully!");

      } else {

        setShipment(null);

        toast.error(
          response.data.message ||
          "Shipment not found."
        );
      }

    } catch (error) {

      console.error(
        "Error tracking shipment:",
        error
      );

      setShipment(null);

      toast.error(
        error.response?.data?.message ||
        "Shipment not found. Please check the tracking number."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <>

      <DashboardHeader />

      {/* Tracking Search */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5 mb-4">

        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Track Your Shipment
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(e.target.value)
            }
            placeholder="Enter Tracking Number (e.g., TRK1234567890)"
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          <button
            onClick={handleTrackShipment}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-lg transition"
          >

            {loading ? "Tracking..." : "Track Shipment"}

          </button>

        </div>

      </section>


      {/* Show shipment details only after successful tracking */}
      {shipment && (
        <>

          <TrackingProgress shipment={shipment} />

          <ShipmentDetails shipment={shipment} />

        </>
      )}


      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </>
  );
};

export default CustomerDashboard;