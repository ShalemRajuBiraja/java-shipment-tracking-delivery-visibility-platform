import React from "react";

const shipments = [
  {
    id: "SHP001",
    customer: "ABC Logistics",
    origin: "Hyderabad",
    destination: "Bangalore",
    status: "In Transit",
  },
  {
    id: "SHP002",
    customer: "Global Traders",
    origin: "Chennai",
    destination: "Mumbai",
    status: "Delivered",
  },
  {
    id: "SHP003",
    customer: "Fast Freight",
    origin: "Delhi",
    destination: "Hyderabad",
    status: "Pending",
  },
];

export default function Shipments() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Shipments</h1>

      <p>Manage and monitor all shipments.</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Customer</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.customer}</td>
              <td>{shipment.origin}</td>
              <td>{shipment.destination}</td>
              <td>{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
