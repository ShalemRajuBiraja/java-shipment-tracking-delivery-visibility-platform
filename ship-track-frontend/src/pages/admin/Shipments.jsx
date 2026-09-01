import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Shipments = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [shipments, setShipments] = useState([
    {
      id: 1,
      trackingNumber: "TRK100001",
      senderName: "ABC Electronics",
      receiverName: "Ramesh Kumar",
      packageDescription: "Electronics Package",
      deliveryAddress: "Hyderabad, Telangana",
      status: "ON_GOING",
      createdAt: "01 Sep 2026",
    },
    {
      id: 2,
      trackingNumber: "TRK100002",
      senderName: "Tech Solutions",
      receiverName: "Priya Sharma",
      packageDescription: "Laptop Accessories",
      deliveryAddress: "Bangalore, Karnataka",
      status: "DELIVERED",
      createdAt: "30 Aug 2026",
    },
    {
      id: 3,
      trackingNumber: "TRK100003",
      senderName: "Global Traders",
      receiverName: "Amit Kumar",
      packageDescription: "Documents",
      deliveryAddress: "Chennai, Tamil Nadu",
      status: "ORDER_PLACED",
      createdAt: "30 Aug 2026",
    },
    {
      id: 4,
      trackingNumber: "TRK100004",
      senderName: "Quick Mart",
      receiverName: "Sneha Reddy",
      packageDescription: "Clothing Package",
      deliveryAddress: "Mumbai, Maharashtra",
      status: "OUT_FOR_DELIVERY",
      createdAt: "29 Aug 2026",
    },
    {
      id: 5,
      trackingNumber: "TRK100005",
      senderName: "Office Supplies",
      receiverName: "Arjun Patel",
      packageDescription: "Office Equipment",
      deliveryAddress: "Delhi",
      status: "PACKED",
      createdAt: "29 Aug 2026",
    },
  ]);

  const getStatusLabel = (status) => {
    const labels = {
      ORDER_PLACED: "Order Placed",
      PACKED: "Packed",
      PICKED: "Picked",
      ON_GOING: "On Going",
      OUT_FOR_DELIVERY: "Out for Delivery",
      DELIVERED: "Delivered",
    };

    return labels[status] || status;
  };

  const getStatusStyle = (status) => {
    const styles = {
      ORDER_PLACED: "bg-slate-100 text-slate-700",
      PACKED: "bg-yellow-50 text-yellow-700",
      PICKED: "bg-blue-50 text-blue-700",
      ON_GOING: "bg-purple-50 text-purple-700",
      OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700",
      DELIVERED: "bg-emerald-50 text-emerald-700",
    };

    return styles[status] || "bg-slate-100 text-slate-700";
  };

  const filteredShipments = shipments.filter((shipment) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(search) ||
      shipment.senderName.toLowerCase().includes(search) ||
      shipment.receiverName.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" ||
      shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalShipments = shipments.length;

  const activeShipments = shipments.filter(
    (shipment) =>
      shipment.status === "ON_GOING" ||
      shipment.status === "OUT_FOR_DELIVERY"
  ).length;

  const deliveredShipments = shipments.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;

  const pendingShipments = shipments.filter(
    (shipment) =>
      shipment.status === "ORDER_PLACED" ||
      shipment.status === "PACKED"
  ).length;

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shipment?"
    );

    if (!confirmed) return;

    setShipments((previous) =>
      previous.filter((shipment) => shipment.id !== id)
    );

    toast.success("Shipment deleted successfully");
  };

  const handleView = (shipment) => {
    console.log("View Shipment:", shipment);

    toast.info(
      `Viewing shipment: ${shipment.trackingNumber}`
    );
  };

  const handleEdit = (shipment) => {
    console.log("Edit Shipment:", shipment);

    toast.info(
      `Editing shipment: ${shipment.trackingNumber}`
    );
  };

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Shipment Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View and manage all shipments.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/create-shipment")
          }
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          <Plus size={18} />

          Create Shipment
        </button>

      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-slate-500">
                Total
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-1">
                {totalShipments}
              </h3>
            </div>

            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
              <Package
                size={19}
                className="text-slate-600"
              />
            </div>

          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-slate-500">
                Active
              </p>

              <h3 className="text-xl font-bold text-blue-600 mt-1">
                {activeShipments}
              </h3>
            </div>

            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <Truck
                size={19}
                className="text-blue-600"
              />
            </div>

          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-slate-500">
                Delivered
              </p>

              <h3 className="text-xl font-bold text-emerald-600 mt-1">
                {deliveredShipments}
              </h3>
            </div>

            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle2
                size={19}
                className="text-emerald-600"
              />
            </div>

          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs text-slate-500">
                Pending
              </p>

              <h3 className="text-xl font-bold text-orange-600 mt-1">
                {pendingShipments}
              </h3>
            </div>

            <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock
                size={19}
                className="text-orange-600"
              />
            </div>

          </div>
        </div>

      </div>


      {/* Shipment Table Section */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

        {/* Search and Filter */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search tracking number, sender or receiver..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />

          </div>


          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full md:w-52 px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ORDER_PLACED">
              Order Placed
            </option>

            <option value="PACKED">
              Packed
            </option>

            <option value="PICKED">
              Picked
            </option>

            <option value="ON_GOING">
              On Going
            </option>

            <option value="OUT_FOR_DELIVERY">
              Out for Delivery
            </option>

            <option value="DELIVERED">
              Delivered
            </option>
          </select>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Tracking Number
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Sender
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Receiver
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Package
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Delivery Address
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Status
                </th>

                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500">
                  Actions
                </th>
              </tr>

            </thead>


            <tbody>

              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (

                  <tr
                    key={shipment.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                      {shipment.trackingNumber}
                    </td>


                    <td className="px-5 py-4 text-sm text-slate-700">
                      {shipment.senderName}
                    </td>


                    <td className="px-5 py-4 text-sm text-slate-700">
                      {shipment.receiverName}
                    </td>


                    <td className="px-5 py-4 text-sm text-slate-600">
                      {shipment.packageDescription}
                    </td>


                    <td className="px-5 py-4 text-sm text-slate-600">
                      {shipment.deliveryAddress}
                    </td>


                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          shipment.status
                        )}`}
                      >
                        {getStatusLabel(shipment.status)}
                      </span>

                    </td>


                    <td className="px-5 py-4">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() =>
                            handleView(shipment)
                          }
                          title="View Shipment"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Eye size={18} />
                        </button>


                        <button
                          onClick={() =>
                            handleEdit(shipment)
                          }
                          title="Edit Shipment"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                        >
                          <Pencil size={18} />
                        </button>


                        <button
                          onClick={() =>
                            handleDelete(shipment.id)
                          }
                          title="Delete Shipment"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="py-10 text-center text-sm text-slate-500"
                  >
                    No shipments found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>


        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 text-sm text-slate-500">
          Showing {filteredShipments.length} of {shipments.length} shipments
        </div>

      </section>

    </div>
  );
};

export default Shipments;