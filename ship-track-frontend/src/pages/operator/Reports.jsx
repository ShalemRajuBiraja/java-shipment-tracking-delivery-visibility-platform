import React from "react";

const reportData = [
  { title: "Total Shipments", value: "1,250" },
  { title: "Delivered", value: "920" },
  { title: "In Transit", value: "250" },
  { title: "Pending", value: "80" },
];

export default function Reports() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Reports</h1>

      <p>Shipment performance and delivery reports.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {reportData.map((report) => (
          <div
            key={report.title}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>{report.title}</h3>
            <h2>{report.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
