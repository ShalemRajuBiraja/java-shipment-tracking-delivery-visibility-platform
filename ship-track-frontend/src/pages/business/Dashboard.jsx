import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Shipments",
      value: "120",
      icon: "🚚",
      bgColor: "bg-green-50",
    },
    {
      title: "In Transit",
      value: "45",
      icon: "🚚",
      bgColor: "bg-green-50",
    },
    {
      title: "Delivered",
      value: "70",
      icon: "✓",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Delayed",
      value: "5",
      icon: "!",
      bgColor: "bg-red-50",
    },
  ];

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
    <div className="min-h-screen bg-white">

      {/* Main Layout */}
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-60 flex-shrink-0 bg-[#07835f] text-white md:block">

          {/* Logo */}
          <div className="flex h-24 items-center border-b border-white/10 px-6">

            <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-400 text-xl">
              🚚
            </div>

            <h1 className="text-xl font-bold">
              ShipTrack
            </h1>

          </div>

          {/* Navigation */}
          <nav className="p-4">

            {/* Dashboard */}
            <button
              onClick={() => navigate("/business/dashboard")}
              className="mb-2 flex w-full items-center rounded-lg bg-white px-4 py-3 text-left text-[#07835f]"
            >
              <span className="mr-3 text-xl">
                ⌂
              </span>

              <span>
                Dashboard
              </span>
            </button>

            {/* Shipments */}
            <button
              onClick={() => navigate("/business/shipments")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                📦
              </span>

              <span>
                Shipments
              </span>
            </button>

            {/* Track Shipment */}
            <button
              onClick={() => navigate("/business/shipments")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ⌖
              </span>

              <span>
                Track Shipment
              </span>
            </button>

            {/* Orders */}
            <button
              onClick={() => navigate("/business/orders")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ▣
              </span>

              <span>
                Orders
              </span>
            </button>

            {/* Clients */}
            <button
              onClick={() => navigate("/business/clients")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ♧
              </span>

              <span>
                Clients
              </span>
            </button>

            {/* Reports */}
            <button
              onClick={() => navigate("/business/reports")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ▥
              </span>

              <span>
                Reports
              </span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate("/business/settings")}
              className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ⚙
              </span>

              <span>
                Settings
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
            >
              <span className="mr-3 text-xl">
                ↪
              </span>

              <span>
                Logout
              </span>
            </button>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">

          {/* Header */}
          <header className="flex h-24 items-center justify-between border-b border-gray-200 bg-white px-6">

            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>

            {/* User Information */}
            <div className="flex items-center">

              <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-xl">
                👤
              </div>

              <div className="hidden sm:block">

                <p className="text-sm font-bold text-gray-900">
                  John Doe
                </p>

                <p className="text-xs text-gray-500">
                  Business Client
                </p>

              </div>

              <span className="ml-3 text-gray-500">
                ⌄
              </span>

            </div>

          </header>

          {/* Dashboard Content */}
          <div className="bg-gray-50 p-5 md:p-8">

            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => (

                <div
                  key={stat.title}
                  className="flex items-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >

                  {/* Stat Icon */}
                  <div
                    className={`mr-5 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor} text-2xl`}
                  >
                    {stat.icon}
                  </div>

                  {/* Stat Details */}
                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Recent Shipments Card */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* Card Header */}
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

              {/* Table */}
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

                        {/* Tracking ID */}
                        <td className="px-6 py-5 text-sm font-bold text-[#07835f]">
                          {shipment.id}
                        </td>

                        {/* Client */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {shipment.client}
                        </td>

                        {/* From */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {shipment.from}
                        </td>

                        {/* To */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {shipment.to}
                        </td>

                        {/* Status */}
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

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-gray-600">
                          {shipment.date}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* Table Footer */}
              <div className="border-t border-gray-200 px-6 py-5">

                <button
                  onClick={() => navigate("/business/shipments")}
                  className="text-sm font-semibold text-[#07835f] hover:text-[#056548]"
                >
                  View All Shipments
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;
