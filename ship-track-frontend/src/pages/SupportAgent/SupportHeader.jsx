import { Bell } from "lucide-react";

const SupportHeader = () => {
  const userData = JSON.parse(
    localStorage.getItem("userData")
  );

  return (
    <div className="mb-5 flex items-center justify-between">

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Support Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Manage customer support requests efficiently.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
          <Bell size={19} />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-700">
            {userData?.email || "Support Agent"}
          </p>

          <p className="text-xs text-slate-500">
            Support Agent
          </p>
        </div>

      </div>

    </div>
  );
};

export default SupportHeader;