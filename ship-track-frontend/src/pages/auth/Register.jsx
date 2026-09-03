import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import logo from "../../assets/images/ship-track-logo.png";
import { registerApi } from "../../services/authService";
import { toast } from "react-toastify";
import authBackground from "../../assets/images/bg-image.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phoneNumber: "",
    email: "",
    password: "",

    // Business Client
    companyName: "",
    gstId: "",

    // Logistics Operator
    logisticsCompanyName: "",
    transportLicenseNumber: "",

    // Support Agent
    employeeId: "",
  });

  const [errors, setErrors] = useState({});

  // 1. Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // 2. Validate form
  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Account Type
    if (!formData.role) {
      newErrors.role = "Please select your account type";
    }

    // Phone Number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    // Role-based validation
    if (formData.role === "BUSINESS_CLIENT") {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }

      if (!formData.gstId.trim()) {
        newErrors.gstId = "GSTIN is required";
      }
    }

    if (formData.role === "LOGISTICS_OPERATOR") {
      if (!formData.logisticsCompanyName.trim()) {
        newErrors.logisticsCompanyName =
          "Logistics company name is required";
      }

      if (!formData.transportLicenseNumber.trim()) {
        newErrors.transportLicenseNumber =
          "Transport license number is required";
      }
    }

    if (formData.role === "SUPPORT_AGENT") {
      if (!formData.employeeId.trim()) {
        newErrors.employeeId = "Employee ID is required";
      }
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 3. Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const apiresponse = await registerApi(formData);

      if (apiresponse?.data?.success) {
        toast.success(apiresponse?.data?.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      console.log(message);

      setErrors((previous) => ({
        ...previous,
        apiError: true,
      }));

      toast.error(message);
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      {/* Optional light overlay for readability */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-6">
        {/* Registration Card */}
        <div className="flex h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          {/* ================= HEADER - FIXED ================= */}
          <div className="shrink-0 border-b border-slate-100 bg-white px-6 pb-6 pt-6 text-center sm:px-8">
            <span className="mx-auto flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-emerald-600">
              <img
                src={logo}
                alt="ShipTrack Pro"
                className="h-full w-full object-cover"
              />
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Join ShipTrack Pro and start managing your shipments.
            </p>
          </div>

          {/* ================= SCROLLABLE FORM ================= */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <Input
                id="signup-name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
              />

              {/* Account Type */}
              <div>
                <label
                  htmlFor="signup-role"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Account Type
                </label>

                <select
                  id="signup-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${
                    errors.role
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                >
                  <option value="">
                    Select your account type
                  </option>

                  <option value="CUSTOMER">
                    Customer
                  </option>

                  <option value="BUSINESS_CLIENT">
                    Business Client
                  </option>

                  <option value="LOGISTICS_OPERATOR">
                    Logistics Operator
                  </option>

                  <option value="SUPPORT_AGENT">
                    Support Agent
                  </option>
                </select>

                {errors.role && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.role}
                  </p>
                )}
              </div>

              {/* ================= BUSINESS CLIENT FIELDS ================= */}
              {formData.role === "BUSINESS_CLIENT" && (
                <>
                  <Input
                    id="signup-company-name"
                    name="companyName"
                    type="text"
                    label="Company Name"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={errors.companyName}
                  />

                  <Input
                    id="signup-gst-id"
                    name="gstId"
                    type="text"
                    label="GSTIN"
                    placeholder="Enter your GSTIN"
                    value={formData.gstId}
                    onChange={handleChange}
                    error={errors.gstId}
                  />
                </>
              )}

              {/* ================= LOGISTICS OPERATOR FIELDS ================= */}
              {formData.role === "LOGISTICS_OPERATOR" && (
                <>
                  <Input
                    id="signup-logistics-company"
                    name="logisticsCompanyName"
                    type="text"
                    label="Logistics Company Name"
                    placeholder="Enter your logistics company name"
                    value={formData.logisticsCompanyName}
                    onChange={handleChange}
                    error={errors.logisticsCompanyName}
                  />

                  <Input
                    id="signup-transport-license"
                    name="transportLicenseNumber"
                    type="text"
                    label="Transport License Number"
                    placeholder="Enter your transport license number"
                    value={formData.transportLicenseNumber}
                    onChange={handleChange}
                    error={errors.transportLicenseNumber}
                  />
                </>
              )}

              {/* ================= SUPPORT AGENT FIELDS ================= */}
              {formData.role === "SUPPORT_AGENT" && (
                <Input
                  id="signup-employee-id"
                  name="employeeId"
                  type="text"
                  label="Employee ID"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  error={errors.employeeId}
                />
              )}

              {/* ================= FIXED FIELDS ================= */}

              {/* Phone Number */}
              <Input
                id="signup-phone"
                name="phoneNumber"
                type="tel"
                label="Phone Number"
                placeholder="Enter your 10-digit phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
                autoComplete="tel"
              />

              {/* Email */}
              <Input
                id="signup-email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />

              {/* Password */}
              <Input
                id="signup-password"
                name="password"
                type="password"
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
                showPasswordToggle
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                Create Account
              </Button>
            </form>
          </div>

          {/* ================= FOOTER - FIXED ================= */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-5 text-center sm:px-8">
            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="mt-3 w-full"
            >
              Back to Login
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;