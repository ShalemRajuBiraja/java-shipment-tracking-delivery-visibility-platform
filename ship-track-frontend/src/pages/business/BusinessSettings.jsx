import { useState } from "react";
import { toast } from "react-toastify";

import {
  Building2,
  LockKeyhole,
} from "lucide-react";

const BusinessSettings = () => {

  const [businessData, setBusinessData] = useState({
    companyName: "ABC Logistics Pvt Ltd",
    email: "business@quickship.com",
    phone: "9876543210",
    address: "Hyderabad, Telangana",
  });


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleBusinessChange = (e) => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value,
    });
  };


  const handleBusinessSubmit = (e) => {
    e.preventDefault();

    console.log("Business Data:", businessData);

    toast.success("Business information updated successfully!");
  };


  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };


  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    console.log("Password Data:", passwordData);

    toast.success("Password updated successfully!");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };


  return (
    <div className="p-5 md:p-7 max-w-6xl">

      {/* PAGE HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your business information and account security.
        </p>

      </div>


      {/* SETTINGS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">


        {/* BUSINESS INFORMATION CARD */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col min-h-[510px]">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-emerald-50 rounded-lg">
              <Building2
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Business Information
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Update your business details
              </p>
            </div>

          </div>


          {/* Form */}
          <form
            onSubmit={handleBusinessSubmit}
            className="p-5 flex flex-col flex-1"
          >

            <div className="space-y-4">

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={businessData.companyName}
                  onChange={handleBusinessChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Business Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={businessData.email}
                  onChange={handleBusinessChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={businessData.phone}
                  onChange={handleBusinessChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Business Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={businessData.address}
                  onChange={handleBusinessChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

            </div>


            {/* Button pushed to bottom */}
            <div className="mt-auto pt-5">

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
              >
                Update Business Data
              </button>

            </div>

          </form>

        </section>


        {/* PASSWORD SETTINGS CARD */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col min-h-[510px]">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">

            <div className="p-2 bg-emerald-50 rounded-lg">
              <LockKeyhole
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Password & Security
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Update your account password
              </p>
            </div>

          </div>


          {/* Form */}
          <form
            onSubmit={handlePasswordSubmit}
            className="p-5 flex flex-col flex-1"
          >

            <div className="space-y-4">

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>


              {/* Requirement */}
              <p className="text-xs text-slate-400">
                Password must contain at least 6 characters.
              </p>

            </div>


            {/* Button pushed to bottom */}
            <div className="mt-auto pt-5">

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
              >
                Update Password
              </button>

            </div>

          </form>

        </section>

      </div>

    </div>
  );
};

export default BusinessSettings;