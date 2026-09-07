import { useEffect, useState } from "react";

import OperatorHeader from "./OperatorHeader";
import OperatorStats from "./OperatorStats";
import AssignedShipments from "./AssignedShipments";
import { getDashboardData } from "../../services/operatorService";

const OperatorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData();

      if(response.data.success === true){
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <>
      {/* Dashboard Header */}
      <OperatorHeader />

      {/* Statistics */}
      <OperatorStats dashboardData={dashboardData} />

      {/* Assigned Shipments */}
      <div className="mt-5">
        <AssignedShipments />
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>
    </>
  );
};

export default OperatorDashboard;