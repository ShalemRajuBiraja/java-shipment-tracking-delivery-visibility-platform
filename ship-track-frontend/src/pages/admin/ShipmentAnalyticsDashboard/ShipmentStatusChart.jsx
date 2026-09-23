import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ShipmentStatusChart = ({ data = [] }) => {
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Delivered", value: 45 },
          { name: "In Transit", value: 25 },
          { name: "Pending", value: 15 },
          { name: "Cancelled", value: 10 },
          { name: "Delayed", value: 5 },
        ];

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-full">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800">
          Shipment Status
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Current shipment distribution
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />

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