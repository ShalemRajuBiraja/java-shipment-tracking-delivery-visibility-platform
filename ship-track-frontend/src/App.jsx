import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/customer/Dashboard";
import MyShipments from "./pages/customer/MyShipments";
import ShipmentDetails from "./pages/customer/ShipmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shipments" element={<MyShipments />} />
        <Route path="/shipment-details/:id" element={<ShipmentDetails />} />
      </Routes>

      <ToastContainer
        position="top-right"
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