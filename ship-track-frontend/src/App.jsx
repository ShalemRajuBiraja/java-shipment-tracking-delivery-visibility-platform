import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

// Public Pages
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import AdminLogin from "./pages/Auth/AdminLogin";

// Customer Pages
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerLayout from "./pages/Customer/CustomerLayout";
import ShipmentHistory from "./pages/Customer/ShipmentHistory";
import CustomerSettings from "./pages/Customer/Settings";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import Users from "./pages/Admin/Users";
import Settings from "./pages/Admin/Settings";
import CreateShipment from "./pages/Admin/CreateShipment";
import Shipments from "./pages/Admin/Shipments";

// Operator Pages
import LogisticsOperatorDashboard from "./pages/LogisticsOperator/OperatorDashboard";
import OperatorShipments from "./pages/LogisticsOperator/OperatorShipments";
import TrackShipment from "./pages/LogisticsOperator/TrackShipment";
import Reports from "./pages/LogisticsOperator/Reports";

import OperatorLayout from "./pages/LogisticsOperator/OperatorLayout";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";
import BusinessDashboard from "./pages/Business/BusinessDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/register" element={<Register />}/>
        <Route path="/auth/admin/login" element={<AdminLogin />}/>
        <Route path="/business-client/dashboard" element={<BusinessDashboard />}/>

        {/* CUSTOMER ROUTES*/}
        <Route path="/customer" element={ <ProtectedRoute allowedRole="CUSTOMER"> <CustomerLayout /> </ProtectedRoute> } >
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="shipment-history" element={<ShipmentHistory />} />
        <Route path="settings"element={<CustomerSettings />}/></Route>


        {/*ADMIN ROUTES*/}
        <Route path="/admin" element={  <ProtectedRoute allowedRole="ADMIN"> <AdminLayout /> </ProtectedRoute>  } >
        <Route path="dashboard" element={<AdminDashboard />}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="users" element={<Users />} />
        <Route path="create-shipment"  element={<CreateShipment />} />
        <Route path="shipments"  element={<Shipments />}/></Route>


        {/*OPERATOR ROUTES*/}
        {/* <Route path="/logistics-operator/dashboard" element={<LogisticsOperatorDashboard />}/>
        <Route path="/logistics-operator/shipments" element={<OperatorShipments />}/>
        <Route  path="/logistics-operator/track" element={<TrackShipment />} />
        <Route path="/logistics-operator/reports"  element={<Reports />}/> */}

        {/* LOGISTICS OPERATOR ROUTES */}
        <Route path="/logistics-operator" element={<ProtectedRoute allowedRole="LOGISTICS_OPERATOR"><OperatorLayout /></ProtectedRoute>}>

          <Route path="dashboard" element={<LogisticsOperatorDashboard />} />

          <Route path="shipments" element={<OperatorShipments />} />

          <Route path="track" element={<TrackShipment />} />

          <Route path="reports" element={<Reports />} />

        </Route>

      </Routes>


      {/* =========================
          TOAST NOTIFICATIONS
      ========================== */}

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
