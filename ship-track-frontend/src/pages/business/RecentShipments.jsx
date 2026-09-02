import { useNavigate } from "react-router-dom";

const RecentShipments = () => {
  const navigate = useNavigate();

  const recentShipments = [
    {
      id: "TRK1001",
      client: "ABC Pvt Ltd",
      from: "Mumbai",
      to: "Delhi",
      status: "Delivered",
      date: "28 May 2024",
    },
    {
      id: "TRK1002",
      client: "XYZ Exports",
      from: "Chennai",
      to: "Bangalore",
      status: "In Transit",
      date: "28 May 2024",
    },
    {
      id: "TRK1003",
      client: "Global Store",
      from: "Kolkata",
      to: "Hyderabad",
      status: "Pending",
      date: "27 May 2024",
    },
    {
      id: "TRK1004",
      client: "Tech Solutions",
      from: "Pune",
      to: "Ahmedabad",
      status: "Delayed",
      date: "27 May 2024",
    },
    {
      id: "TRK1005",
      client: "Sunrise Ltd",
      from: "Delhi",
      to: "Jaipur",
      status: "In Transit",
      date: "26 May 2024",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900">
          Recent Shipments
        </h2>

        <button
          onClick={() => navigate("/business/shipments")}
          className="text-sm font-semibold text-[#07835f] hover:text-[#056548]"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Tracking ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Client
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                From
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                To
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {recentShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-t border-gray-100 hover:bg-green-50"
              >
                <td className="px-6 py-5 text-sm font-bold text-[#07835f]">
                  {shipment.id}
                </td>

                <td className="px-6 py-5 text-sm text-gray-700">
                  {shipment.client}
                </td>

                <td className="px-6 py-5 text-sm text-gray-700">
                  {shipment.from}
                </td>

                <td className="px-6 py-5 text-sm text-gray-700">
                  {shipment.to}
                </td>

                <td className="px-6 py-5">
                  {shipment.status === "Delivered" && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Delivered
                    </span>
                  )}

                  {shipment.status === "In Transit" && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      In Transit
                    </span>
                  )}

                  {shipment.status === "Pending" && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      Pending
                    </span>
                  )}

                  {shipment.status === "Delayed" && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Delayed
                    </span>
                  )}
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">
                  {shipment.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 px-6 py-5">
        <button
          onClick={() => navigate("/business/shipments")}
          className="text-sm font-semibold text-[#07835f] hover:text-[#056548]"
        >
          View All Shipments
        </button>
      </div>
    </div>
  );
};

export default RecentShipments;