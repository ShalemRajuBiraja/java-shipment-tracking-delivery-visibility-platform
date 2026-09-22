import { Check, Info, X, MapPin, Clock } from "lucide-react";

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

  // =========================================================
  // FIND CURRENT SHIPMENT STATUS POSITION
  // =========================================================
  const currentIndex = steps.findIndex(
    (step) => step.status === shipment?.currentStatus
  );

  // =========================================================
  // CHECK IF SHIPMENT IS CANCELLED
  // =========================================================
  const isCancelled = shipment?.currentStatus === "CANCELLED";

  // =========================================================
  // FIND TRACKING RECORD FOR EACH STATUS
  // =========================================================
  const getTrackingRecord = (status) => {
    return shipment?.trackingHistory?.find(
      (history) => history.status === status
    );
  };

  // =========================================================
  // FORMAT DATE AND TIME
  // =========================================================
  const formatDateTime = (dateTime) => {
    if (!dateTime) return null;

    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER INFO */}
      <div className="border-b border-slate-100 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tracking ID
        </span>
        <div className="mt-0.5 flex items-center justify-between">
          <p className="font-mono text-base font-bold text-emerald-600">
            {shipment?.trackingNumber || "N/A"}
          </p>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            {steps.length} Milestones
          </span>
        </div>
      </div>

      {/* TIMELINE PROGRESS */}
      <div className="relative pl-2">
        {steps.map((step, index) => {
          const isCompleted = !isCancelled && index <= currentIndex;
          const isCurrent = !isCancelled && index === currentIndex;
          const trackingRecord = getTrackingRecord(step.status);
          const isLastStep = index === steps.length - 1;
          const formattedDate = formatDateTime(trackingRecord?.createdAt);

          return (
            <div key={step.status} className="relative flex items-start group">
              {/* CONNECTING LINE */}
              {!isLastStep && (
                <div
                  className={`absolute left-[15px] top-[30px] h-[calc(100%-12px)] w-[2px] transition-colors ${
                    !isCancelled && index < currentIndex
                      ? "bg-emerald-500"
                      : "bg-slate-200"
                  }`}
                />
              )}

              {/* NODE CIRCLE */}
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                    isCurrent
                      ? "bg-emerald-600 ring-4 ring-emerald-100 shadow-sm"
                      : isCompleted
                      ? "bg-emerald-600"
                      : "border-2 border-slate-300 bg-white"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </div>
              </div>

              {/* STEP DETAILS */}
              <div className="ml-4 pb-7 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-sm font-bold ${
                      isCurrent
                        ? "text-emerald-700"
                        : isCompleted
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </h3>

                  {isCurrent && (
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  )}
                </div>

                {/* DATE & TIME STAMP */}
                <div className="mt-1 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span
                    className={`text-xs ${
                      formattedDate
                        ? "font-medium text-slate-600"
                        : "text-slate-400 italic"
                    }`}
                  >
                    {formattedDate || "Pending update"}
                  </span>
                </div>

                {/* LOCATION LOG */}
                {trackingRecord?.location && (
                  <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 w-fit border border-slate-100">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">
                      {trackingRecord.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER STATUS BANNER */}
      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-red-700">
          <div className="rounded-lg bg-red-100 p-1.5 text-red-600 shrink-0">
            <X className="h-4 w-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-800">
              Shipment Cancelled
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              This order was terminated before completion.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-slate-700">
          <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700 shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Stage
            </span>
            <p className="text-xs font-bold text-slate-800 capitalize truncate">
              {shipment?.currentStatus?.replaceAll("_", " ")?.toLowerCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingProgress;