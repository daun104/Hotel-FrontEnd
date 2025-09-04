// src/components/admin/BookingsTable.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const BookingsTable = ({ bookings }) => {
  const [modalData, setModalData] = useState(null);

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentBookings = bookings.filter(
    (b) => new Date(b.createdAt) >= last30Days
  );

  const getBookingNo = (id) => id?.slice(-4) || '—';

  return (
    <div>
      <table className="min-w-full border rounded shadow overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Booking No.</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Room</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map((b) => (
            <tr
              key={b._id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td
                className="px-4 py-2 text-blue-600 font-semibold"
                onClick={() => setModalData(b)}
              >
                {getBookingNo(b._id)}
              </td>
              <td className="px-4 py-2">{b.user?.name || '—'}</td>
              <td className="px-4 py-2">{b.room?.name || '—'}</td>
              <td className="px-4 py-2">
                {b.status === 'confirmed' ? 'Paid' : 'Pending'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <Modal
          isOpen={true}
          onRequestClose={() => setModalData(null)}
          className="p-4 bg-white rounded shadow max-w-lg mx-auto mt-20"
        >
          <h2 className="text-xl font-bold mb-4">
            Booking Details — #{getBookingNo(modalData._id)}
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Booking ID:</strong> {modalData._id}
            </p>
            <p>
              <strong>User:</strong> {modalData.user?.name} (
              {modalData.user?.email})
            </p>
            <p>
              <strong>Room:</strong> {modalData.room?.name} (
              {modalData.room?.roomType})
            </p>
            <p>
              <strong>Price:</strong> ${modalData.room?.price || '—'}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {modalData.status === 'confirmed' ? 'Paid' : 'Pending'}
            </p>
            <p>
              <strong>Check-In:</strong>{' '}
              {modalData.checkIn
                ? new Date(modalData.checkIn).toLocaleDateString()
                : '—'}
            </p>
            <p>
              <strong>Check-Out:</strong>{' '}
              {modalData.checkOut
                ? new Date(modalData.checkOut).toLocaleDateString()
                : '—'}
            </p>
          </div>

          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setModalData(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default BookingsTable;
