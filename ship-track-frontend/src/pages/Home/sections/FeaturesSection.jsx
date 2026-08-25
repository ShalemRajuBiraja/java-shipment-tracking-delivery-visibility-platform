import Card from "../../../components/ui/Card";

const features = [
  {
    title: "Real-Time Tracking",
    description:
      "Monitor shipment progress and stay updated throughout the delivery journey.",
    icon: "↗",
  },
  {
    title: "Easy Shipment Management",
    description:
      "Manage shipment information from one centralized and organized platform.",
    icon: "▣",
  },
  {
    title: "Delivery Updates",
    description:
      "Keep track of important shipment status changes and delivery progress.",
    icon: "✓",
  },
  {
    title: "Secure Platform",
    description:
      "Keep your shipment information protected with a secure platform.",
    icon: "◈",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to manage shipments
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            ShipTrack Pro brings essential shipment management and tracking
            capabilities together in one platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              hover
              className="h-full"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-lg font-bold text-emerald-600">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;