import { useState } from "react";
import { Search, Package, MapPin, Truck } from "lucide-react";

const ShipmentLookup = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!shipmentId.trim()) {
      setError("Please enter a shipment ID.");
      setResult(null);
      return;
    }

    setError("");

    // Temporary frontend data
    setResult({
      id: shipmentId.toUpperCase(),
      customer: "Rahul Kumar",
      status: "In Transit",
      origin: "Hyderabad",
      destination: "Bangalore",
      currentLocation: "Kurnool Distribution Center",
    });
  };

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Shipment Lookup
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Search shipment information to assist customers.
        </p>
      </div>


      {/* Search Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">
            <Search
              size={21}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Search Shipment
            </h2>

            <p className="text-xs text-slate-500">
              Enter shipment ID to view details.
            </p>
          </div>

        </div>


        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Enter Shipment ID"
            value={shipmentId}
            onChange={(event) => {
              setShipmentId(event.target.value);
              setError("");
            }}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Search size={18} />
            Search
          </button>

        </div>


        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

      </div>


      {/* Result */}
      {result && (

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-slate-200 p-5">

            <div className="rounded-lg bg-emerald-50 p-2">
              <Package
                size={21}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Shipment Details
              </h2>

              <p className="text-xs text-slate-500">
                Shipment ID: {result.id}
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">

            <div className="rounded-lg bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Customer
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {result.customer}
              </p>

            </div>


            <div className="rounded-lg bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {result.status}
              </p>

            </div>


            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />

                <p className="text-xs text-slate-500">
                  Origin
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {result.origin}
              </p>

            </div>


            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />

                <p className="text-xs text-slate-500">
                  Destination
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {result.destination}
              </p>

            </div>


            <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">

              <div className="flex items-center gap-2">
                <Truck size={17} className="text-blue-600" />

                <p className="text-xs text-slate-500">
                  Current Location
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {result.currentLocation}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ShipmentLookup;