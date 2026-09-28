import React, { useMemo, useState } from "react";
import "./ShipmentAnalytics.css";

import ShipmentAnalyticsFilters from "./ShipmentAnalyticsFilters";
import AnalyticsSummaryCards from "./AnalyticsSummaryCards";
import ShipmentStatusChart from "./ShipmentStatusChart";
import ShipmentTrendChart from "./ShipmentTrendChart";

import { shipmentData } from "./ShipmentAnalyticsData";

const ShipmentAnalytics = () => {
  const [status, setStatus] = useState("All");
  const [carrier, setCarrier] = useState("All");
  const [period, setPeriod] = useState("All");

  // Filter shipments
  const filteredShipments = useMemo(() => {
    let data = [...shipmentData];

    // Status filter
    if (status !== "All") {
      data = data.filter(
        (shipment) => shipment.status === status
      );
    }

    // Carrier filter
    if (carrier !== "All") {
      data = data.filter(
        (shipment) => shipment.carrier === carrier
      );
    }

    // Period filter
    if (period !== "All") {
      data = data.filter(
        (shipment) =>
          shipment.daysAgo <= Number(period)
      );
    }

    return data;
  }, [status, carrier, period]);

  // Summary values
  const summary = {
    total: filteredShipments.length,

    delivered: filteredShipments.filter(
      (shipment) =>
        shipment.status === "Delivered"
    ).length,

    delayed: filteredShipments.filter(
      (shipment) =>
        shipment.status === "Delayed"
    ).length,

    inTransit: filteredShipments.filter(
      (shipment) =>
        shipment.status === "In Transit"
    ).length,
  };

  // Clear filters
  const clearFilters = () => {
    setStatus("All");
    setCarrier("All");
    setPeriod("All");
  };

  return (
    <div className="shipment-analytics">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="analytics-header">
        <div>
          <h1>Shipment Analytics</h1>

          <p>
            Monitor shipment performance,
            delivery status and shipment trends.
          </p>
        </div>
      </div>

      {/* =================================
          FILTERS
      ================================= */}

      <ShipmentAnalyticsFilters
        status={status}
        carrier={carrier}
        period={period}
        setStatus={setStatus}
        setCarrier={setCarrier}
        setPeriod={setPeriod}
        clearFilters={clearFilters}
      />

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <AnalyticsSummaryCards
        summary={summary}
      />

      {/* =================================
          CHARTS
      ================================= */}

      <div className="analytics-charts">

        <ShipmentStatusChart
          shipments={filteredShipments}
        />

        <ShipmentTrendChart
          shipments={filteredShipments}
        />

      </div>

      {/* =================================
          SHIPMENT TABLE
      ================================= */}

      <div className="analytics-table-card">

        <div className="table-header">

          <div>
            <h2>Shipment Details</h2>
          </div>

          <span>
            {filteredShipments.length} shipments
          </span>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Carrier</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredShipments.map(
                (shipment) => (
                  <tr key={shipment.id}>

                    <td>
                      <strong>
                        {shipment.trackingId}
                      </strong>
                    </td>

                    <td>
                      {shipment.carrier}
                    </td>

                    <td>

                      <span
                        className={`status ${shipment.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {shipment.status}
                      </span>

                    </td>

                    <td>
                      {shipment.date}
                    </td>

                  </tr>
                )
              )}

              {filteredShipments.length === 0 && (
                <tr>

                  <td
                    colSpan="4"
                    className="no-data"
                  >
                    No shipments found for the
                    selected filters.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ShipmentAnalytics;