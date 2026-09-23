import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ShipmentTrendChart = ({
  shipments,
}) => {

  const groupedData = [];

  shipments.forEach((shipment) => {

    const existing = groupedData.find(
      (item) =>
        item.date === shipment.date
    );

    if (existing) {

      existing.shipments += 1;

    } else {

      groupedData.push({
        date: shipment.date,
        shipments: 1,
      });

    }

  });

  const data = groupedData.sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h2>
            Shipment Trend
          </h2>

          <p>
            Shipment volume by date
          </p>

        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 11,
              }}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="shipments"
              stroke="#00A878"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#00A878",
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ShipmentTrendChart;