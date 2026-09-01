import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Save,
} from "lucide-react";

const Settings = () => {
  return (
    <div>

      {/* Header */}
      <div className="mb-5">

        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account information and preferences.
        </p>

      </div>


      {/* Profile Settings */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-5">

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


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Customer"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />

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
                defaultValue="customer@email.com"
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
                defaultValue="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />

            </div>

          </div>

        </div>


        {/* Save Button */}
        <div className="mt-5 flex justify-end">

          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">

            <Save size={17} />

            Save Changes

          </button>

        </div>

      </section>


      {/* Password Settings */}
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
              Change Password
            </h2>

            <p className="text-sm text-slate-500">
              Keep your account secure.
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Current Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
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
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />

          </div>

        </div>


        <div className="mt-5 flex justify-end">

          <button className="flex items-center gap-2 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-lg text-sm font-semibold transition">

            <Lock size={17} />

            Update Password

          </button>

        </div>

      </section>


      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 QuickShip. All rights reserved.
      </footer>

    </div>
  );
};

export default Settings;