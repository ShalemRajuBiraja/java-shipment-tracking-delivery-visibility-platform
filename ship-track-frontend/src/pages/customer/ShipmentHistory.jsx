import {
  Package,
  MapPin,
  Calendar,
  Search,
} from "lucide-react";

const ShipmentHistory = () => {
  const shipments = [
    {
      trackingNumber: "TRK1234567890",
      receiver: "Ramesh Kumar",
      destination: "Vijayawada, Andhra Pradesh",
      date: "30 Aug 2026",
      status: "On Going",
    },
    {
      trackingNumber: "TRK9876543210",
      receiver: "Suresh Kumar",
      destination: "Hyderabad, Telangana",
      date: "25 Aug 2026",
      status: "Delivered",
    },
    {
      trackingNumber: "TRK4567891230",
      receiver: "Anil Kumar",
      destination: "Bangalore, Karnataka",
      date: "20 Aug 2026",
      status: "Delivered",
    },
    {
      trackingNumber: "TRK7891234560",
      receiver: "Rajesh Kumar",
      destination: "Chennai, Tamil Nadu",
      date: "15 Aug 2026",
      status: "Delivered",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "On Going") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-slate-100 text-slate-600 border-slate-200";
  };

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
            placeholder="Search by tracking number"
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />

        </div>

      </div>


      {/* Shipment List */}
      <div className="space-y-4">

        {shipments.map((shipment) => (

          <div
            key={shipment.trackingNumber}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5 hover:border-emerald-200 transition"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* Shipment Information */}
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
                    Receiver: {shipment.receiver}
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
                  {shipment.destination}
                </span>

              </div>


              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-slate-500">

                <Calendar size={16} />

                <span>
                  {shipment.date}
                </span>

              </div>


              {/* Status */}
              <span
                className={`w-fit px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
                  shipment.status
                )}`}
              >
                {shipment.status}
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default ShipmentHistory;