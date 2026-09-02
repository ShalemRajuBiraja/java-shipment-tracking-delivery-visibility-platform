import { Outlet } from "react-router-dom";
import OperatorSidebar from "./OperatorSidebar";

const OperatorLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Persistent Sidebar */}
      <OperatorSidebar />

      {/* Changing Content Area */}
      <main className="flex-1 ml-0 lg:ml-64 p-4 pt-20 md:p-5 md:pt-20 lg:pt-5">
        <Outlet />
      </main>

    </div>
  );
};

export default OperatorLayout;