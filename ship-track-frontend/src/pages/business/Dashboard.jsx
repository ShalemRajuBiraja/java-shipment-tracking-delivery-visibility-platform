import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Shipments",
      value: "248",
      icon: "📦",
      description: "All shipments",
    },
    {
      title: "In Transit",
      value: "86",
      icon: "🚚",
      description: "Currently moving",
    },
    {
      title: "Delivered",
      value: "142",
      icon: "✅",
      description: "Successfully delivered",
    },
    {
      title: "Pending",
      value: "20",
      icon: "⏳",
      description: "Waiting for pickup",
    },
  ];

  const recentShipments = [
    {
      id: "ST-2026-001",
      receiver: "Rahul Kumar",
      destination: "Bangalore",
      status: "Delivered",
      date: "28 Aug 2026",
    },
    {
      id: "ST-2026-002",
      receiver: "Priya Sharma",
      destination: "Mumbai",
      status: "In Transit",
      date: "28 Aug 2026",
    },
    {
      id: "ST-2026-003",
      receiver: "Amit Singh",
      destination: "Delhi",
      status: "Pending",
      date: "27 Aug 2026",
    },
    {
      id: "ST-2026-004",
      receiver: "Sneha Das",
      destination: "Kolkata",
      status: "Delivered",
      date: "27 Aug 2026",
    },
    {
      id: "ST-2026-005",
      receiver: "Arjun Patel",
      destination: "Chennai",
      status: "In Transit",
      date: "26 Aug 2026",
    },
  ];

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "In Transit":
        return "info";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Business Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your shipments and track delivery progress.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/business/create-shipment")}
        >
          + Create Shipment
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                {stat.icon}
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            size="sm"
            onClick={() => navigate("/business/create-shipment")}
          >
            + Create Shipment
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/business/shipments")}
          >
            View Shipments
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate("/business/shipments")}
          >
            Track Shipment
          </Button>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Shipments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest shipment activity
            </p>
          </div>

          <button
            onClick={() => navigate("/business/shipments")}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Shipment ID</th>
                <th className="px-5 py-4">Receiver</th>
                <th className="px-5 py-4">Destination</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                    {shipment.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {shipment.receiver}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {shipment.destination}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={getBadgeVariant(shipment.status)}>
                      {shipment.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {shipment.date}
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

export default Dashboard;
