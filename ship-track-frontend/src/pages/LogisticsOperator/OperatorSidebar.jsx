import { 
  Truck, 
  LayoutDashboard, 
  Package, 
  Search, 
  BarChart3,
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Headphones, 
  LifeBuoy   
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const OperatorSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "My Shipments",
      icon: Package,
      path: "/logistics-operator/shipments",
    },
     { 
    name: "Settings", 
    icon: Settings, 
    path: "/logistics-operator/settings", 
  },
  {
  name: "Support",
  icon: LifeBuoy,   // <-- was Support
  path: "/logistics-operator/support",
},
  ];

  // Logout
  const handleLogout = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      toast.warning("Logged out successfully!");

      navigate("/");
    }
  };

  // Support
  const handleSupportClick = () => {
    toast.info("Contact Support Agent for assistance.");
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-950 flex items-center justify-between px-4 z-50 shadow-md">

        <div className="flex items-center gap-2">
          <Truck
            size={26}
            className="text-emerald-400"
          />

          <span className="text-white font-bold text-lg">
            QuickShip
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-white p-2 hover:bg-emerald-900 rounded-lg transition"
        >
          <Menu size={24} />
        </button>

      </div>


      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}


      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-emerald-950 text-white flex flex-col z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* ================= LOGO ================= */}
        <div className="px-5 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Truck
              size={30}
              className="text-emerald-400"
            />

            <div>
              <h1 className="text-xl font-bold">
                QuickShip
              </h1>

              <p className="text-xs text-emerald-200 mt-0.5">
                Logistics Operator
              </p>
            </div>

          </div>


          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-emerald-900 rounded-lg"
          >
            <X size={22} />
          </button>

        </div>


        {/* ================= NAVIGATION ================= */}
        <nav className="px-3 space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-emerald-600 shadow-md"
                      : "hover:bg-emerald-900"
                  }`
                }
              >
                <Icon size={20} />

                <span className="text-sm font-medium">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </nav>


        {/* ================= BOTTOM SECTION ================= */}
        <div className="mt-auto px-4 pb-5">

          {/* Divider */}
          <div className="border-t border-emerald-800 mb-5" />


         {/* Need Help Section */}
          

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-7 py-4 rounded-xl
            text-red-300 hover:text-white
            hover:bg-red-500/20
            border border-red-500/30
            hover:border-red-400/50
            transition-all duration-200"
          >

            <LogOut size={25} />

            <span className="text-lg font-semibold">
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
};

export default OperatorSidebar;