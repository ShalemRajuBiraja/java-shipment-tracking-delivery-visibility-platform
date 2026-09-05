import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Search,
} from "lucide-react";

// Import your history API
// import { getShipmentHistoryApi } from "../../services/shipmentService";

const ShipmentHistory = () => {

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchShipmentHistory = async () => {

  //   try {

  //     setLoading(true);

  //     const response = await getShipmentHistoryApi();

  //     if (response.data.success) {
  //       setShipments(response.data.data);
  //     }

  //   } catch (error) {

  //     console.error(
  //       "Error fetching shipment history:",
  //       error
  //     );

  //     setShipments([]);

  //   } finally {

  //     setLoading(false);

  //   }
  };


  useEffect(() => {

    fetchShipmentHistory();

  }, []);


  const filteredShipments = shipments.filter((shipment) =>
    shipment.trackingNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  const getStatusStyle = (status) => {

    if (status === "DELIVERED") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "IN_TRANSIT") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (status === "CREATED") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-slate-100 text-slate-600 border-slate-200";
  };


  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  if (loading) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading shipment history...
      </div>
    );
  }


  return (
    <div>

      {/* Header */}
      <div className="mb-5">

        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Shipment History
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          View and track all your previous shipments.
        </p>

      </div>


      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">

        <div className="relative max-w-md">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search by tracking number"
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />

        </div>

      </div>


      {/* Shipment List */}
      <div className="space-y-4">

        {filteredShipments.length === 0 ? (

          <div className="text-center py-10 text-slate-500">
            No shipments found.
          </div>

        ) : (

          filteredShipments.map((shipment) => (

            <div
              key={shipment.trackingNumber}
              className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5 hover:border-emerald-200 transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Tracking Information */}
                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">

                    <Package
                      size={20}
                      className="text-emerald-600"
                    />

                  </div>


                  <div>

                    <p className="font-semibold text-slate-800">
                      {shipment.trackingNumber}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Receiver: {shipment.receiverName || "-"}
                    </p>

                  </div>

                </div>


                {/* Destination */}
                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <MapPin
                    size={17}
                    className="text-emerald-600 shrink-0"
                  />

                  <span>
                    {shipment.deliveryAddress}
                  </span>

                </div>


                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <Calendar size={16} />

                  <span>
                    {formatDate(shipment.createdAt)}
                  </span>

                </div>


                {/* Status */}
                <span
                  className={`w-fit px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
                    shipment.status
                  )}`}
                >
                  {shipment.status?.replaceAll("_", " ")}
                </span>

              </div>

            </div>

          ))

        )}

      </div>


      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default ShipmentHistory;