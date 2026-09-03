import SupportHeader from "./SupportHeader";
import SupportStats from "./SupportStats";

const SupportDashboard = () => {
  return (
    <div>

      <SupportHeader />

      <SupportStats />

      <footer className="py-5 text-center text-xs text-slate-500">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default SupportDashboard;