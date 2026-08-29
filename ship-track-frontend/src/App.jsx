import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import AdminLogin from "./pages/Auth/AdminLogin";

// import CustomerDashboard from "./pages/Customer/CustomerDashboard";
// import BusinessDashboard from "./pages/Business/BusinessDashboard";
// import LogisticsDashboard from "./pages/Logistics/LogisticsDashboard";
// import SupportDashboard from "./pages/Support/SupportDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return (
   <BrowserRouter>

  <Routes>

    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/auth/register" element={<Register />} />
    <Route path="/auth/admin/login" element={<AdminLogin />} />

    {/* Private Routes */}
    {/* <Route path="/customer/dashboard" element={<ProtectedRoute allowedRole="CUSTOMER"><CustomerDashboard /></ProtectedRoute>} />
    <Route path="/business/dashboard" element={<ProtectedRoute allowedRole="BUSINESS_CLIENT"><BusinessDashboard /></ProtectedRoute>} />
    <Route path="/logistics/dashboard" element={<ProtectedRoute allowedRole="LOGISTICS_OPERATOR"><LogisticsDashboard /></ProtectedRoute>} />
    <Route path="/support/dashboard" element={<ProtectedRoute allowedRole="SUPPORT_AGENT"><SupportDashboard /></ProtectedRoute>} /> */}

  </Routes>

  <ToastContainer
    position="top-center"
    autoClose={1000}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="light"
    limit={3}
  />

</BrowserRouter>

);
}

export default App;
