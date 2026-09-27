import { Package, Users, Truck, AlertTriangle } from "lucide-react";


import { useEffect, useState,} from "react";

import { useNavigate,} from "react-router-dom";

import { getAdminDashboardStatsApi } from "../../services/adminService";


const DashboardStats = () => {

  const navigate = useNavigate();


  const [stats, setStats] = useState({
  totalShipments: 0,
  totalUsers: 0,
  deliveredShipments: 0,
  delayedShipments: 0,
  inTransitShipments: 0,
});


  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const chartData = [
  {
    name: "Delivered",
    count: stats.deliveredShipments,
  },
  {
    name: "In Transit",
    count: stats.inTransitShipments,
  },
  {
    name: "Delayed",
    count: stats.delayedShipments,
  },
];

  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const response = await getAdminDashboardStatsApi();
        console.log( "Dashboard Stats:", response.data.data );


        if (response.data.success === true) {
          setStats(
           response.data.data
          );

        }

      } catch (error) {

        console.error(
          "Error fetching dashboard statistics:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboardStats();

  }, []);


  return (

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


      {/* Total Shipments */}

      <div
        onClick={() =>
          navigate("/admin/shipments")
        }
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 cursor-pointer hover:border-emerald-400 hover:shadow-md transition"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Total Shipments
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">

              {loading
                ? "Loading..."
                : stats.totalShipments}

            </h2>

          </div>


          <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">

            <Package
              size={22}
              className="text-emerald-600"
            />

          </div>

        </div>

      </div>
      {/* Delivered Shipments */}

<div
  className="bg-white border border-slate-200 rounded-xl shadow-sm p-5"
>
  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm text-slate-500">
        Delivered Shipments
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-1">
        {loading
          ? "Loading..."
          : stats.deliveredShipments}
      </h2>
    </div>

    <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">
      <Truck
        size={22}
        className="text-emerald-600"
      />
    </div>

  </div>
</div>

{/* In Transit Shipments */}

<div
  className="bg-white border border-slate-200 rounded-xl shadow-sm p-5"
>
  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm text-slate-500">
        In Transit Shipments
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-1">
        {loading
          ? "Loading..."
          : stats.inTransitShipments}
      </h2>
    </div>

    <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">
      <Truck
        size={22}
        className="text-emerald-600"
      />
    </div>

  </div>
</div>

{/* Delayed Shipments */}

<div
  className="bg-white border border-slate-200 rounded-xl shadow-sm p-5"
>
  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm text-slate-500">
        Delayed Shipments
      </p>

      <h2 className="text-2xl font-bold text-slate-800 mt-1">
        {loading
          ? "Loading..."
          : stats.delayedShipments}
      </h2>
    </div>

    <div className="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center">
      <AlertTriangle
        size={22}
        className="text-red-600"
      />
    </div>

  </div>
</div>


      {/* Total Users */}

      <div
        onClick={() =>
          navigate("/admin/users")
        }
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 cursor-pointer hover:border-emerald-400 hover:shadow-md transition"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Total Users
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">

              {loading
                ? "Loading..."
                : stats.totalUsers}

            </h2>

          </div>


          <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">

            <Users
              size={22}
              className="text-emerald-600"
            />

          </div>

        </div>

      </div>

{/* Shipment Analytics Chart */}

<div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-4">

  <h2 className="text-lg font-semibold text-slate-800 mb-5">
    Shipment Analytics
  </h2>

  <div className="grid grid-cols-3 gap-8 items-end h-64">

    {/* Delivered */}
    <div className="flex flex-col items-center justify-end h-full">
      <span className="text-sm font-semibold text-slate-700 mb-2">
        {stats.deliveredShipments}
      </span>

      <div
        className="w-20 bg-emerald-500 rounded-t-lg"
        style={{
          height: `${Math.max(stats.deliveredShipments * 60, 10)}px`
        }}
      ></div>

      <span className="text-sm text-slate-600 mt-3">
        Delivered
      </span>
    </div>

    {/* In Transit */}
    <div className="flex flex-col items-center justify-end h-full">
      <span className="text-sm font-semibold text-slate-700 mb-2">
        {stats.inTransitShipments}
      </span>

      <div
        className="w-20 bg-blue-500 rounded-t-lg"
        style={{
          height: `${Math.max(stats.inTransitShipments * 60, 10)}px`
        }}
      ></div>

      <span className="text-sm text-slate-600 mt-3">
        In Transit
      </span>
    </div>

    {/* Delayed */}
    <div className="flex flex-col items-center justify-end h-full">
      <span className="text-sm font-semibold text-slate-700 mb-2">
        {stats.delayedShipments}
      </span>

      <div
        className="w-20 bg-red-500 rounded-t-lg"
        style={{
          height: `${Math.max(stats.delayedShipments * 60, 10)}px`
        }}
      ></div>

      <span className="text-sm text-slate-600 mt-3">
        Delayed
      </span>
    </div>

  </div>

</div>

{/* Shipment Status Chart */}

{/* Shipment Status Chart */}

<div className="mb-4 flex justify-end">

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700"
  >
    <option value="ALL">All Statuses</option>
    <option value="DELIVERED">Delivered</option>
    <option value="IN_TRANSIT">In Transit</option>
    <option value="DELAYED">Delayed</option>
  </select>

</div>
<div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-5">

  <h2 className="text-lg font-semibold text-slate-800 mb-5">
    Shipment Status Overview
  </h2>

  <div className="space-y-4">

    {/* Delivered */}
{(statusFilter === "ALL" || statusFilter === "DELIVERED") && (
  <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-600">
          Delivered
        </span>

        <span className="text-sm font-semibold text-slate-800">
          {stats.deliveredShipments}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-3">
        <div
          className="bg-emerald-500 h-3 rounded-full"
          style={{
            width: `${
              stats.totalShipments > 0
                ? (stats.deliveredShipments / stats.totalShipments) * 100
                : 0
            }%`,
          }}
        ></div>
      </div>
    </div>
)}

    {/* In Transit */}
{(statusFilter === "ALL" || statusFilter === "IN_TRANSIT") && (
  <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-600">
          In Transit
        </span>

        <span className="text-sm font-semibold text-slate-800">
          {stats.inTransitShipments}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{
            width: `${
              stats.totalShipments > 0
                ? (stats.inTransitShipments / stats.totalShipments) * 100
                : 0
            }%`,
          }}
        ></div>
      </div>
    </div>
)}

    {/* Delayed */}
{(statusFilter === "ALL" || statusFilter === "DELAYED") && (
  <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-600">
          Delayed
        </span>

        <span className="text-sm font-semibold text-slate-800">
          {stats.delayedShipments}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-3">
        <div
          className="bg-red-500 h-3 rounded-full"
          style={{
            width: `${
              stats.totalShipments > 0
                ? (stats.delayedShipments / stats.totalShipments) * 100
                : 0
            }%`,
          }}
        ></div>
      </div>
    </div>
)}

  </div>
</div>
    </section>

  );

};


export default DashboardStats;