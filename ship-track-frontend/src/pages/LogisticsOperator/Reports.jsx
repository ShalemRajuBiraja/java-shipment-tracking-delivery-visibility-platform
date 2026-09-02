import {
  Package,
  CheckCircle,
  Truck,
  Clock,
  TrendingUp,
} from "lucide-react";

const reportData = [
  {
    title: "Total Shipments",
    value: "1,250",
    description: "Assigned shipments",
    icon: Package,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Delivered",
    value: "920",
    description: "Successfully completed",
    icon: CheckCircle,
    iconStyle: "bg-green-50 text-green-600",
  },
  {
    title: "In Transit",
    value: "250",
    description: "Currently moving",
    icon: Truck,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending",
    value: "80",
    description: "Waiting for processing",
    icon: Clock,
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

const Reports = () => {
  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Reports
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of shipment performance and delivery status.
        </p>
      </div>


      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {reportData.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {report.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    {report.value}
                  </h2>
                </div>


                <div
                  className={`rounded-lg p-2 ${report.iconStyle}`}
                >
                  <Icon size={21} />
                </div>

              </div>


              <p className="mt-2 text-xs text-slate-400">
                {report.description}
              </p>

            </div>
          );
        })}

      </div>


      {/* Performance Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">
            <TrendingUp
              size={22}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Performance Summary
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Shipment delivery performance overview.
            </p>
          </div>

        </div>


        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Delivery Rate */}
          <div className="rounded-lg bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Delivery Rate
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-800">
              73.6%
            </p>

          </div>


          {/* Active Shipments */}
          <div className="rounded-lg bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Active Shipments
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-800">
              250
            </p>

          </div>


          {/* Pending Shipments */}
          <div className="rounded-lg bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Pending Shipments
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-800">
              80
            </p>

          </div>

        </div>

      </div>


      {/* Report Note */}
      <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">

        <p className="text-sm text-emerald-700">
          Report data is currently displayed using temporary frontend data.
          Live shipment reports will be connected after backend integration.
        </p>

      </div>

    </div>
  );
};

export default Reports;