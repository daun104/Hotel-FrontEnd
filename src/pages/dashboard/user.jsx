import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings'); // backend filters by user automatically
      setBookings(data);
    } catch (err) {
      toast.error('Failed to fetch bookings');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p className="p-8">Loading your bookings...</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Hello, {user.name}</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Check-Out</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id} className="border-t">
                  <td className="px-4 py-2">{b.room?.type}</td>
                  <td className="px-4 py-2">{new Date(b.checkIn).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(b.checkOut).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{b.status || 'Pending'}</td>
                  <td className="px-4 py-2">{b.isPaid ? 'Paid' : 'Unpaid'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
