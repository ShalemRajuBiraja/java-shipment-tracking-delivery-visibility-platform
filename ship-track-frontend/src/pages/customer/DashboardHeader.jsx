import { UserRound } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
        Welcome, Customer!
      </h1>

      <div className="flex items-center gap-2 shrink-0">
        <div className="w-9 h-9 rounded-full border-2 border-emerald-200 flex items-center justify-center shrink-0">
          <UserRound
            className="text-emerald-600"
            size={19}
          />
        </div>

        <span className="font-semibold text-sm text-slate-700 whitespace-nowrap">
          Customer
        </span>
      </div>

    </header>
  );
};

export default DashboardHeader;