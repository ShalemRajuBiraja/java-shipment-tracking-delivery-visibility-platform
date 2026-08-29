import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const shipments = {
    ST001: {
      destination: "Delhi",
      status: "In Transit",
      date: "29 Aug 2026",
    },
    ST002: {
      destination: "Mumbai",
      status: "Delivered",
      date: "27 Aug 2026",
    },
    ST003: {
      destination: "Bhopal",
      status: "Pending",
      date: "30 Aug 2026",
    },
    ST004: {
      destination: "Jaipur",
      status: "In Transit",
      date: "28 Aug 2026",
    },
  };

  const shipment = shipments[id];

  if (!shipment) {
    return (
      <div className="dashboard">
        <h1>Shipment Not Found</h1>

        <button onClick={() => navigate("/shipments")}>
          Back to My Shipments
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <button
        className="back-button"
        onClick={() => navigate("/shipments")}
      >
        ← Back to My Shipments
      </button>

      <h1>Shipment Details</h1>

      <div className="shipment-info">
        <h2>Tracking ID: {id}</h2>

        <p>
          <strong>Destination:</strong> {shipment.destination}
        </p>

        <p>
          <strong>Shipment Date:</strong> {shipment.date}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`status ${shipment.status.replace(" ", "")}`}
          >
            {shipment.status}
          </span>
        </p>
      </div>

      <h2 className="title">Shipment Tracking</h2>

      <div className="timeline">
        <div className="timeline-item completed">
          <div className="circle">✓</div>
          <div>
            <h3>Shipment Picked Up</h3>
            <p>Your shipment has been picked up.</p>
          </div>
        </div>

        <div className="timeline-item completed">
          <div className="circle">✓</div>
          <div>
            <h3>In Transit</h3>
            <p>Your shipment is currently in transit.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="circle">3</div>
          <div>
            <h3>Out for Delivery</h3>
            <p>Your shipment will be delivered soon.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="circle">4</div>
          <div>
            <h3>Delivered</h3>
            <p>Shipment will be marked delivered after reaching the destination.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;