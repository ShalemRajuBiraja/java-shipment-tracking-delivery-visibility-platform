import {
  UserRound,
  Phone,
  Package,
  MapPin,
  Hash,
  CircleCheck,
} from "lucide-react";

const ShipmentDetails = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5">

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-slate-200">

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Shipment Details
          </h2>

          {/* Tracking Number */}
          <div className="flex items-center gap-1.5 mt-1">
            <Hash
              size={15}
              className="text-emerald-600"
            />

            <span className="text-sm font-semibold text-emerald-600">
              TRK1234567890
            </span>
          </div>
        </div>

        {/* Shipment Status */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md w-fit">
          <CircleCheck size={14} />

          <span className="text-xs font-semibold">
            On Going
          </span>
        </div>

      </div>


      {/* Shipment Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-lg overflow-hidden">

        {/* Sender */}
        <div className="p-4 border-b border-slate-200 sm:border-r lg:border-b-0">

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
            ABC Company
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <Phone
              size={14}
              className="text-emerald-600 shrink-0"
            />

            <span>
              +91 98765 43210
            </span>
          </div>

        </div>


        {/* Receiver */}
        <div className="p-4 border-b border-slate-200 lg:border-r lg:border-b-0">

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
            Ramesh Kumar
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <Phone
              size={14}
              className="text-emerald-600 shrink-0"
            />

            <span>
              +91 91234 56789
            </span>
          </div>

        </div>


        {/* Package */}
        <div className="p-4 border-b border-slate-200 sm:border-r sm:border-b-0 lg:border-r">

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
            Electronics Package
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Weight: 2.5 kg
          </p>

        </div>


        {/* Delivery Address */}
        <div className="p-4">

          <div className="flex items-center gap-2 mb-3">
            <MapPin
              size={17}
              className="text-emerald-600"
            />

            <h3 className="text-sm font-bold text-slate-700">
              Delivery Address
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-5">
            45, MG Road
            <br />

            Vijayawada, Andhra Pradesh
            <br />

            520001
          </p>

        </div>

      </div>

    </section>
  );
};

export default ShipmentDetails;