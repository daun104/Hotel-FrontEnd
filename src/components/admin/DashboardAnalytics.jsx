// src/components/admin/DashboardAnalytics.jsx
import React from 'react';

const DashboardAnalytics = ({ analytics }) => {
  const cards = [
    { title: 'Registered Users', data: analytics.users },
    { title: 'Booked Rooms', data: analytics.bookings },
    { title: 'Revenue', data: analytics.revenue, prefix: '$' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => (
        <div key={card.title} className="p-4 border rounded shadow hover:shadow-md">
          <h3 className="font-bold mb-2">{card.title}</h3>
          <p>This Month: {card.prefix || ''}{card.data.thisMonth}</p>
          <p>Last Month: {card.prefix || ''}{card.data.lastMonth}</p>
          <p>Total: {card.prefix || ''}{card.data.total}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardAnalytics;
