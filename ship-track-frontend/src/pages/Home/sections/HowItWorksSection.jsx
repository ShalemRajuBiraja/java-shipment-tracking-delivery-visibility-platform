const steps = [
  {
    number: "01",
    title: "Order Placed",
    description: "Your shipment order is created and ready for pickup.",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21 8-9-5-9 5 9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Picked Up",
    description: "The shipment is collected and begins its delivery journey.",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M14 14h7" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "In Transit",
    description: "Your shipment is moving toward its destination and can be tracked.",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Delivered",
    description: "The shipment reaches its destination successfully.",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10.5 12 4l9 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-8Z" />
        <path d="m8.5 15 2.2 2.2 4.8-5" />
      </svg>
    ),
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Follow your shipment from order to delivery
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            See how your shipment moves through every major stage until it
            reaches its destination.
          </p>
        </div>

        {/* Shipment Journey */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          {/* Connecting Route */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 bg-slate-200 lg:block"
          />

          <div
            aria-hidden="true"
            className="absolute left-[12.5%] top-10 hidden h-0.5 w-[25%] bg-emerald-500 lg:block"
          />

          {/* Moving Truck */}
          <div
            aria-hidden="true"
            className="absolute left-[34%] top-[1.1rem] z-20 hidden -translate-y-1/2 lg:block"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-slate-50 bg-emerald-600 text-white shadow-md">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7h11v10H3z" />
                <path d="M14 10h4l3 3v4h-7z" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-50 shadow-sm ${
                    index <= 1
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-emerald-600"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-20 h-10 w-0.5 -translate-x-1/2 bg-slate-200 lg:hidden"
                  />
                )}

                {/* Content */}
                <div className="mt-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step {step.number}
                  </span>

                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Summary
        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-600">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-center gap-3"
            >
              <span
                className={
                  index === 2
                    ? "text-emerald-600"
                    : "text-slate-700"
                }
              >
                {step.title}
              </span>

              {index < steps.length - 1 && (
                <span className="text-slate-300">→</span>
              )}
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorksSection;