import { useState } from "react";
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  Send,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import { createShipmentApi } from "../../services/shipmentService";


const CreateBusinessShipment = () => {

  const [creatingShipment, setCreatingShipment] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",

    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",

    productName: "",
    productCategory: "",
    quantity: "",
    weight: "",

    pickupAddress: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setCreatingShipment(true);

  try {
    const response = await createShipmentApi(formData);

    console.log("Shipment creation response:", response.data);
    if (response.data.success === true) {
        toast.success("Shipment created successfully!");
    }

    setFormData({
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      receiverName: "",
      receiverEmail: "",
      receiverPhone: "",
      productName: "",
      productCategory: "",
      quantity: "",
      weight: "",
      pickupAddress: "",
      deliveryAddress: "",
      city: "",
      state: "",
      pincode: "",
    });

  } catch (error) {
    console.error("Shipment creation error:", error);
    toast.error(error.message || "Something went wrong!");
  } finally {
    setCreatingShipment(false);
  }
};

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Truck size={22} className="text-emerald-600" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              Create Shipment
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Enter shipment details to create a new delivery request.
            </p>
          </div>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Sender Details */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

            {/* Card Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <User size={19} className="text-emerald-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Sender Details
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Enter sender contact information.
                </p>
              </div>

            </div>


            {/* Card Content */}
            <div className="p-5 space-y-4">

              {/* Sender Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sender Name
                </label>

                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="Enter sender name"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>


              {/* Sender Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>


              {/* Sender Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>

            </div>

          </section>


          {/* Receiver Details */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

            {/* Card Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <User size={19} className="text-blue-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Receiver Details
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Enter receiver contact information.
                </p>
              </div>

            </div>


            {/* Card Content */}
            <div className="p-5 space-y-4">

              {/* Receiver Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receiver Name
                </label>

                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>


              {/* Receiver Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="receiverEmail"
                    value={formData.receiverEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>


              {/* Receiver Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="receiverPhone"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>
              </div>

            </div>

          </section>

        </div>


        {/* Product Details */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Package size={19} className="text-purple-600" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Product Details
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Provide information about the shipment.
              </p>
            </div>

          </div>


          <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>


            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>

              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  Select category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>


            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
                required
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>


            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight (KG)
              </label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                min="1"
                required
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          </div>

        </section>


        {/* Delivery Address */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <MapPin size={19} className="text-orange-600" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Delivery Address
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Provide pickup and destination information.
              </p>
            </div>

          </div>


          <div className="p-5 space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Pickup Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pickup Address
                </label>

                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  rows="4"
                  required
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>


              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Delivery Address
                </label>

                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  rows="4"
                  required
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>


              {/* State */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>


              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

            </div>

          </div>

        </section>


        {/* Submit */}
        <div className="flex justify-end">

          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <Send size={18} />

            Create Shipment
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateBusinessShipment;