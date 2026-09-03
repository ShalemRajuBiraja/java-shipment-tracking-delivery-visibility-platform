import { Outlet } from "react-router-dom";
import BusinessSidebar from "./BusinessSidebar";

const BusinessLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <BusinessSidebar />

      <main className="lg:ml-64 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
};

export default BusinessLayout;