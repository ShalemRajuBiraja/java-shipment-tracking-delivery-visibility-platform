import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Persistent Sidebar */}
      <AdminSidebar />

      {/* Right Side */}
      <main className="flex-1 ml-0 lg:ml-64 p-4 pt-20 md:p-5 md:pt-20 lg:pt-5">

        {/* Persistent Header */}
        <AdminHeader />

        {/* Dynamic Content */}
        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;