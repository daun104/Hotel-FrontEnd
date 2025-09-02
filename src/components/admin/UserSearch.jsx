// src/components/admin/UserSearch.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const UserSearch = ({ users, bookings }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [modalData, setModalData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toLowerCase();

    // Search by user name
    const matchedUsers = users.filter(u => u.name.toLowerCase().includes(q));
    // Search by booking ID
    const matchedBookings = bookings.filter(b => b._id.toLowerCase().includes(q));

    // Combine results
    const combined = [
      ...matchedUsers.map(u => ({ type: 'user', data: u })),
      ...matchedBookings.map(b => ({ type: 'booking', data: b }))
    ];

    setResults(combined);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by user name or booking/payment ID"
          className="w-full border rounded p-2"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, idx) => (
            <div
              key={idx}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setModalData(r)}
            >
              {r.type === 'user' ? `User: ${r.data.name} (${r.data.email})` : `Booking: ${r.data._id}`}
            </div>
          ))}
        </div>
      )}

      {modalData && (
        <Modal
          isOpen={true}
          onRequestClose={() => setModalData(null)}
          className="p-4 bg-white rounded shadow max-w-md mx-auto mt-20"
        >
          <h2 className="text-xl font-bold mb-4">
            {modalData.type === 'user' ? 'User Details' : 'Booking Details'}
          </h2>
          <pre>{JSON.stringify(modalData.data, null, 2)}</pre>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setModalData(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserSearch;
