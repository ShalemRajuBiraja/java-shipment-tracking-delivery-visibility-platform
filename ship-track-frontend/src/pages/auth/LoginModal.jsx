import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
const LoginModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Connect login API endpoint here.
    // Example:
    // POST /api/auth/login

    console.log("Login data:", {
      email: formData.email,
      password: formData.password,
    });
  };

  const handleRegister = () => {
    setFormData({
      email: "",
      password: "",
    });

    setErrors({});

    onRegister?.();
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
            onClick={handleRegister}
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