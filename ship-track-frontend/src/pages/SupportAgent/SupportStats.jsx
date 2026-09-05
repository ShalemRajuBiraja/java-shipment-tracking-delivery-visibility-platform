import { useEffect, useState } from "react";

import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getSupportStatsApi } from "../../services/supportService";



const SupportStats = () => {

  const [statsData, setStatsData] = useState({
    totalRequests: 0,
    openRequests: 0,
    inProgressRequests: 0,
    resolvedRequests: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchSupportStats();
  }, []);


  const fetchSupportStats = async () => {

    try {

      setLoading(true);

      const response =
        await getSupportStatsApi();

      setStatsData(response.data);

    } catch (error) {

      console.error(
        "Error fetching support statistics:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  const stats = [
    {
      title: "Total Requests",
      value: statsData.totalRequests,
      icon: MessageSquare,
      style: "bg-blue-50 text-blue-600",
    },
    {
      title: "Open Requests",
      value: statsData.openRequests,
      icon: AlertCircle,
      style: "bg-red-50 text-red-600",
    },
    {
      title: "In Progress",
      value: statsData.inProgressRequests,
      icon: Clock,
      style: "bg-amber-50 text-amber-600",
    },
    {
      title: "Resolved",
      value: statsData.resolvedRequests,
      icon: CheckCircle,
      style: "bg-green-50 text-green-600",
    },
  ];


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

                  {loading ? "..." : stat.value}

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