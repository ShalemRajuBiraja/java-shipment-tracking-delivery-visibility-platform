import { useState } from "react";
import {
  PackagePlus,
  UserRound,
  MapPin,
  Package,
  Building2,
  Phone,
} from "lucide-react";
import { toast } from "react-toastify";

const CreateShipment = () => {
  const initialData = {
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    packageName: "",
    packageDescription: "",
    weight: "",
    deliveryAddress: "",
    status: "ORDER_PLACED",
  };

  const [shipmentData, setShipmentData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShipmentData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (
      !shipmentData.senderName ||
      !shipmentData.senderPhone ||
      !shipmentData.receiverName ||
      !shipmentData.receiverPhone ||
      !shipmentData.packageName ||
      !shipmentData.weight ||
      !shipmentData.deliveryAddress
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    console.log("Business Client Shipment:", shipmentData);

    // Backend API integration later
    toast.success("Shipment request created successfully!");

    handleReset();
  };

  const handleReset = () => {
    setShipmentData(initialData);
  };

  return (
    <div className="w-full">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Create Shipment
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Enter shipment details to create a new delivery request.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* ================= SENDER + RECEIVER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Sender Details */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Building2
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Sender Details
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Enter sender information.
                </p>
              </div>

            </div>


            <div className="space-y-4">

              {/* Sender Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sender Name *
                </label>

                <div className="relative">

                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="senderName"
                    value={shipmentData.senderName}
                    onChange={handleChange}
                    placeholder="Enter sender name"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>


              {/* Sender Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sender Phone *
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="senderPhone"
                    value={shipmentData.senderPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>

            </div>

          </section>


          {/* Receiver Details */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <UserRound
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Receiver Details
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Enter receiver information.
                </p>
              </div>

            </div>


            <div className="space-y-4">

              {/* Receiver Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receiver Name *
                </label>

                <div className="relative">

                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="receiverName"
                    value={shipmentData.receiverName}
                    onChange={handleChange}
                    placeholder="Enter receiver name"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>


              {/* Receiver Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receiver Phone *
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="receiverPhone"
                    value={shipmentData.receiverPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>

            </div>

          </section>

        </div>


        {/* ================= PRODUCT DETAILS ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Package
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Product Details
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Provide information about the shipment package.
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name *
              </label>

              <input
                type="text"
                name="packageName"
                value={shipmentData.packageName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>


            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight (kg) *
              </label>

              <input
                type="number"
                name="weight"
                value={shipmentData.weight}
                onChange={handleChange}
                placeholder="Enter package weight"
                min="0"
                step="0.1"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

          </div>


          {/* Product Description */}
          <div className="mt-4">

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Description
            </label>

            <textarea
              name="packageDescription"
              value={shipmentData.packageDescription}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the product or package contents"
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />

          </div>

        </section>


        {/* ================= DELIVERY ADDRESS ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <MapPin
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Delivery Address
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Enter the complete destination address.
              </p>
            </div>

          </div>


          <textarea
            name="deliveryAddress"
            value={shipmentData.deliveryAddress}
            onChange={handleChange}
            rows="4"
            placeholder="House / Building, Street, City, State, PIN Code"
            className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

        </section>


        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Reset
          </button>


          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
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