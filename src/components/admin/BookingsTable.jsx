// src/components/admin/BookingsTable.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const BookingsTable = ({ bookings }) => {
  const [modalData, setModalData] = useState(null);

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentBookings = bookings.filter(b => new Date(b.createdAt) >= last30Days);

  return (
    <div>
      <table className="min-w-full border rounded shadow overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Room</th>
            <th className="px-4 py-2 text-left">Check-In</th>
            <th className="px-4 py-2 text-left">Check-Out</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map(b => (
            <tr key={b._id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-2 text-blue-600" onClick={() => setModalData({ type: 'user', data: b.user })}>{b.user?.name}</td>
              <td className="px-4 py-2 text-blue-600" onClick={() => setModalData({ type: 'room', data: b.room })}>{b.room?.name || '—'}</td>
              <td className="px-4 py-2">{new Date(b.checkIn).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(b.checkOut).toLocaleDateString()}</td>
              <td className="px-4 py-2">{b.status === 'confirmed' ? 'Paid' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <Modal isOpen={true} onRequestClose={() => setModalData(null)} className="p-4 bg-white rounded shadow max-w-md mx-auto mt-20">
          <h2 className="text-xl font-bold mb-4">{modalData.type === 'user' ? 'User Details' : 'Room Details'}</h2>
          <pre>{JSON.stringify(modalData.data, null, 2)}</pre>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalData(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default BookingsTable;
