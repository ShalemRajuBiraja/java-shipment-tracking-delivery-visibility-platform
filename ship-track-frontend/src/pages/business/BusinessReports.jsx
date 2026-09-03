import {
  Package,
  CheckCircle,
  Truck,
  Clock,
} from "lucide-react";

const BusinessReports = () => {

  const reports = [
    {
      title: "Total Shipments",
      value: "248",
      icon: Package,
    },
    {
      title: "Delivered",
      value: "162",
      icon: CheckCircle,
    },
    {
      title: "In Transit",
      value: "64",
      icon: Truck,
    },
    {
      title: "Pending",
      value: "22",
      icon: Clock,
    },
  ];

  return (
    <div className="p-5 md:p-7">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Business Reports
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Overview of your shipment performance.
        </p>

      </div>


      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {reports.map((report) => {

          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {report.title}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800 mt-2">
                    {report.value}
                  </h2>

                </div>


                <div className="p-3 bg-emerald-50 rounded-lg">

                  <Icon
                    size={23}
                    className="text-emerald-600"
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>


      {/* Simple Summary */}
      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

        <h2 className="font-semibold text-slate-800">
          Shipment Summary
        </h2>

        <div className="mt-4 space-y-4">

          <div>

            <div className="flex justify-between text-sm mb-1">

              <span className="text-slate-600">
                Delivered
              </span>

              <span className="font-medium text-slate-700">
                65%
              </span>

            </div>

            <div className="w-full bg-slate-100 rounded-full h-2">

              <div className="bg-emerald-500 h-2 rounded-full w-[65%]" />

            </div>

          </div>


          <div>

            <div className="flex justify-between text-sm mb-1">

              <span className="text-slate-600">
                In Transit
              </span>

              <span className="font-medium text-slate-700">
                26%
              </span>

            </div>

            <div className="w-full bg-slate-100 rounded-full h-2">

              <div className="bg-blue-500 h-2 rounded-full w-[26%]" />

            </div>

          </div>


          <div>

            <div className="flex justify-between text-sm mb-1">

              <span className="text-slate-600">
                Pending
              </span>

              <span className="font-medium text-slate-700">
                9%
              </span>

            </div>

            <div className="w-full bg-slate-100 rounded-full h-2">

              <div className="bg-yellow-400 h-2 rounded-full w-[9%]" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BusinessReports;