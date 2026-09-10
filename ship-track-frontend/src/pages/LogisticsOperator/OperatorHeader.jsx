import { UserRound } from "lucide-react";

const OperatorHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Logistics Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage and update assigned shipments.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center">
          <UserRound
            className="text-emerald-600"
            size={21}
          />
        </div>

        <div>
          <p className="font-semibold text-sm text-slate-700">
            Logistics Operator
          </p>

          <p className="text-xs text-slate-500">
            Shipment Operations
          </p>
        </div>

      </div>

    </header>
  );
};

export default OperatorHeader;