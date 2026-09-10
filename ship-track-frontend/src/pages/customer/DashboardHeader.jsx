import NotificationBell from "../../components/ui/notifications/NotificationBell";
import { UserRound } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Welcome, Customer!
        </h1>

        <p className="text-sm md:text-base text-slate-500 mt-1">
          Track your shipment by entering your tracking number.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center">
          <UserRound className="text-emerald-600" size={21} />
        </div>

        <span className="font-semibold text-sm text-slate-700">
          Customer
        </span>
      </div>
      
    </header>
  );
};

export default DashboardHeader;