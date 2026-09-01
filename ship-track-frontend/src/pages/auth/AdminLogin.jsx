import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import logo from "../../assets/images/ship-track-logo.png";
import { toast } from "react-toastify";
import { adminLoginApi } from "../../services/authService";
import { redirectBasedOnRole } from "../../utils/roleRedirect";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    favoriteTeacher: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    favoriteTeacher: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Admin login button clicked");
  const newErrors = {};

   if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

  if (!loginData.favoriteTeacher.trim()) {
    newErrors.favoriteTeacher = "Favorite teacher name is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
try {
  console.log("Calling Admin Login API...", loginData);

  const response = await adminLoginApi(loginData);

  console.log("Response Data:", response.data);

  const userData = {
    id: response.data.id,
    email: response.data.email,
    role: response.data.role,
  };

  const token = response.data.token;

  // Store authentication data
  localStorage.setItem(
    "userData",
    JSON.stringify(userData)
  );

  localStorage.setItem("token", token);

  console.log("User Data:", userData);
  console.log("Role:", userData.role);

  toast.success("Admin login successful");

  // Redirect based on role
  redirectBasedOnRole(userData.role, navigate);

} catch (error) {
  console.error("Admin login error:", error);

  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    "Admin login failed";

  toast.error(errorMessage);
}
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

        {/* Logo */}
        <div className="mb-6 flex flex-col items-center text-center">

          <h1 className="text-2xl font-bold text-slate-900">
            Admin Login Only
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access the administration dashboard
          </p>
        </div>

        {/* Admin Badge */}
        <div className="mb-6 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-center">
          <p className="text-sm font-medium text-emerald-700">
            ShipTrack Pro Administration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            id="admin-email"
            name="email"
            type="email"
            label="Admin Email"
            placeholder="Enter admin email"
            value={loginData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            id="admin-password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            showPasswordToggle
          />

          {/* Favorite Teacher */}
          <Input
            id="favorite-teacher"
            name="favoriteTeacher"
            type="text"
            label="Favorite Teacher Name"
            placeholder="Enter your favorite teacher name"
            value={loginData.favoriteTeacher}
            onChange={handleChange}
            error={errors.favoriteTeacher}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            Login as Admin
          </Button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;