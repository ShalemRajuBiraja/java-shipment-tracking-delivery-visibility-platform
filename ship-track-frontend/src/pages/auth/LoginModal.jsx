import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/authService";
import { toast } from "react-toastify";
import { redirectBasedOnRole } from "../../utils/redirectBasedOnRole";

const LoginModal = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
                                            email: "",
                                            password: "",
                                            });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
            const loginApiResponse = await loginApi(formData);

              if (loginApiResponse?.data?.success) {

                  // Get response data
                  const userData = loginApiResponse.data.data.userData;
                  const token = loginApiResponse.data.data.token;

                  // Store login data
                  localStorage.setItem( "userData", JSON.stringify(userData) );
                  localStorage.setItem("token", token);

                  // Show success message
                  toast.success(loginApiResponse.data.message);

                  // Redirect based on role
                  redirectBasedOnRole(userData.role, navigate);
              }

              } catch (error) {

              console.log(error.response?.data?.message || "Login failed");

              setErrors({
                  ...errors,
                  apiError: true
              });

              toast.error(
                  error.response?.data?.message || "Something went wrong"
              );}

  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome back 🚀"
      size="sm"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm leading-6 text-slate-500">
            Sign in to your ShipTrack Pro account to continue.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="login-email"
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
              id="login-password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
              showPasswordToggle
            />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            Login
          </Button>
        </form>

        {/* Register */}
        <div className="border-t border-slate-200 pt-5 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?
          </p>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        onClose();
                        navigate("/register");
                    }}
                    className="mt-3 w-full"
                    >
                    Register
                </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;