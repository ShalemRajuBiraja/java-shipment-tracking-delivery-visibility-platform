import {
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

const OperatorStats = ({ dashboardData }) => {

  const stats = [
    {
      title: "Total Shipments",
      value: dashboardData?.totalShipments || 0,
      icon: Package,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "In Transit",
      value: dashboardData?.inTransit || 0,
      icon: Truck,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Delivered",
      value: dashboardData?.delivered || 0,
      icon: CheckCircle,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Out for Delivery",
      value: dashboardData?.outForDelivery || 0,
      icon: Clock,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}
              >
                <Icon
                  size={21}
                  className={stat.color}
                />
              </div>

            </div>
          </div>
        );
      })}

    </section>
  );
};

export default OperatorStats;