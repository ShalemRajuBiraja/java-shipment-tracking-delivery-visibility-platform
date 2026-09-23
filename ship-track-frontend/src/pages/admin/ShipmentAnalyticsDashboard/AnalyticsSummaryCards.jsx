import React from "react";

const AnalyticsSummaryCards = ({ summary }) => {

  const cards = [
    {
      title: "Total Shipments",
      value: summary.total,
      icon: "📦",
      className: "total",
    },

    {
      title: "Delivered",
      value: summary.delivered,
      icon: "✓",
      className: "delivered",
    },

    {
      title: "Delayed",
      value: summary.delayed,
      icon: "⏱",
      className: "delayed",
    },

    {
      title: "In Transit",
      value: summary.inTransit,
      icon: "🚚",
      className: "transit",
    },
  ];

  return (
    <div className="summary-grid">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`summary-card ${card.className}`}
        >

          <div className="summary-icon">
            {card.icon}
          </div>

          <div className="summary-content">

            <p>
              {card.title}
            </p>

            <h2>
              {card.value}
            </h2>

          </div>

        </div>

      ))}

    </div>
  );
};

export default AnalyticsSummaryCards;