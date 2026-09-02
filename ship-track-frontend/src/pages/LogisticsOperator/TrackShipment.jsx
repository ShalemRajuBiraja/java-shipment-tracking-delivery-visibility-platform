import { useState } from "react";
import { Search, Package, MapPin, Truck } from "lucide-react";

const TrackShipment = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    if (!shipmentId.trim()) {
      setError("Please enter a shipment ID.");
      setTrackingResult(null);
      return;
    }

    setError("");

    // Temporary frontend data
    setTrackingResult({
      id: shipmentId.toUpperCase(),
      status: "In Transit",
      origin: "Hyderabad",
      destination: "Bangalore",
      currentLocation: "Kurnool Distribution Center",
      estimatedDelivery: "04 September 2026",
    });
  };

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Track Shipment
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Enter a shipment ID to view its current tracking details.
        </p>
      </div>


      {/* Search Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">
            <Search
              size={22}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Search Shipment
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Use the shipment tracking ID to find details.
            </p>
          </div>

        </div>


        {/* Input */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Enter Shipment ID (Example: SHP001)"
            value={shipmentId}
            onChange={(event) => {
              setShipmentId(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleTrack();
              }
            }}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500"
          />

          <button
            onClick={handleTrack}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <Search size={18} />
            Track
          </button>

        </div>


        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

      </div>


      {/* Tracking Result */}
      {trackingResult && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Result Header */}
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-emerald-50 p-2">
                <Package
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Shipment Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Tracking ID: {trackingResult.id}
                </p>
              </div>

            </div>


            <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {trackingResult.status}
            </span>

          </div>


          {/* Tracking Information */}
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">

            {/* Origin */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <MapPin
                  size={18}
                  className="text-emerald-600"
                />

                <p className="text-xs text-slate-500">
                  Origin
                </p>

              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {trackingResult.origin}
              </p>

            </div>


            {/* Destination */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <MapPin
                  size={18}
                  className="text-red-500"
                />

                <p className="text-xs text-slate-500">
                  Destination
                </p>

              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {trackingResult.destination}
              </p>

            </div>


            {/* Current Location */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <Truck
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-xs text-slate-500">
                  Current Location
                </p>

              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {trackingResult.currentLocation}
              </p>

            </div>


            {/* Estimated Delivery */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <Package
                  size={18}
                  className="text-amber-600"
                />

                <p className="text-xs text-slate-500">
                  Estimated Delivery
                </p>

              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {trackingResult.estimatedDelivery}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default TrackShipment;