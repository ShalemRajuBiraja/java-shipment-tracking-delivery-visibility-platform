import { useState } from "react";
import { Search, Package, MapPin } from "lucide-react";

const shipmentsData = [
  {
    id: "SHP001",
    customer: "ABC Logistics",
    origin: "Hyderabad",
    destination: "Bangalore",
    status: "In Transit",
  },
  {
    id: "SHP002",
    customer: "Global Traders",
    origin: "Chennai",
    destination: "Mumbai",
    status: "Delivered",
  },
  {
    id: "SHP003",
    customer: "Fast Freight",
    origin: "Delhi",
    destination: "Hyderabad",
    status: "Pending",
  },
  {
    id: "SHP004",
    customer: "Express Cargo",
    origin: "Mumbai",
    destination: "Pune",
    status: "In Transit",
  },
];

const OperatorShipments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShipments = shipmentsData.filter((shipment) =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          My Shipments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage shipments assigned to you.
        </p>
      </div>


      {/* Summary Card */}
      <div className="inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm">

        <div className="rounded-lg bg-emerald-50 p-2">
          <Package
            size={22}
            className="text-emerald-600"
          />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Assigned Shipments
          </p>

          <p className="text-lg font-semibold text-slate-800">
            {shipmentsData.length}
          </p>
        </div>

      </div>


      {/* Shipments Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-slate-800">
              Shipment List
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Monitor your assigned shipments.
            </p>
          </div>


          {/* Search */}
          <div className="relative w-full sm:w-64">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search shipments..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500"
            />

          </div>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Shipment ID
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Route
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>
              </tr>

            </thead>


            <tbody>

              {filteredShipments.map((shipment) => (

                <tr
                  key={shipment.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                    {shipment.id}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-700">
                    {shipment.customer}
                  </td>


                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <MapPin
                        size={16}
                        className="text-emerald-600"
                      />

                      <span>
                        {shipment.origin}
                      </span>

                      <span className="text-slate-400">
                        →
                      </span>

                      <span>
                        {shipment.destination}
                      </span>

                    </div>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* Empty State */}
          {filteredShipments.length === 0 && (

            <div className="py-10 text-center">

              <Package
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm text-slate-500">
                No shipments found.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default OperatorShipments;