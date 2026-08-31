import { Info } from "lucide-react";

const TrackingProgress = () => {
  const steps = [
    {
      title: "Order Placed",
      date: "30 Aug 2025",
      time: "10:00 AM",
      completed: true,
    },
    {
      title: "Packed",
      date: "30 Aug 2025",
      time: "11:30 AM",
      completed: true,
    },
    {
      title: "Picked",
      date: "30 Aug 2025",
      time: "01:00 PM",
      completed: true,
    },
    {
      title: "On Going",
      date: "30 Aug 2025",
      time: "03:30 PM",
      completed: true,
      active: true,
    },
    {
      title: "Out for Delivery",
      date: "Pending",
      completed: false,
    },
    {
      title: "Delivered",
      date: "Pending",
      completed: false,
    },
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-4">
      
      {/* Tracking Number */}
      <h2 className="text-lg font-bold text-slate-800 mb-10">
        Tracking Number:
        <span className="text-emerald-600 ml-2">
          TRK1234567890
        </span>
      </h2>

      {/* Progress Section */}
      <div className="relative">

        {/* Background Progress Line */}
        <div className="absolute top-[11px] left-[8%] right-[8%] h-[2px] bg-slate-200 hidden lg:block" />

        {/* Completed Progress Line */}
        <div className="absolute top-[11px] left-[8%] w-[50%] h-[2px] bg-emerald-600 hidden lg:block" />

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 relative">

          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              
              {/* Simple Status Dot */}
              <div
                className={`w-6 h-6 rounded-full relative z-10 ${
                  step.completed
                    ? "bg-emerald-600"
                    : "bg-white border-2 border-slate-300"
                }`}
              />

              {/* Status Name */}
              <h3
                className={`font-semibold text-base mt-5 ${
                  step.active
                    ? "text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {step.title}
              </h3>

              {/* Date and Time */}
              {step.completed ? (
                <div className="text-sm text-slate-500 mt-2 leading-6">
                  <p>{step.date}</p>
                  <p>{step.time}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 mt-2">
                  Pending
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-10 border border-emerald-100 border-l-4 border-l-emerald-600 bg-emerald-50 rounded-lg px-5 py-4 flex items-center gap-4">
        
        <Info
          size={24}
          className="text-emerald-700 shrink-0"
        />

        <p className="text-base text-slate-700">
          Your shipment is on the way.
        </p>
      </div>

    </section>
  );
};

export default TrackingProgress;