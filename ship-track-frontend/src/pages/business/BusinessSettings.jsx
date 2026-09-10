import { useState } from "react";
import { toast } from "react-toastify";

import {
  Building2,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { updatePasswordApi } from "../../services/authService";

const BusinessSettings = () => {

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };


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

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    try {
      const response = await updatePasswordApi(passwordData.currentPassword, passwordData.newPassword);

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
    <div className="p-5 md:p-7 max-w-xl">

      {/* PAGE HEADER */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account security and password.
        </p>

      </div>


      {/* PASSWORD SETTINGS CARD */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">

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


        {/* Password Form */}
        <form
          onSubmit={handlePasswordSubmit}
          className="p-5"
        >

          <div className="space-y-4">

            {/* Current Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-11 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
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

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-11 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
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

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm New Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-11 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* Password Requirement */}
            <p className="text-xs text-slate-400">
              Password must contain at least 6 characters.
            </p>

          </div>


          {/* Update Button */}
          <div className="mt-6">

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
  );
};

export default BusinessSettings;