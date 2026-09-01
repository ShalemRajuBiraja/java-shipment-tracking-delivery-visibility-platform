import { useState } from "react";
import {
  PackagePlus,
  UserRound,
  MapPin,
  Package,
  Hash,
} from "lucide-react";
import { toast } from "react-toastify";

const CreateShipment = () => {
  const [shipmentData, setShipmentData] = useState({
    trackingNumber: "",
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    packageName: "",
    packageDescription: "",
    weight: "",
    deliveryAddress: "",
    status: "ORDER_PLACED",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShipmentData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Shipment Data:", shipmentData);

    toast.success("Shipment created successfully!");
  };

  const handleReset = () => {
    setShipmentData({
      trackingNumber: "",
      senderName: "",
      senderPhone: "",
      receiverName: "",
      receiverPhone: "",
      packageName: "",
      packageDescription: "",
      weight: "",
      deliveryAddress: "",
      status: "ORDER_PLACED",
    });
  };

  return (
    <div className="w-full">

      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Create Shipment
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Enter shipment information to create a new shipment.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm" >

        {/* Sender and Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-200">

          {/* Sender */}
          <div className="p-5 lg:border-r border-slate-200">

            <div className="flex items-center gap-2 mb-4">
              <UserRound size={20} className="text-emerald-600" />

              <h2 className="font-semibold text-slate-800">
                Sender Details
              </h2>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sender Name
                </label>

                <input
                  type="text"
                  name="senderName"
                  value={shipmentData.senderName}
                  onChange={handleChange}
                  placeholder="Enter sender name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sender Phone
                </label>

                <input
                  type="text"
                  name="senderPhone"
                  value={shipmentData.senderPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

            </div>

          </div>


          {/* Receiver */}
          <div className="p-5">

            <div className="flex items-center gap-2 mb-4">
              <UserRound size={20} className="text-emerald-600" />

              <h2 className="font-semibold text-slate-800">
                Receiver Details
              </h2>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receiver Name
                </label>

                <input
                  type="text"
                  name="receiverName"
                  value={shipmentData.receiverName}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receiver Phone
                </label>

                <input
                  type="text"
                  name="receiverPhone"
                  value={shipmentData.receiverPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

            </div>

          </div>

        </div>


        {/* Package Information */}
        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center gap-2 mb-4">
            <Package size={20} className="text-emerald-600" />

            <h2 className="font-semibold text-slate-800">
              Package Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Package Name
              </label>

              <input
                type="text"
                name="packageName"
                value={shipmentData.packageName}
                onChange={handleChange}
                placeholder="Enter package name"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={shipmentData.weight}
                onChange={handleChange}
                placeholder="Enter package weight"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Package Description
            </label>

            <textarea
              name="packageDescription"
              value={shipmentData.packageDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Enter package description"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>


        {/* Delivery Details */}
        <div className="p-5">

          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-emerald-600" />

            <h2 className="font-semibold text-slate-800">
              Delivery Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Delivery Address
              </label>

              <textarea
                name="deliveryAddress"
                value={shipmentData.deliveryAddress}
                onChange={handleChange}
                rows="3"
                placeholder="Enter complete delivery address"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Shipment Status
              </label>

              <select
                name="status"
                value={shipmentData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
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

          </div>

        </div>


        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-xl">

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
          >
            <PackagePlus size={18} />

            Create Shipment
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateShipment;