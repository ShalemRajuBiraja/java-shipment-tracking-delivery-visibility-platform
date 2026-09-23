import React from "react";
import { carriers } from "./ShipmentAnalyticsData";

const ShipmentAnalyticsFilters = ({
  status,
  carrier,
  period,
  setStatus,
  setCarrier,
  setPeriod,
  clearFilters,
}) => {
  return (
    <div className="analytics-filters">

      {/* Status */}

      <div className="filter-item">

        <label htmlFor="statusFilter">
          Status
        </label>

        <select
          id="statusFilter"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Delayed">
            Delayed
          </option>

          <option value="In Transit">
            In Transit
          </option>
        </select>

      </div>

      {/* Carrier */}

      <div className="filter-item">

        <label htmlFor="carrierFilter">
          Carrier
        </label>

        <select
          id="carrierFilter"
          value={carrier}
          onChange={(event) =>
            setCarrier(event.target.value)
          }
        >

          <option value="All">
            All Carriers
          </option>

          {carriers.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

      </div>

      {/* Period */}

      <div className="filter-item">

        <label htmlFor="periodFilter">
          Period
        </label>

        <select
          id="periodFilter"
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >

          <option value="All">
            All Time
          </option>

          <option value="7">
            Last 7 Days
          </option>

          <option value="30">
            Last 30 Days
          </option>

          <option value="90">
            Last 90 Days
          </option>

        </select>

      </div>

      {/* Clear button */}

      <button
        type="button"
        className="clear-button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
};

export default ShipmentAnalyticsFilters;