import {
  Package,
  Truck,
  CircleCheck,
  Clock,
} from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Shipments",
      value: "1,248",
      icon: Package,
    },
    {
      title: "In Transit",
      value: "324",
      icon: Truck,
    },
    {
      title: "Delivered",
      value: "856",
      icon: CircleCheck,
    },
    {
      title: "Pending",
      value: "68",
      icon: Clock,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-4"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </h2>
              </div>

              <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Icon
                  size={22}
                  className="text-emerald-600"
                />
              </div>

            </div>

          </div>
        );
      })}

    </section>
  );
};

export default DashboardStats;