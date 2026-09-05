import {
  UserRound,
  Phone,
  Package,
  MapPin,
  Hash,
  CircleCheck,
  Calendar,
  Weight,
} from "lucide-react";

const ShipmentDetails = ({ shipment }) => {

  const formatDate = (dateTime) => {

    if (!dateTime) return "-";

    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const formatStatus = (status) => {
    return status?.replaceAll("_", " ") || "-";
  };


  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-slate-200">

        <div>

          <h2 className="text-lg font-bold text-slate-800">
            Shipment Details
          </h2>

          <div className="flex items-center gap-1.5 mt-1">

            <Hash
              size={15}
              className="text-emerald-600"
            />

            <span className="text-sm font-semibold text-emerald-600">
              {shipment.trackingNumber}
            </span>

          </div>

        </div>


        {/* Current Status */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md w-fit">

          <CircleCheck size={15} />

          <span className="text-xs font-semibold">
            {formatStatus(shipment.currentStatus)}
          </span>

        </div>

      </div>


      {/* Shipment Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-slate-200 rounded-lg overflow-hidden">


        {/* Sender */}
        <div className="p-4 border-b border-slate-200 lg:border-r">

          <div className="flex items-center gap-2 mb-3">

            <UserRound
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Sender
            </h3>

          </div>

          <p className="font-semibold text-sm text-slate-800">
            {shipment.senderName || "-"}
          </p>

        </div>


        {/* Receiver */}
        <div className="p-4 border-b border-slate-200 lg:border-r">

          <div className="flex items-center gap-2 mb-3">

            <UserRound
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Receiver
            </h3>

          </div>

          <p className="font-semibold text-sm text-slate-800">
            {shipment.receiverName || "-"}
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">

            <Phone
              size={14}
              className="text-emerald-600 shrink-0"
            />

            <span>
              {shipment.receiverPhone || "-"}
            </span>

          </div>

        </div>


        {/* Package */}
        <div className="p-4 border-b border-slate-200">

          <div className="flex items-center gap-2 mb-3">

            <Package
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Package
            </h3>

          </div>

          <p className="font-semibold text-sm text-slate-800">
            {shipment.packageDescription || "-"}
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">

            <Weight
              size={14}
              className="text-emerald-600"
            />

            <span>
              Weight: {shipment.weight || "-"} kg
            </span>

          </div>

        </div>


        {/* Pickup Address */}
        <div className="p-4 border-b border-slate-200 lg:border-r">

          <div className="flex items-center gap-2 mb-3">

            <MapPin
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Pickup Address
            </h3>

          </div>

          <p className="text-sm text-slate-600 leading-5">
            {shipment.pickupAddress || "-"}
          </p>

        </div>


        {/* Delivery Address */}
        <div className="p-4 border-b border-slate-200 lg:border-r">

          <div className="flex items-center gap-2 mb-3">

            <MapPin
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Delivery Address
            </h3>

          </div>

          <p className="text-sm text-slate-600 leading-5">
            {shipment.deliveryAddress || "-"}
          </p>

        </div>


        {/* Created Date */}
        <div className="p-4">

          <div className="flex items-center gap-2 mb-3">

            <Calendar
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Shipment Created
            </h3>

          </div>

          <p className="text-sm text-slate-600">
            {formatDate(shipment.createdAt)}
          </p>

        </div>

      </div>

    </section>
  );
};

export default ShipmentDetails;