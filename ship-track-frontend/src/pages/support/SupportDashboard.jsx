import React, { useMemo, useState } from "react";

const SupportDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const tickets = [
    {
      id: "TKT-1001",
      subject: "Shipment has not been delivered",
      customer: "Rahul Sharma",
      shipment: "SHP-45821",
      status: "Open",
      priority: "High",
      updated: "10 min ago",
    },
    {
      id: "TKT-1002",
      subject: "Wrong delivery address",
      customer: "Priya Singh",
      shipment: "SHP-45822",
      status: "In Progress",
      priority: "Medium",
      updated: "25 min ago",
    },
    {
      id: "TKT-1003",
      subject: "Package damaged during delivery",
      customer: "Amit Kumar",
      shipment: "SHP-45823",
      status: "Open",
      priority: "Urgent",
      updated: "35 min ago",
    },
    {
      id: "TKT-1004",
      subject: "Request for shipment tracking",
      customer: "Neha Das",
      shipment: "SHP-45824",
      status: "Resolved",
      priority: "Low",
      updated: "1 hour ago",
    },
    {
      id: "TKT-1005",
      subject: "Delivery delayed",
      customer: "Arjun Patel",
      shipment: "SHP-45825",
      status: "In Progress",
      priority: "High",
      updated: "2 hours ago",
    },
    {
      id: "TKT-1006",
      subject: "Unable to update receiver details",
      customer: "Sneha Roy",
      shipment: "SHP-45826",
      status: "Open",
      priority: "Medium",
      updated: "3 hours ago",
    },
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
        ticket.shipment.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "In Progress":
        return "status-progress";
      case "Resolved":
        return "status-resolved";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Urgent":
        return "priority-urgent";
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="support-dashboard">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .support-dashboard {
          min-height: 100vh;
          padding: 28px;
          background: #f5f7fb;
          color: #1f2937;
          font-family: Arial, Helvetica, sans-serif;
        }

        .support-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          gap: 20px;
        }

        .support-title h1 {
          margin: 0 0 7px;
          font-size: 30px;
          font-weight: 700;
        }

        .support-title p {
          margin: 0;
          color: #6b7280;
          font-size: 15px;
        }

        .agent-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 15px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .agent-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2563eb;
          color: white;
          font-weight: 700;
        }

        .agent-name {
          font-size: 14px;
          font-weight: 700;
        }

        .agent-role {
          margin-top: 3px;
          color: #6b7280;
          font-size: 12px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          background: #eef2ff;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 20px;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .panel-header h2 {
          margin: 0;
          font-size: 18px;
        }

        .panel-header span {
          color: #6b7280;
          font-size: 13px;
        }

        .summary-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-left {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .summary-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2563eb;
        }

        .summary-text {
          font-size: 14px;
        }

        .summary-number {
          font-weight: 700;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .action-button {
          padding: 15px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #f9fafb;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
          transition: 0.2s;
        }

        .action-button:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

        .action-title {
          display: block;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .action-description {
          color: #6b7280;
          font-size: 12px;
        }

        .tickets-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 20px;
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 180px 180px;
          gap: 12px;
          margin-bottom: 20px;
        }

        .search-input,
        .filter-select {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #d1d5db;
          border-radius: 9px;
          outline: none;
          background: white;
          font-size: 14px;
        }

        .search-input:focus,
        .filter-select:focus {
          border-color: #2563eb;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        .tickets-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .tickets-table th {
          padding: 13px 12px;
          text-align: left;
          background: #f9fafb;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
          border-bottom: 1px solid #e5e7eb;
        }

        .tickets-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 13px;
        }

        .ticket-id {
          color: #2563eb;
          font-weight: 700;
        }

        .customer-name {
          font-weight: 600;
        }

        .shipment-id {
          color: #6b7280;
        }

        .badge {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .status-open {
          background: #fee2e2;
          color: #b91c1c;
        }

        .status-progress {
          background: #fef3c7;
          color: #92400e;
        }

        .status-resolved {
          background: #dcfce7;
          color: #166534;
        }

        .priority-urgent {
          background: #fce7f3;
          color: #be185d;
        }

        .priority-high {
          background: #fee2e2;
          color: #b91c1c;
        }

        .priority-medium {
          background: #fef3c7;
          color: #92400e;
        }

        .priority-low {
          background: #e0f2fe;
          color: #0369a1;
        }

        .view-button {
          border: none;
          background: #2563eb;
          color: white;
          padding: 7px 11px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 12px;
        }

        .view-button:hover {
          background: #1d4ed8;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        @media (max-width: 1000px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .support-dashboard {
            padding: 15px;
          }

          .support-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .filters {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="support-header">
        <div className="support-title">
          <h1>Support Agent Dashboard</h1>
          <p>
            Manage customer requests, shipment issues and support tickets.
          </p>
        </div>

        <div className="agent-box">
          <div className="agent-avatar">SA</div>
          <div>
            <div className="agent-name">Support Agent</div>
            <div className="agent-role">Support Team</div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Tickets</div>
            <div className="stat-value">124</div>
          </div>
          <div className="stat-icon">🎫</div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Open Tickets</div>
            <div className="stat-value">32</div>
          </div>
          <div className="stat-icon">📩</div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">In Progress</div>
            <div className="stat-value">18</div>
          </div>
          <div className="stat-icon">⏳</div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Resolved</div>
            <div className="stat-value">74</div>
          </div>
          <div className="stat-icon">✓</div>
        </div>
      </div>

      {/* Overview */}
      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Ticket Overview</h2>
            <span>Current workload</span>
          </div>

          <div className="summary-list">
            <div className="summary-item">
              <div className="summary-left">
                <div className="summary-dot"></div>
                <div className="summary-text">Open Tickets</div>
              </div>
              <div className="summary-number">32</div>
            </div>

            <div className="summary-item">
              <div className="summary-left">
                <div className="summary-dot"></div>
                <div className="summary-text">In Progress</div>
              </div>
              <div className="summary-number">18</div>
            </div>

            <div className="summary-item">
              <div className="summary-left">
                <div className="summary-dot"></div>
                <div className="summary-text">Resolved Today</div>
              </div>
              <div className="summary-number">12</div>
            </div>

            <div className="summary-item">
              <div className="summary-left">
                <div className="summary-dot"></div>
                <div className="summary-text">Urgent Tickets</div>
              </div>
              <div className="summary-number">5</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
            <button className="action-button">
              <span className="action-title">Create Ticket</span>
              <span className="action-description">
                Create a customer support ticket
              </span>
            </button>

            <button className="action-button">
              <span className="action-title">Search Shipment</span>
              <span className="action-description">
                Find shipment information
              </span>
            </button>

            <button className="action-button">
              <span className="action-title">Customers</span>
              <span className="action-description">
                View customer information
              </span>
            </button>

            <button className="action-button">
              <span className="action-title">Reports</span>
              <span className="action-description">
                View support reports
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tickets */}
      <div className="tickets-panel">
        <div className="panel-header">
          <h2>Recent Support Tickets</h2>
          <span>{filteredTickets.length} tickets</span>
        </div>

        <div className="filters">
          <input
            type="text"
            className="search-input"
            placeholder="Search ticket, customer or shipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="table-container">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Subject</th>
                <th>Customer</th>
                <th>Shipment</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <span className="ticket-id">{ticket.id}</span>
                  </td>

                  <td>{ticket.subject}</td>

                  <td>
                    <span className="customer-name">
                      {ticket.customer}
                    </span>
                  </td>

                  <td>
                    <span className="shipment-id">
                      {ticket.shipment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${getStatusClass(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${getPriorityClass(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td>{ticket.updated}</td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        alert(`Opening ${ticket.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="empty-state">
              No tickets found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;