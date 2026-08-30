import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="hidden w-60 flex-shrink-0 bg-[#07835f] text-white md:block">
      <div className="flex h-24 items-center border-b border-white/10 px-6">
        <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-400 text-xl">
          🚚
        </div>

        <h1 className="text-xl font-bold">
          ShipTrack
        </h1>
      </div>

      <nav className="p-4">
        <button
          onClick={() => navigate("/business/dashboard")}
          className="mb-2 flex w-full items-center rounded-lg bg-white px-4 py-3 text-left text-[#07835f]"
        >
          <span className="mr-3 text-xl">⌂</span>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/business/shipments")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">📦</span>
          <span>Shipments</span>
        </button>

        <button
          onClick={() => navigate("/business/shipments")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">⌖</span>
          <span>Track Shipment</span>
        </button>

        <button
          onClick={() => navigate("/business/orders")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">▣</span>
          <span>Orders</span>
        </button>

        <button
          onClick={() => navigate("/business/clients")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">♧</span>
          <span>Clients</span>
        </button>

        <button
          onClick={() => navigate("/business/reports")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">▥</span>
          <span>Reports</span>
        </button>

        <button
          onClick={() => navigate("/business/settings")}
          className="mb-2 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">⚙</span>
          <span>Settings</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-6 flex w-full items-center rounded-lg px-4 py-3 text-left hover:bg-[#096f53]"
        >
          <span className="mr-3 text-xl">↪</span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;