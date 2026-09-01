import DashboardStats from "./DashboardStats";
import RecentShipments from "./RecentShipments";

const AdminDashboard = () => {
  return (
    <>
      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

        <div className="xl:col-span-2">
          <RecentShipments />
        </div>

      </div>

      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>
    </>
  );
};

export default AdminDashboard;