import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";

const TrackingSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Connect tracking API endpoint here.
  };

  return (
    <section
      id="tracking"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Shipment Tracking
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Track your shipment with ease
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Enter your tracking number to check the latest status of your
            shipment.
          </p>
        </div>

        <Card
          padding="lg"
          className="mx-auto mt-10 max-w-3xl shadow-md"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <Input
                id="tracking-number"
                name="trackingNumber"
                label="Tracking Number"
                placeholder="Enter your tracking number"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
            >
              Track Shipment
            </Button>
          </form>

          <div className="mt-5 flex items-start gap-2 text-xs text-slate-500">
            <span className="mt-0.5 text-emerald-600">✓</span>
            <p>
              Your tracking information will be retrieved securely from
              ShipTrack Pro.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TrackingSection;