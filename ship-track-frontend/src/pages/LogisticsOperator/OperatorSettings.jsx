import { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../services/authService";

const OperatorSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= SHOW/HIDE PASSWORD =================
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShowPassword = (field) => {
    setShowPassword((previous) => ({
      ...previous,
      [field]: !previous[field],
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

  // ================= UPDATE PASSWORD =================
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
    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account security settings.
        </p>
      </div>


      {/* ================= PASSWORD & SECURITY ================= */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 max-w-lg">

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


        {/* ================= PASSWORD FORM ================= */}
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
                  type={showPassword.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => toggleShowPassword("currentPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword.currentPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
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

                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => toggleShowPassword("newPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword.newPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
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

                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => toggleShowPassword("confirmPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

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


      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-2">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default OperatorSettings;