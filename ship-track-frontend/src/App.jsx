import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ShipmentInfoManagement from "./Shipment-Info-frontend/ShipmentInfoManagement"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shipments" element={<ShipmentInfoManagement />} />
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
