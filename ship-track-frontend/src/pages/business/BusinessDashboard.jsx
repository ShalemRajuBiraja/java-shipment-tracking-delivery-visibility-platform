import {
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

const BusinessDashboard = () => {

  const stats = [
    {
      title: "Total Shipments",
      value: "248",
      icon: Package,
      description: "All business shipments",
    },
    {
      title: "In Transit",
      value: "64",
      icon: Truck,
      description: "Currently moving",
    },
    {
      title: "Delivered",
      value: "162",
      icon: CheckCircle,
      description: "Successfully delivered",
    },
    {
      title: "Pending",
      value: "22",
      icon: Clock,
      description: "Waiting for processing",
    },
  ];

  const recentShipments = [
    {
      id: "BUS-1001",
      destination: "Bangalore",
      status: "In Transit",
    },
    {
      id: "BUS-1002",
      destination: "Mumbai",
      status: "Delivered",
    },
    {
      id: "BUS-1003",
      destination: "Chennai",
      status: "Pending",
    },
    {
      id: "BUS-1004",
      destination: "Delhi",
      status: "Delivered",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Transit") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-5 md:p-7">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Business Client Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Overview of your company's shipments.
        </p>

      </div>


      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800 mt-1">
                    {stat.value}
                  </h2>
                </div>

                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Icon
                    size={22}
                    className="text-emerald-600"
                  />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-3">
                {stat.description}
              </p>

            </div>
          );
        })}

      </div>


      {/* Recent Shipments */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm mt-6">

        <div className="px-5 py-4 border-b border-slate-100">

          <h2 className="font-semibold text-slate-800">
            Recent Shipments
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest shipments created by your business.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500">

              <tr>
                <th className="text-left px-5 py-3">
                  Shipment ID
                </th>

                <th className="text-left px-5 py-3">
                  Destination
                </th>

                <th className="text-left px-5 py-3">
                  Status
                </th>
              </tr>

            </thead>


            <tbody>

              {recentShipments.map((shipment) => (

                <tr
                  key={shipment.id}
                  className="border-t border-slate-100"
                >

                  <td className="px-5 py-4 font-medium text-emerald-600">
                    {shipment.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {shipment.destination}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
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

        </div>

      </div>

    </div>
  );
};

export default BusinessDashboard;