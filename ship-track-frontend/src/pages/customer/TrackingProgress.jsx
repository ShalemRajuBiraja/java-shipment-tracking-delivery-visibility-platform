import { Check, Info, X } from "lucide-react";

const TrackingProgress = ({ shipment }) => {

  const steps = [
    {
      status: "CREATED",
      label: "Created",
    },
    {
      status: "PICKED_UP",
      label: "Picked Up",
    },
    {
      status: "IN_TRANSIT",
      label: "In Transit",
    },
    {
      status: "OUT_FOR_DELIVERY",
      label: "Out for Delivery",
    },
    {
      status: "DELIVERED",
      label: "Delivered",
    },
  ];


  // Find current shipment status position
  const currentIndex = steps.findIndex(
    (step) => step.status === shipment.currentStatus
  );


  // Check if shipment is cancelled
  const isCancelled =
    shipment.currentStatus === "CANCELLED";


  // Find tracking record for each status
  const getTrackingRecord = (status) => {

    return shipment.trackingHistory?.find(
      (history) => history.status === status
    );

  };


  // Format date and time
  const formatDateTime = (dateTime) => {

    if (!dateTime) return "Pending";

    return new Date(dateTime).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 md:p-6 mb-4">

      {/* Header */}
      <div className="mb-10">

        <h2 className="text-lg font-bold text-slate-800">
          Shipment Progress
        </h2>

        <p className="text-sm text-slate-500 mt-1">

          Tracking Number:

          <span className="font-semibold text-emerald-600 ml-2">
            {shipment.trackingNumber}
          </span>

        </p>

      </div>


      {/* Progress Line */}
      <div className="relative">

        {/* Background Line */}
        <div className="absolute top-3 left-[10%] right-[10%] h-[3px] bg-slate-200 hidden md:block" />


        {/* Completed Line */}
        {!isCancelled && currentIndex >= 0 && (

          <div
            className="absolute top-3 left-[10%] h-[3px] bg-emerald-600 transition-all duration-500 hidden md:block"
            style={{
              width: `${(currentIndex / (steps.length - 1)) * 80}%`,
            }}
          />

        )}


        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">

          {steps.map((step, index) => {

            const isCompleted =
              !isCancelled && index <= currentIndex;

            const isCurrent =
              !isCancelled && index === currentIndex;

            const trackingRecord =
              getTrackingRecord(step.status);


            return (

              <div
                key={step.status}
                className="flex md:flex-col items-center md:text-center gap-3 md:gap-0"
              >

                {/* Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 shrink-0 ${
                    isCompleted
                      ? "bg-emerald-600"
                      : "bg-white border-2 border-slate-300"
                  }`}
                >

                  {isCompleted && (
                    <Check
                      size={14}
                      className="text-white"
                    />
                  )}

                </div>


                {/* Status */}
                <div className="md:mt-3">

                  <h3
                    className={`text-sm font-semibold ${
                      isCurrent
                        ? "text-emerald-700"
                        : isCompleted
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </h3>


                  {/* Date */}
                  <p className="text-xs text-slate-500 mt-1">

                    {trackingRecord
                      ? formatDateTime(
                          trackingRecord.createdAt
                        )
                      : "Pending"}

                  </p>


                  {/* Location */}
                  {trackingRecord?.location && (

                    <p className="text-xs text-slate-400 mt-1">

                      {trackingRecord.location}

                    </p>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>


      {/* Current Status Message */}

      {isCancelled ? (

        <div className="mt-8 border-l-4 border-red-500 bg-red-50 rounded-md px-4 py-3 flex items-center gap-3">

          <X
            size={19}
            className="text-red-600 shrink-0"
          />

          <p className="text-sm font-semibold text-red-700">
            This shipment has been cancelled.
          </p>

        </div>

      ) : (

        <div className="mt-8 border-l-4 border-emerald-600 bg-emerald-50 rounded-md px-4 py-3 flex items-center gap-3">

          <Info
            size={19}
            className="text-emerald-700 shrink-0"
          />

          <p className="text-sm text-slate-700">

            Current Status:

            <span className="font-semibold text-emerald-700 ml-2">

              {shipment.currentStatus?.replaceAll("_", " ")}

            </span>

          </p>

        </div>

      )}

    </section>
  );
};

export default TrackingProgress;