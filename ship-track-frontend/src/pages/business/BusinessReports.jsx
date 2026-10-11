import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Clock,
  PackageCheck,
  Calendar,
  Loader2,
} from "lucide-react";

const BusinessReports = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH REAL SHIPMENT DATA =================

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:8080/api/get-shipments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch shipment data");
        }

        const result = await response.json();

        // Backend response structure:
        // {
        //   success: true,
        //   message: "...",
        //   data: [...]
        // }

        const shipmentData = Array.isArray(result.data)
          ? result.data
          : [];

        setDeliveries(shipmentData);
      } catch (err) {
        console.error("Error fetching shipment report:", err);
        setError(
          "Unable to load shipment data. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  // ================= DATE FILTER =================

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((shipment) => {
      if (!shipment.createdAt) {
        return false;
      }

      const shipmentDate = new Date(shipment.createdAt);

      const from = fromDate
        ? new Date(`${fromDate}T00:00:00`)
        : null;

      const to = toDate
        ? new Date(`${toDate}T23:59:59`)
        : null;

      if (from && shipmentDate < from) {
        return false;
      }

      if (to && shipmentDate > to) {
        return false;
      }

      return true;
    });
  }, [deliveries, fromDate, toDate]);

  // ================= DELIVERY STATUS LOGIC =================

  const isOnTime = (shipment) => {
    if (
      shipment.status !== "DELIVERED" ||
      !shipment.expectedDeliveryAt ||
      !shipment.updatedAt
    ) {
      return false;
    }

    const actualDeliveryTime = new Date(shipment.updatedAt);
    const expectedDeliveryTime = new Date(
      shipment.expectedDeliveryAt
    );

    return actualDeliveryTime <= expectedDeliveryTime;
  };

  const isDelayed = (shipment) => {
    // Explicit delayed status
    if (shipment.status === "DELAYED") {
      return true;
    }

    // Delivered after expected delivery time
    if (
      shipment.status === "DELIVERED" &&
      shipment.expectedDeliveryAt &&
      shipment.updatedAt
    ) {
      const actualDeliveryTime = new Date(shipment.updatedAt);
      const expectedDeliveryTime = new Date(
        shipment.expectedDeliveryAt
      );

      return actualDeliveryTime > expectedDeliveryTime;
    }

    return false;
  };

  const onTimeCount = filteredDeliveries.filter(
    (shipment) => isOnTime(shipment)
  ).length;

  const delayedCount = filteredDeliveries.filter(
    (shipment) => isDelayed(shipment)
  ).length;

  const completedCount = filteredDeliveries.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;

  // ================= REPORT CARDS =================

  const reports = [
    {
      title: "On-Time Deliveries",
      value: onTimeCount,
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Delayed Deliveries",
      value: delayedCount,
      icon: Clock,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Completed Deliveries",
      value: completedCount,
      icon: PackageCheck,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  // ================= STATUS DISPLAY =================

  const getDisplayStatus = (shipment) => {
    if (isOnTime(shipment)) {
      return "On-Time";
    }

    if (isDelayed(shipment)) {
      return "Delayed";
    }

    if (shipment.status === "DELIVERED") {
      return "Completed";
    }

    return shipment.status
      ? shipment.status.replaceAll("_", " ")
      : "Unknown";
  };

  const getStatusClass = (shipment) => {
    const status = getDisplayStatus(shipment);

    if (status === "On-Time") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Delayed") {
      return "bg-red-50 text-red-700";
    }

    if (status === "Completed") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  // ================= CLEAR FILTER =================

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="p-5 md:p-7 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Delivery Performance Report
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Track on-time, delayed, and completed deliveries.
        </p>
      </div>

      {/* Date Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">

        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-emerald-600" />

          <h2 className="font-semibold text-slate-800">
            Filter by Date
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Clear Filter */}
          <button
            onClick={clearFilters}
            className="bg-slate-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-700"
          >
            Clear Filter
          </button>

        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            <span>Loading shipment data...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      {/* Report Cards */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

            {reports.map((report) => {
              const Icon = report.icon;

              return (
                <div
                  key={report.title}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        {report.title}
                      </p>

                      <h2 className="text-3xl font-bold text-slate-800 mt-2">
                        {report.value}
                      </h2>
                    </div>

                    <div
                      className={`p-3 ${report.iconBg} rounded-lg`}
                    >
                      <Icon
                        size={24}
                        className={report.iconColor}
                      />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Delivery Performance Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Delivery Performance
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Delivery status based on the selected date range.
              </p>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50">
                  <tr>

                    <th className="text-left px-5 py-3 font-semibold text-slate-600">
                      Shipment ID
                    </th>

                    <th className="text-left px-5 py-3 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-5 py-3 font-semibold text-slate-600">
                      Delivery Date
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredDeliveries.length > 0 ? (

                    filteredDeliveries.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="border-t border-slate-100"
                      >

                        <td className="px-5 py-4 font-medium text-slate-800">
                          {shipment.trackingNumber || shipment.id}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                              shipment
                            )}`}
                          >
                            {getDisplayStatus(shipment)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {shipment.updatedAt
                            ? new Date(
                                shipment.updatedAt
                              ).toLocaleDateString()
                            : shipment.createdAt
                            ? new Date(
                                shipment.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                      </tr>
                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan="3"
                        className="px-5 py-8 text-center text-slate-500"
                      >
                        No deliveries found for the selected date range.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default BusinessReports;