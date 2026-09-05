import { useState } from "react";

import {
  User,
  Mail,
  ShieldCheck,
  LockKeyhole,
  Save,
} from "lucide-react";


const Settings = () => {

  // ================= PROFILE DATA =================

  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "admin@gmail.com",
  });


  // ================= PASSWORD DATA =================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  // ================= PROFILE CHANGE =================

  const handleProfileChange = (event) => {

    const { name, value } = event.target;

    setProfileData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ================= PASSWORD CHANGE =================

  const handlePasswordChange = (event) => {

    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ================= SAVE PROFILE =================

  const handleProfileSubmit = (event) => {

    event.preventDefault();

    // Backend API integration later
    console.log("Profile Data:", profileData);

  };


  // ================= UPDATE PASSWORD =================

  const handlePasswordSubmit = (event) => {

    event.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {

      alert("New passwords do not match!");
      return;

    }


    // Backend API integration later

    console.log("Password Updated");


    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });


    alert("Password updated successfully!");

  };


  return (

    <div className="space-y-5">


      {/* ================= PAGE HEADER ================= */}

      <div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account and security settings.
        </p>

      </div>


      {/* ================= SETTINGS CARDS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">


        {/* ================= PROFILE SETTINGS CARD ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">


          {/* Card Header */}

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">

              <User
                size={18}
                className="text-emerald-600"
              />

            </div>


            <div>

              <h2 className="text-base font-bold text-slate-800">
                Profile Information
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Update your basic account information.
              </p>

            </div>

          </div>


          {/* Profile Form */}

          <form
            onSubmit={handleProfileSubmit}
            className="p-5"
          >


            <div className="space-y-4">


              {/* Full Name */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>


                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />


                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />

                </div>

              </div>


              {/* Account Role */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Account Role
                </label>


                <div className="flex items-center gap-3 px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg">

                  <ShieldCheck
                    size={18}
                    className="text-emerald-600"
                  />


                  <span className="text-sm font-medium text-slate-700">
                    Administrator
                  </span>

                </div>

              </div>


            </div>


            {/* Save Button */}

            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >

                <Save size={17} />

                Save Changes

              </button>

            </div>


          </form>

        </section>


        {/* ================= PASSWORD SETTINGS CARD ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">


          {/* Card Header */}

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">

              <LockKeyhole
                size={18}
                className="text-emerald-600"
              />

            </div>


            <div>

              <h2 className="text-base font-bold text-slate-800">
                Update Password
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Change your password to keep your account secure.
              </p>

            </div>

          </div>


          {/* Password Form */}

          <form
            onSubmit={handlePasswordSubmit}
            className="p-5"
          >


            <div className="space-y-4">


              {/* Current Password */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password
                </label>


                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />

              </div>


              {/* New Password */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>


                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />

              </div>


              {/* Confirm Password */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>


                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />

              </div>


            </div>


            {/* Update Button */}

            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
              >

                <LockKeyhole size={17} />

                Update Password

              </button>

            </div>


          </form>

        </section>


      </div>

    </div>

  );

};


export default Settings;