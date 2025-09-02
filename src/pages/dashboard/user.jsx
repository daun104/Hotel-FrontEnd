// src/pages/UserDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <p className="mb-4">{message}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings');
      setBookings(data);
    } catch (err) {
      toast.error('Failed to fetch bookings');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayNow = (bookingId) => {
    navigate(`/checkout?bookingId=${bookingId}`);
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;
    try {
      await api.delete(`/bookings/${selectedBooking._id}`);
      toast.success('Booking deleted successfully');
      setModalOpen(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete booking');
      console.error(err);
    }
  };

  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  if (loading) return <p className="p-8 text-lg">Loading your bookings...</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Hello, {user.name}</h2>
      {bookings.length === 0 ? (
        <p className="text-lg">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Check-In</th>
                <th className="px-4 py-2 text-left">Check-Out</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const paid = b.isPaid || b.status === 'confirmed'; // fallback
                return (
                  <tr
                    key={b._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium">{b.room?.name || '—'}</td>
                    <td className="px-4 py-2">{new Date(b.checkIn).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(b.checkOut).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {paid ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-block text-center w-[80px] cursor-not-allowed">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayNow(b._id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm w-[80px]"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!paid ? (
                        <button
                          onClick={() => openDeleteModal(b)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm w-[80px]"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded text-sm inline-block text-center w-[80px] cursor-not-allowed">
                          Paid
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteBooking}
        message="Are you sure you want to delete this booking?"
      />
    </div>
  );
};

export default UserDashboard;
