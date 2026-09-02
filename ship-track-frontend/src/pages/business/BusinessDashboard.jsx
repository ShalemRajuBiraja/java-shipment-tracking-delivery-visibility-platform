import BusinessSidebar from "./BusinessSidebar";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import RecentShipments from "./RecentShipments";

const BusinessDashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <BusinessSidebar />

      <main className="min-w-0 flex-1">
        <DashboardHeader />

        <div className="bg-gray-50 p-5 md:p-8">
          <StatsCards />
          <RecentShipments />
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;