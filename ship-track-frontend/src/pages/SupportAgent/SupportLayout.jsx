import { Outlet } from "react-router-dom";
import SupportSidebar from "./SupportSidebar";

const SupportLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <SupportSidebar />

      <main className="ml-0 flex-1 p-4 pt-20 md:p-5 md:pt-20 lg:ml-64 lg:pt-5">
        <Outlet />
      </main>

    </div>
  );
};

export default SupportLayout;