import Card from "../../../components/ui/Card";

const services = [
  {
    title: "Shipment Management",
    description:
      "Create, organize, and manage shipment details from a centralized platform.",
    icon: "▣",
  },
  {
    title: "Shipment Tracking",
    description:
      "Track shipments using a unique tracking number and view their current status.",
    icon: "↗",
  },
  {
    title: "Delivery Management",
    description:
      "Monitor delivery progress and keep important shipment information organized.",
    icon: "✓",
  },
  {
    title: "Shipment Insights",
    description:
      "Get a clear overview of shipment activity and delivery progress.",
    icon: "▥",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything in one shipment platform
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Manage the essential parts of your shipment journey through one
            simple and organized platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              hover
              className="h-full"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-lg font-bold text-emerald-600">
                {service.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;