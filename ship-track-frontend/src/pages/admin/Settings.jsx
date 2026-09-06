import { useState } from "react";

import {
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { updateAdminPasswordApi } from "../../services/adminService";
import { toast } from "react-toastify";

const Settings = () => {

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // ================= PASSWORD CHANGE =================

  const handlePasswordSubmit = async (e) => {
 
     e.preventDefault();
 
     if (
       !passwordData.currentPassword ||
       !passwordData.newPassword ||
       !passwordData.confirmPassword
     ) {
 
       toast.error("Please fill all password fields.");
       return;
 
     }
 
 
     if (
       passwordData.newPassword !==
       passwordData.confirmPassword
     ) {
 
       toast.error("New passwords do not match.");
       return;
 
     }
 
 
     if (passwordData.newPassword.length < 6) {
 
       toast.error(
         "Password must contain at least 6 characters."
       );
 
       return;
 
     }
 
      try {
           const response = await updateAdminPasswordApi(passwordData.currentPassword, passwordData.newPassword);
     
           if (response.data.success === true) {
             toast.success("Password updated successfully!");
             setPasswordData({
               currentPassword: "",
               newPassword: "",
               confirmPassword: "",
             });
           } else {
             toast.error("Failed to update password. Please try again.");
           }
     
         } catch (error) {
           console.error("Error updating password:", error);
           toast.error("Failed to update password. Please try again.");
         }
   };


  return (

    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}

      <div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account security settings.
        </p>

      </div>


      {/* ================= PASSWORD SETTINGS ================= */}

      <section className="bg-white border border-slate-200 rounded-xl shadow-sm w-full max-w-lg">

        {/* Section Header */}

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


        {/* ================= PASSWORD FORM ================= */}

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


              <div className="relative">

                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 pr-11 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                >

                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* New Password */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>


              <div className="relative">

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 pr-11 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                >

                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm New Password
              </label>


              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 pr-11 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            <p className="text-xs text-slate-400">
              Password must contain at least 6 characters.
            </p>

          </div>


          {/* Update Button */}

          <div className="flex justify-end mt-5">

            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >

              <LockKeyhole size={17} />

              Update Password

            </button>

          </div>

        </form>

      </section>

    </div>

  );

};

export default Settings;