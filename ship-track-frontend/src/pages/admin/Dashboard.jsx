import React from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Shipments",
      value: "1,248",
      icon: "📦",
      description: "All shipments",
    },
    {
      title: "In Transit",
      value: "326",
      icon: "🚚",
      description: "Currently moving",
    },
    {
      title: "Delivered",
      value: "842",
      icon: "✅",
      description: "Successfully delivered",
    },
    {
      title: "Pending",
      value: "58",
      icon: "⏳",
      description: "Waiting for processing",
    },
  ];

  const recentShipments = [
    {
      id: "ST-1001",
      customer: "Rahul Kumar",
      destination: "Bangalore",
      status: "Delivered",
      date: "28 Aug 2026",
    },
    {
      id: "ST-1002",
      customer: "Priya Sharma",
      destination: "Mumbai",
      status: "In Transit",
      date: "28 Aug 2026",
    },
    {
      id: "ST-1003",
      customer: "Amit Singh",
      destination: "Delhi",
      status: "Pending",
      date: "27 Aug 2026",
    },
    {
      id: "ST-1004",
      customer: "Sneha Das",
      destination: "Kolkata",
      status: "Delivered",
      date: "27 Aug 2026",
    },
    {
      id: "ST-1005",
      customer: "Arjun Patel",
      destination: "Chennai",
      status: "Cancelled",
      date: "26 Aug 2026",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status delivered";
      case "In Transit":
        return "status transit";
      case "Pending":
        return "status pending";
      case "Cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          padding: 30px;
          background: #f5f7fb;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          color: #1f2937;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
        }

        .dashboard-header p {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 15px;
        }

        .admin-badge {
          background: #111827;
          color: white;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 22px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-card h3 {
          margin: 18px 0 5px;
          font-size: 28px;
        }

        .stat-card .title {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #374151;
        }

        .stat-card .description {
          margin: 6px 0 0;
          font-size: 13px;
          color: #9ca3af;
        }

        .content-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .content-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .view-all {
          border: none;
          background: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 15px 24px;
          background: #f9fafb;
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
        }

        td {
          padding: 17px 24px;
          border-top: 1px solid #f0f0f0;
          font-size: 14px;
        }

        .shipment-id {
          font-weight: 700;
          color: #2563eb;
        }

        .status {
          display: inline-block;
          padding: 6px 11px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .delivered {
          background: #dcfce7;
          color: #166534;
        }

        .transit {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .pending {
          background: #fef3c7;
          color: #92400e;
        }

        .cancelled {
          background: #fee2e2;
          color: #b91c1c;
        }

        @media (max-width: 1000px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .admin-dashboard {
            padding: 15px;
          }

          .dashboard-header {
            align-items: flex-start;
            gap: 15px;
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Admin. Here's your shipment overview.</p>
        </div>

        <div className="admin-badge">
          Administrator
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-top">
              <div>
                <p className="title">{stat.title}</p>
              </div>

              <div className="stat-icon">
                {stat.icon}
              </div>
            </div>

            <h3>{stat.value}</h3>

            <p className="description">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="content-header">
          <h2>Recent Shipments</h2>

          <button className="view-all">
            View All
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="shipment-id">
                    {shipment.id}
                  </td>

                  <td>
                    {shipment.customer}
                  </td>

                  <td>
                    {shipment.destination}
                  </td>

                  <td>
                    <span className={getStatusClass(shipment.status)}>
                      {shipment.status}
                    </span>
                  </td>

                  <td>
                    {shipment.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;