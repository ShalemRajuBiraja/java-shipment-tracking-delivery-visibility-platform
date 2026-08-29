import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import logo from "../../assets/images/ship-track-logo.png";
import { registerApi } from "../../services/authService";
import { toast } from "react-toastify";



const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    });
  const [errors, setErrors] = useState({});

  // 1. Handle input changes Function
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

    // 2. Validate form Function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.role) {
    newErrors.role = "Please select your account type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

    // 3. Handle form submission Function or API CALL
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try{
        const apiresponse = await registerApi(formData);

            if(apiresponse?.data?.success){
                toast.success(apiresponse?.data?.message);
            }
    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong";
        console.log(message);

        setErrors({
            ...errors,
            apiError: true
        });

        toast.error(message);
      }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        {/* Brand */}
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-emerald-600">
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                    <option value="">Select your account type</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="BUSINESS_CLIENT">Business Client</option>
                    <option value="LOGISTICS_OPERATOR">
                    Logistics Operator
                    </option>
                    <option value="SUPPORT_AGENT">Support Agent</option>
                </select>

                {errors.role && (
                    <p className="mt-1.5 text-xs text-red-600">
                    {errors.role}
                    </p>
                )}
                </div>

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

        {/* Login */}
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
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
  );
};

export default Register;