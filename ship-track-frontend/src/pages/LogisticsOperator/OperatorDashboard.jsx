import OperatorHeader from "./OperatorHeader";
import OperatorStats from "./OperatorStats";
import AssignedShipments from "./AssignedShipments";
// import QuickActions from "./QuickActions";

const OperatorDashboard = () => {
  return (
    <>
      {/* Dashboard Header */}
      <OperatorHeader />

      {/* Statistics */}
      <OperatorStats />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

        {/* Assigned Shipments */}
        <div className="xl:col-span-2">
          <AssignedShipments />
        </div>

        {/* Quick Actions
        <div>
          <QuickActions />
        </div> */}

      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>
    </>
  );
};

export default OperatorDashboard;