import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import RoomFormModal from '../../components/roomFormModal';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [usersRes, roomsRes, bookingsRes] = await Promise.all([
        api.get('/users'),
        api.get('/rooms'),
        api.get('/bookings'),
      ]);
      setUsers(usersRes.data);
      setRooms(roomsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.isPaid ? b.room?.price || 0 : 0), 0);

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await api.delete(`/rooms/${roomId}`);
      toast.success('Room deleted successfully');
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 border rounded shadow">
              <h3 className="font-bold">Total Users</h3>
              <p className="text-xl">{users.length}</p>
            </div>
            <div className="p-4 border rounded shadow">
              <h3 className="font-bold">Total Rooms</h3>
              <p className="text-xl">{rooms.length}</p>
            </div>
            <div className="p-4 border rounded shadow">
              <h3 className="font-bold">Total Revenue</h3>
              <p className="text-xl">${totalRevenue}</p>
            </div>
          </div>

          {/* Users Table */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Users</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-t">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rooms Table with Add/Edit/Delete */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Rooms</h3>
              <button
                onClick={() => { setEditRoom(null); setModalOpen(true); }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Room
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Features</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(r => (
                    <tr key={r._id} className="border-t">
                      <td className="px-4 py-2">{r.type}</td>
                      <td className="px-4 py-2">${r.price}</td>
                      <td className="px-4 py-2">{r.features?.join(', ')}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => { setEditRoom(r); setModalOpen(true); }}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(r._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bookings Table */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Bookings</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">User</th>
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
                      <td className="px-4 py-2">{b.user?.name}</td>
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
          </div>
        </>
      )}

      <RoomFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        room={editRoom}
        onSuccess={fetchAll}
      />
    </div>
  );
};

export default AdminDashboard;
