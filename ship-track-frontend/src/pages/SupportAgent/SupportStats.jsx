import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Requests",
    value: "48",
    icon: MessageSquare,
    style: "bg-blue-50 text-blue-600",
  },
  {
    title: "Open Requests",
    value: "12",
    icon: AlertCircle,
    style: "bg-red-50 text-red-600",
  },
  {
    title: "In Progress",
    value: "18",
    icon: Clock,
    style: "bg-amber-50 text-amber-600",
  },
  {
    title: "Resolved",
    value: "18",
    icon: CheckCircle,
    style: "bg-green-50 text-green-600",
  },
];

const SupportStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div className={`rounded-lg p-2 ${stat.style}`}>
                <Icon size={21} />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default SupportStats;