import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const MyShipments = () => {
  const navigate = useNavigate();

  const shipments = [
    {
      id: "ST001",
      destination: "Delhi",
      status: "In Transit",
      date: "29 Aug 2026",
    },
    {
      id: "ST002",
      destination: "Mumbai",
      status: "Delivered",
      date: "27 Aug 2026",
    },
    {
      id: "ST003",
      destination: "Bhopal",
      status: "Pending",
      date: "30 Aug 2026",
    },
    {
      id: "ST004",
      destination: "Jaipur",
      status: "In Transit",
      date: "28 Aug 2026",
    },
  ];

  return (
    <div className="dashboard">
      <h1>My Shipments</h1>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.destination}</td>

              <td>
                <span
                  className={`status ${shipment.status.replace(" ", "")}`}
                >
                  {shipment.status}
                </span>
              </td>

              <td>{shipment.date}</td>

              <td>
                <button
                  onClick={() =>
                    navigate(`/shipment-details/${shipment.id}`)
                  }
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyShipments;