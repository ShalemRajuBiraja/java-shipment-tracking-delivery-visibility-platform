import { Link } from "react-router-dom";
import { FileCheck, PenLine, Truck } from "lucide-react";

const ShipmentDeliveryActions = ({
  trackingNumber,
  status,
  variant = "card",
}) => {
  if (!trackingNumber) {
    return null;
  }

  const normalizedStatus = (status || "").toUpperCase();
  const isDelivered = normalizedStatus === "DELIVERED";

  const confirmPath = `/customer/delivery-confirmation/${trackingNumber}`;
  const podPath = `/customer/proof-of-delivery/${trackingNumber}`;
  const trackPath = `/customer/shipment/${trackingNumber}`;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={trackPath}
          className="text-xs font-semibold text-slate-600 hover:text-emerald-700"
        >
          Track
        </Link>
        {!isDelivered ? (
          <Link
            to={confirmPath}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Confirm & sign
          </Link>
        ) : (
          <Link
            to={podPath}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Proof of delivery
          </Link>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
          {isDelivered ? (
            <FileCheck className="h-5 w-5" />
          ) : (
            <PenLine className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-slate-900">
            Delivery confirmation
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {isDelivered
              ? "This shipment is delivered. View the signed proof of delivery record."
              : "When your package arrives, confirm receipt and capture your signature here."}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {!isDelivered ? (
              <Link
                to={confirmPath}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                <PenLine className="h-4 w-4" />
                Confirm delivery & sign
              </Link>
            ) : (
              <Link
                to={podPath}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                <FileCheck className="h-4 w-4" />
                View proof of delivery
              </Link>
            )}

            <Link
              to={trackPath}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Truck className="h-4 w-4" />
              Shipment tracker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShipmentDeliveryActions;
