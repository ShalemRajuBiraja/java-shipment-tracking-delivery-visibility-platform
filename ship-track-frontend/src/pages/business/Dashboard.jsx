import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import RecentShipments from "./components/RecentShipments";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

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

export default Dashboard;