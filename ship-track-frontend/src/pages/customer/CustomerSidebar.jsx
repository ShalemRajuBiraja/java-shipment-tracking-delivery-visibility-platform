import {
  Truck,
  LayoutDashboard,
  Search,
  PackageCheck,
  Settings,
  LogOut,
  Headphones,
  Menu,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const CustomerSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/customer/dashboard",
    },
    {
      name: "Track Shipment",
      icon: Search,
      path: "/customer/track-shipment",
    },
    {
      name: "Shipment History",
      icon: PackageCheck,
      path: "/customer/shipment-history",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/customer/settings",
    },
  ];

const handleLogout = () => {
  const isConfirmed = window.confirm(
    "Are you sure you want to logout?"
  );

  if (isConfirmed) {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    toast.success("Logged out successfully!");
    // Navigate to home page
    navigate("/");
  }
};

const handleSupportClick = () => {
    alert("currently unavailable!");
}

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-950 flex items-center justify-between px-4 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Truck size={26} className="text-emerald-400" />

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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-emerald-950 text-white flex flex-col z-50 transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck size={30} className="text-emerald-400" />

            <div>
              <h1 className="text-xl font-bold">
                QuickShip
              </h1>

              <p className="text-xs text-emerald-200 mt-0.5">
                Customer Dashboard
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

        {/* Navigation */}
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

        {/* Bottom Section */}
        <div className="mt-auto p-4">
          <div className="border-t border-emerald-800 mb-4" />

            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                            text-red-300 hover:text-white 
                            hover:bg-red-500/20 
                            border border-red-500/20 
                            hover:border-red-400/40
                            transition-all duration-200 mb-4"
                >
                <LogOut size={20} />

                <span className="text-sm font-semibold">
                    Logout
                </span>
            </button>
          {/* Support Card */}
          <div className="bg-emerald-900 rounded-lg p-4 text-center border border-emerald-800">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center">
                <Headphones
                  size={21}
                  className="text-emerald-300"
                />
              </div>
            </div>

            <h3 className="font-semibold text-sm">
              Need Help?
            </h3>

            <p className="text-xs text-emerald-100 mt-1 mb-3">
              Contact our support team
            </p>

            <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-medium transition" onClick={handleSupportClick}>
              Support Center
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CustomerSidebar;