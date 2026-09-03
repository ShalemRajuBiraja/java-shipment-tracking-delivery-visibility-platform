import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Save,
  ShieldCheck,
  Send,
  IdCard,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";

const OperatorSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "Logistics Operator",
    email: "operator@email.com",
    phone: "+91 98765 43210",
    licenseId: "LIC-2026-001",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    operatorId: "",
    issue: "",
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;

    setContactData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    console.log("Profile Data:", profileData);
    toast.success("Profile updated successfully!");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error("New passwords do not match!");
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

  const handleContactSubmit = (event) => {
    event.preventDefault();

    console.log("Contact Admin:", contactData);
    toast.success("Your request has been sent to the administrator!");

    setContactData({
      name: "",
      email: "",
      operatorId: "",
      issue: "",
    });
  };

  return (
    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your operator profile, security, and administrator support.
        </p>
      </div>


      {/* ================= TOP TWO CARDS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">


        {/* ================= OPERATOR PROFILE ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <UserRound
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Operator Profile
              </h2>

              <p className="text-sm text-slate-500">
                Update your operator information.
              </p>
            </div>

          </div>


          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit}>

            <div className="space-y-4">


              {/* Operator Name */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Operator Name
                </label>

                <div className="relative">

                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>


              {/* Email */}
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
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>


              {/* Phone */}
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
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>


              {/* License ID */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  License ID
                </label>

                <div className="relative">

                  <IdCard
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="licenseId"
                    value={profileData.licenseId}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>

            </div>


            {/* Save */}
            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <Save size={17} />

                Save Profile
              </button>

            </div>

          </form>

        </section>


        {/* ================= PASSWORD & SECURITY ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Password & Security
              </h2>

              <p className="text-sm text-slate-500">
                Keep your account secure.
              </p>
            </div>

          </div>


          {/* Password Form */}
          <form onSubmit={handlePasswordSubmit}>

            <div className="space-y-4">


              {/* Current Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>


              {/* New Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>


              {/* Confirm Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                </div>

              </div>

            </div>


            {/* Update Password */}
            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <Lock size={17} />

                Update Password
              </button>

            </div>

          </form>

        </section>

      </div>


             {/* ================= CONTACT ADMIN ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

                {/* Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <MessageSquare
                    size={20}
                    className="text-emerald-600"
                    />
                </div>

                <div>
                    <h2 className="font-bold text-slate-800">
                    Contact Administrator
                    </h2>

                    <p className="text-sm text-slate-500">
                    Send your issue directly to the administrator.
                    </p>
                </div>

                </div>


                {/* Contact Form */}
                <form onSubmit={handleContactSubmit}>

                <div className="space-y-4">

                    <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={contactData.name}
                        onChange={handleContactChange}
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    </div>


                    <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    </div>


                    <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Operator ID
                    </label>

                    <input
                        type="text"
                        name="operatorId"
                        placeholder="Enter your operator ID"
                        value={contactData.operatorId}
                        onChange={handleContactChange}
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    </div>


                    <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Describe Your Issue
                    </label>

                    <textarea
                        name="issue"
                        rows="4"
                        placeholder="Explain your issue clearly..."
                        value={contactData.issue}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500"
                    />
                    </div>

                </div>


                <div className="flex justify-end mt-5">

                    <button
                    type="submit"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                    <Send size={17} />

                    Send Request
                    </button>

                </div>

                </form>

            </section>

            </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-2">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default OperatorSettings;