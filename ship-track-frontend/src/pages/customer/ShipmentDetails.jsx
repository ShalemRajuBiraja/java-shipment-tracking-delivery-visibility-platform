import {
  UserRound,
  Phone,
  CalendarDays,
} from "lucide-react";

const ShipmentDetails = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3">

        {/* Sender */}
        <div className="lg:border-r lg:border-slate-200 lg:pr-6">
          <h3 className="text-base font-bold text-slate-800 mb-5">
            Sender Details
          </h3>

          <div className="flex gap-3">
            <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <UserRound size={21} className="text-emerald-600" />
            </div>

            <div>
              <h4 className="font-bold text-base text-slate-800">
                ABC Company
              </h4>

              <p className="text-slate-600 text-sm mt-2">
                123, Industrial Area
              </p>

              <p className="text-slate-600 text-sm mt-1">
                Hyderabad, Telangana - 500001
              </p>

              <p className="text-slate-600 text-sm mt-1">
                India
              </p>

              <div className="flex items-center gap-2 mt-4 text-slate-600 text-sm">
                <Phone size={16} className="text-emerald-600" />
                +91 98765 43210
              </div>
            </div>
          </div>
        </div>

        {/* Receiver */}
        <div className="lg:border-r lg:border-slate-200 lg:px-6 py-6 lg:py-0">
          <h3 className="text-base font-bold text-slate-800 mb-5">
            Receiver Details
          </h3>

          <div className="flex gap-3">
            <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <UserRound size={21} className="text-emerald-600" />
            </div>

            <div>
              <h4 className="font-bold text-base text-slate-800">
                Ramesh Kumar
              </h4>

              <p className="text-slate-600 text-sm mt-2">
                45, MG Road
              </p>

              <p className="text-slate-600 text-sm mt-1">
                Vijayawada, Andhra Pradesh - 520001
              </p>

              <p className="text-slate-600 text-sm mt-1">
                India
              </p>

              <div className="flex items-center gap-2 mt-4 text-slate-600 text-sm">
                <Phone size={16} className="text-emerald-600" />
                +91 91234 56789
              </div>
            </div>
          </div>
        </div>

        {/* Expected Delivery */}
        <div className="lg:pl-6">
          <h3 className="text-base font-bold text-slate-800 mb-5">
            Expected Delivery
          </h3>

          <div className="flex gap-4 items-start">
            <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <CalendarDays
                size={23}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-800">
                02 Sep 2025
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                By End of the Day
              </p>

              <span className="inline-block mt-3 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-medium">
                Estimated Delivery
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShipmentDetails;