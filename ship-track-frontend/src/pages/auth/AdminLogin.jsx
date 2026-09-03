import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import logo from "../../assets/images/ship-track-logo.png";
import authBackground from "../../assets/images/bg-image.png";
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

    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        loginData.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!loginData.favoriteTeacher.trim()) {
      newErrors.favoriteTeacher =
        "Favorite teacher name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await adminLoginApi(loginData);

      const userData = {
        id: response.data.id,
        email: response.data.email,
        role: response.data.role,
      };

      const token = response.data.token;

      localStorage.setItem(
        "userData",
        JSON.stringify(userData)
      );

      localStorage.setItem("token", token);

      toast.success("Admin login successful");

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
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-fixed bg-no-repeat px-4 py-8"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/20" />

      {/* Admin Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/50 bg-white p-8 shadow-2xl">

          {/* Logo */}
          <div className="mb-7 text-center">

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Administration Portal
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Secure access for ShipTrack Pro administrators.
            </p>
          </div>

          {/* Admin Badge */}
          <div className="mb-6 flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-semibold text-emerald-700">
              Authorized Access Only
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

            {/* Forgot Password */}
            <div className="-mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

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

          {/* Back */}
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
    </div>
  );
};

export default AdminLogin;