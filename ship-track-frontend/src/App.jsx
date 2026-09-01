import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import AdminLogin from "./pages/Auth/AdminLogin";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import Users from "./pages/Admin/Users";
import Settings from "./pages/Admin/Settings";
import CreateShipment from "./pages/Admin/CreateShipment";
import Shipments from "./pages/Admin/Shipments";

import CustomerLayout from "./pages/Customer/CustomerLayout";
import ShipmentHistory from "./pages/Customer/ShipmentHistory";
import CustomerSettings from "./pages/Customer/CustomerSettings";
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

    {/* Customer Private Routes */}
    <Route path="/customer" element={ <ProtectedRoute allowedRole="CUSTOMER">  <CustomerLayout /> </ProtectedRoute> }>
      <Route path="dashboard" element={<CustomerDashboard />}/>
      <Route path="shipment-history" element={<ShipmentHistory />}/>
      <Route path="settings"  element={<CustomerSettings />}/>
    </Route>

    {/* Admin Routes */}
      <Route path="/admin" element={ <ProtectedRoute allowedRole="ADMIN"> <AdminLayout /> </ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />  
        <Route path="create-shipment" element={<CreateShipment />} />
        <Route path="shipments" element={<Shipments />} />
      </Route>

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
