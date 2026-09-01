import {
  Truck,
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Headphones,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Shipments",
      icon: Package,
      path: "/admin/shipments",
    },
    {
      name: "Create Shipment",
      icon: PlusCircle,
      path: "/admin/create-shipment",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

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

  const handleSupportClick = () => {
    alert("Currently unavailable!");
  };

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
        className={`fixed left-0 top-0 h-screen w-64 bg-emerald-950 text-white flex flex-col z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* Logo */}
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
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Mobile Close */}
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

          {/* Logout */}
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

          {/* Support */}
          {/* Support */}
<div className="bg-emerald-900 rounded-lg p-3 text-center border border-emerald-800">

  <div className="flex items-center justify-center gap-2 mb-2">

    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
      <Headphones
        size={17}
        className="text-emerald-300"
      />
    </div>

    <h3 className="font-semibold text-sm">
      Need Help?
    </h3>

  </div>

  <p className="text-xs text-emerald-100 mb-2">
    Contact our support team
  </p>

  <button
    onClick={handleSupportClick}
    className="w-full bg-emerald-600 hover:bg-emerald-500 py-1.5 rounded-lg text-xs font-medium transition"
  >
    Support Center
  </button>

</div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;