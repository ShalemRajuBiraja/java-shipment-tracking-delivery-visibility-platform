import { useState } from "react";
import "./LoginSignup.css";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      console.log("Login details:", {
        email: formData.email,
        password: formData.password,
      });

      alert("Login successful!");
    } else {
      console.log("Signup details:", formData);

      alert("Account created successfully!");
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo / Project Name */}
        <div className="auth-header">
          <h1>ShipTrack Pro</h1>

          <p>
            {isLogin
              ? "Login to your account"
              : "Create your ShipTrack Pro account"}
          </p>
        </div>

        {/* Login / Signup Tabs */}
        <div className="auth-tabs">

          <button
            type="button"
            className={isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "tab active" : "tab"}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Name - Only for Signup */}
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="forgot-password">
              <button type="button">
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="submit-button">
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>

        {/* Switch Login / Signup */}
        <div className="switch-account">

          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            type="button"
            onClick={switchMode}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default LoginSignup;