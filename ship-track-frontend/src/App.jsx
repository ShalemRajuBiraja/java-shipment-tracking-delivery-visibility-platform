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
import CustomerSettings from "./pages/Customer/CustomerSettings";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import Users from "./pages/Admin/Users";
import Settings from "./pages/Admin/Settings";
import CreateShipment from "./pages/Admin/CreateShipment";
import Shipments from "./pages/Admin/Shipments";

// Operator Pages
import OperatorDashboard from "./pages/operator/Dashboard";
import OperatorShipments from "./pages/operator/Shipments";
import TrackShipment from "./pages/operator/TrackShipment";
import Reports from "./pages/operator/Reports";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/auth/register"
          element={<Register />}
        />

        <Route
          path="/auth/admin/login"
          element={<AdminLogin />}
        />


        {/* =========================
            CUSTOMER ROUTES
        ========================== */}

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="shipment-history"
            element={<ShipmentHistory />}
          />

          <Route
            path="settings"
            element={<CustomerSettings />}
          />

        </Route>


        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="create-shipment"
            element={<CreateShipment />}
          />

          <Route
            path="shipments"
            element={<Shipments />}
          />

        </Route>


        {/* =========================
            OPERATOR ROUTES
        ========================== */}

        <Route
          path="/operator/dashboard"
          element={<OperatorDashboard />}
        />

        <Route
          path="/operator/shipments"
          element={<OperatorShipments />}
        />

        <Route
          path="/operator/track"
          element={<TrackShipment />}
        />

        <Route
          path="/operator/reports"
          element={<Reports />}
        />

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
