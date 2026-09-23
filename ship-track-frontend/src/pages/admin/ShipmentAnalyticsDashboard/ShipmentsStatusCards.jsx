import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#00A878",
  "#F97316",
  "#3B82F6",
];

const ShipmentStatusChart = ({
  shipments,
}) => {

  const data = [
    {
      name: "Delivered",
      value: shipments.filter(
        (shipment) =>
          shipment.status === "Delivered"
      ).length,
    },

    {
      name: "Delayed",
      value: shipments.filter(
        (shipment) =>
          shipment.status === "Delayed"
      ).length,
    },

    {
      name: "In Transit",
      value: shipments.filter(
        (shipment) =>
          shipment.status === "In Transit"
      ).length,
    },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>
          <h2>
            Shipment Status
          </h2>

          <p>
            Current shipment distribution
          </p>
        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={90}
              innerRadius={45}
              paddingAngle={3}
              label
            >

              {data.map(
                (entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ShipmentStatusChart;