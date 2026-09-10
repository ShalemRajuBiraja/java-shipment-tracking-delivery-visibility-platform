
import { useState, useEffect } from "react";

import {
  Search,
  Package,
  MapPin,
  Truck,
} from "lucide-react";

import { supportShipmentLookupApi } from "../../services/shipmentService";



const ShipmentLookup = () => {

  const [shipmentId, setShipmentId] = useState("");

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [recentShipments, setRecentShipments] = useState([]);


  // Load recent shipments and remove expired records
  useEffect(() => {

    const storedShipments =
      JSON.parse(
        localStorage.getItem("supportRecentShipments")
      ) || [];

    const now = new Date().getTime();


    // Keep only shipments searched within last 24 hours
    const validShipments = storedShipments.filter((item) => {

      const searchedTime =
        new Date(item.trackedAt).getTime();

      const timeDifference =
        now - searchedTime;

      return timeDifference < 24 * 60 * 60 * 1000;

    });


    // Update localStorage
    localStorage.setItem(
      "supportRecentShipments",
      JSON.stringify(validShipments)
    );


    setRecentShipments(validShipments);

  }, []);


  // Save shipment in recent searches
  const saveRecentShipment = (shipmentData) => {

    const newShipment = {

      trackingNumber: shipmentData.trackingNumber,

      customer: shipmentData.customer,

      status: shipmentData.status,

      origin: shipmentData.origin,

      destination: shipmentData.destination,

      trackedAt: new Date().toISOString(),

    };


    // Remove duplicate
    const filteredShipments =
      recentShipments.filter(
        (item) =>
          item.trackingNumber !==
          shipmentData.trackingNumber
      );


    // Add newest first and keep maximum 5
    const updatedShipments = [
      newShipment,
      ...filteredShipments,
    ].slice(0, 5);


    // Save to localStorage
    localStorage.setItem(
      "supportRecentShipments",
      JSON.stringify(updatedShipments)
    );


    setRecentShipments(updatedShipments);

  };


  const handleSearch = async (
    trackingNo = shipmentId
  ) => {

    const trimmedTrackingNumber =
      trackingNo.trim();


    if (!trimmedTrackingNumber) {

      setError(
        "Please enter a shipment tracking number."
      );

      setResult(null);

      return;

    }


    try {

      setLoading(true);

      setError("");

      setResult(null);


      const response =
        await supportShipmentLookupApi(
          trimmedTrackingNumber
        );


      if (response.data.success === true) {

        setResult(response.data.data);

        saveRecentShipment(response.data.data);

      } else {

        setResult(null);

        setError(
          response.data.message ||
          "Shipment not found."
        );

      }

    } catch (error) {

      console.error(
        "Error searching shipment:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Shipment not found."
      );

    } finally {

      setLoading(false);

    }

  };


  // Click recent shipment
  const handleSelectRecentShipment = (
    trackingNo
  ) => {

    setShipmentId(trackingNo);

    handleSearch(trackingNo);

  };


  // Format status
  const formatStatus = (status) => {

    if (!status) return "-";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );

  };


  return (

    <div className="space-y-5">


      {/* Page Header */}
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
              Enter tracking number to view details.
            </p>

          </div>

        </div>


        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Enter Tracking Number"
            value={shipmentId}
            onChange={(event) => {

              setShipmentId(event.target.value);

              setError("");

            }}
            onKeyDown={(event) => {

              if (event.key === "Enter") {
                handleSearch();
              }

            }}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
          />


          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Search size={18} />

            {loading
              ? "Searching..."
              : "Search"
            }

          </button>

        </div>


        {error && (

          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>

        )}

      </div>


      {/* Recent Shipments */}
      {/* <SupportRecentShipments
        recentShipments={recentShipments}
        onSelectShipment={
          handleSelectRecentShipment
        }
      /> */}


      {/* Search Result */}
      {result && (

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">


          {/* Result Header */}
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
                Tracking Number: {result.trackingNumber}
              </p>

            </div>

          </div>


          {/* Details */}
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">


            {/* Customer */}
            <div className="rounded-lg bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Customer
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {result.customer}
              </p>

            </div>


            {/* Status */}
            <div className="rounded-lg bg-slate-50 p-4">

              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {formatStatus(result.status)}
              </p>

            </div>


            {/* Origin */}
            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <MapPin
                  size={16}
                  className="text-emerald-600"
                />

                <p className="text-xs text-slate-500">
                  Origin
                </p>

              </div>


              <p className="mt-2 text-sm font-semibold text-slate-800">
                {result.origin}
              </p>

            </div>


            {/* Destination */}
            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <MapPin
                  size={16}
                  className="text-red-500"
                />

                <p className="text-xs text-slate-500">
                  Destination
                </p>

              </div>


              <p className="mt-2 text-sm font-semibold text-slate-800">
                {result.destination}
              </p>

            </div>


            {/* Current Location */}
            <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">

              <div className="flex items-center gap-2">

                <Truck
                  size={17}
                  className="text-blue-600"
                />

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

