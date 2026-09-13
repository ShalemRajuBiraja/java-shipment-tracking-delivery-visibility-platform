import { useState } from "react";
import { toast } from "react-toastify";

import {
  PackagePlus,
  User,
  MapPin,
  Truck,
  Package,
  Loader2,
} from "lucide-react";

import { createShipmentApi } from "../../services/shipmentService";

const CreateShipment = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",

    pickupAddress: "",
    pickupCity: "",
    pickupState: "",
    pickupPincode: "",

    deliveryAddress: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryPincode: "",

    packageDescription: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.receiverName ||
      !formData.receiverPhone ||
      !formData.pickupAddress ||
      !formData.pickupCity ||
      !formData.pickupState ||
      !formData.pickupPincode ||
      !formData.deliveryAddress ||
      !formData.deliveryCity ||
      !formData.deliveryState ||
      !formData.deliveryPincode ||
      !formData.weight
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await createShipmentApi(formData);
      if (response.data.success === true) {
        toast.success("Shipment created successfully!");

        setFormData({
          receiverName: "",
          receiverPhone: "",

          pickupAddress: "",
          pickupCity: "",
          pickupState: "",
          pickupPincode: "",

          deliveryAddress: "",
          deliveryCity: "",
          deliveryState: "",
          deliveryPincode: "",

          packageDescription: "",
          weight: "",
        });
      } else {
        toast.error(
          response.data.message || "Failed to create shipment."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while creating shipment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 md:p-7 max-w-6xl mx-auto">

      {/* PAGE HEADER */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-emerald-50 rounded-xl">
            <PackagePlus
              size={24}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Create Shipment
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Enter shipment details to create a new delivery.
            </p>
          </div>

        </div>

      </div>


      {/* MAIN FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* RECEIVER INFORMATION */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Section Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-emerald-50 rounded-lg">
              <User
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Receiver Information
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Enter the recipient details.
              </p>
            </div>

          </div>


          {/* Fields */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Receiver Name */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Receiver Name
              </label>

              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                placeholder="Enter receiver name"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>


            {/* Receiver Phone */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>

              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>

          </div>

        </section>


        {/* PICKUP LOCATION */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-emerald-50 rounded-lg">
              <MapPin
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Pickup Location
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Enter where the shipment will be collected.
              </p>
            </div>

          </div>


          {/* Fields */}
          <div className="p-5 space-y-5">

            {/* Pickup Address */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Pickup Address
              </label>

              <textarea
                rows="3"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Enter complete pickup address"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>


            {/* City State Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* City */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  City
                </label>

                <input
                  type="text"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>


              {/* State */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  State
                </label>

                <input
                  type="text"
                  name="pickupState"
                  value={formData.pickupState}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>


              {/* Pincode */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pickupPincode"
                  value={formData.pickupPincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>

            </div>

          </div>

        </section>


        {/* DELIVERY LOCATION */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-blue-50 rounded-lg">
              <Truck
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Delivery Location
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Enter where the shipment should be delivered.
              </p>
            </div>

          </div>


          {/* Fields */}
          <div className="p-5 space-y-5">

            {/* Delivery Address */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Delivery Address
              </label>

              <textarea
                rows="3"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Enter complete delivery address"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>


            {/* City State Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* City */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  City
                </label>

                <input
                  type="text"
                  name="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>


              {/* State */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  State
                </label>

                <input
                  type="text"
                  name="deliveryState"
                  value={formData.deliveryState}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>


              {/* Pincode */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Pincode
                </label>

                <input
                  type="text"
                  name="deliveryPincode"
                  value={formData.deliveryPincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>

            </div>

          </div>

        </section>


        {/* PACKAGE DETAILS */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-amber-50 rounded-lg">
              <Package
                size={20}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Package Details
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Enter information about the shipment package.
              </p>
            </div>

          </div>


          {/* Fields */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Package Description */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Package Description
              </label>

              <textarea
                rows="3"
                name="packageDescription"
                value={formData.packageDescription}
                onChange={handleChange}
                placeholder="Describe the package contents"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>


            {/* Weight */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Package Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                placeholder="Enter weight in kg"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <p className="text-xs text-slate-400 mt-2">
                Minimum weight: 0.1 kg
              </p>

            </div>

          </div>

        </section>


        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pb-6">

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg text-sm font-semibold transition shadow-sm"
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Creating...
              </>
            ) : (
              <>
                <PackagePlus size={18} />

                Create Shipment
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateShipment;