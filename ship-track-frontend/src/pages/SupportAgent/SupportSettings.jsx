import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Save,
  ShieldCheck,
  Send,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";

const SupportSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "Support Agent",
    email: "support@quickship.com",
    phone: "+91 98765 43210",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [adminMessage, setAdminMessage] = useState({
    subject: "",
    message: "",
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

  const handleAdminMessageChange = (event) => {
    const { name, value } = event.target;

    setAdminMessage((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    toast.success("Profile updated successfully!");

    console.log("Profile Data:", profileData);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill all password fields!");
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error("New passwords do not match!");
      return;
    }

    toast.success("Password updated successfully!");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleAdminMessageSubmit = (event) => {
    event.preventDefault();

    if (!adminMessage.subject || !adminMessage.message) {
      toast.error("Please fill all fields!");
      return;
    }

    toast.success("Message sent to administrator!");

    setAdminMessage({
      subject: "",
      message: "",
    });
  };

  return (
    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your profile, account security, and administrator communication.
        </p>
      </div>


      {/* ================= SETTINGS CARDS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* ================= PROFILE CARD ================= */}
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
                Profile Information
              </h2>

              <p className="text-sm text-slate-500">
                Update your personal details.
              </p>
            </div>

          </div>


          <form
            onSubmit={handleProfileSubmit}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
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
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />

              </div>
            </div>


            {/* Role */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">

              <ShieldCheck
                size={18}
                className="text-emerald-600"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Account Role
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  Support Agent
                </p>
              </div>

            </div>


            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              <Save size={17} />
              Save Changes
            </button>

          </form>

        </section>


        {/* ================= PASSWORD CARD ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">

            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Lock
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


          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4"
          >

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
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
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
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>


            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>


            <div className="pt-14">

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                <Lock size={17} />
                Update Password
              </button>

            </div>

          </form>

        </section>


        {/* ================= CONTACT ADMIN CARD ================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

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
                Send a message to the administrator.
              </p>
            </div>

          </div>


          <form
            onSubmit={handleAdminMessageSubmit}
            className="space-y-4"
          >

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter message subject"
                value={adminMessage.subject}
                onChange={handleAdminMessageChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>


            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>

              <textarea
                name="message"
                rows="4"
                placeholder="Describe your issue or request..."
                value={adminMessage.message}
                onChange={handleAdminMessageChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>


            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              <Send size={17} />
              Send Message
            </button>

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

export default SupportSettings;