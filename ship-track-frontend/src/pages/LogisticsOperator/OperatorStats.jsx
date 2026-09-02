import {
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

const OperatorStats = () => {
  const stats = [
    {
      title: "Assigned",
      value: "24",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "In Transit",
      value: "12",
      icon: Truck,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Delivered",
      value: "8",
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Pending",
      value: "4",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
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