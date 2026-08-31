import CustomerSidebar from "./CustomerSidebar";
import DashboardHeader from "./DashboardHeader";
import ShipmentDetails from "./ShipmentDetails";
import TrackingProgress from "./TrackingProgress";


const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <CustomerSidebar />

      <main className="flex-1 ml-0 lg:ml-64 p-4 md:p-5">
        <DashboardHeader />

        {/* Tracking Search */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-5 mb-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Track Your Shipment
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Tracking Number (e.g., TRK1234567890)"
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg transition">
              Track Shipment
            </button>
          </div>
        </section>

        <TrackingProgress />

        <ShipmentDetails />

        <footer className="text-center text-xs text-slate-500 py-5">
          © 2026 QuickShip. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default CustomerDashboard;