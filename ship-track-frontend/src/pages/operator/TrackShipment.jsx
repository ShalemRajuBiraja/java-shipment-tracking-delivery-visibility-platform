import React, { useState } from "react";

export default function TrackShipment() {
  const [shipmentId, setShipmentId] = useState("");
  const [message, setMessage] = useState("");

  const handleTrack = () => {
    if (!shipmentId.trim()) {
      setMessage("Please enter a shipment ID.");
      return;
    }

    setMessage(`Tracking shipment: ${shipmentId}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Track Shipment</h1>

      <p>Enter a shipment ID to track its current status.</p>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter Shipment ID"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
          }}
        />

        <button onClick={handleTrack} style={{ padding: "10px 20px" }}>
          Track
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}
    </div>
  );
}
