import React from "react";
import "./CustomerDashboard.css";

const Dashboard = () => {
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
  ];

  return (
    <div className="dashboard">
      <h1>Customer Dashboard</h1>

      <div className="cards">
        <div className="card blue">
          <h2>12</h2>
          <p>Total Shipments</p>
        </div>

        <div className="card orange">
          <h2>5</h2>
          <p>In Transit</p>
        </div>

        <div className="card green">
          <h2>7</h2>
          <p>Delivered</p>
        </div>
      </div>

      <h2 className="title">Recent Shipments</h2>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.destination}</td>
              <td>
                <span className={`status ${item.status.replace(" ", "")}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;