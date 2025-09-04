
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import DashboardAnalytics from '../../components/admin/DashboardAnalytics';
import UserSearch from '../../components/admin/UserSearch';
import RoomsTable from '../../components/admin/RoomsTable';
import BookingsTable from '../../components/admin/BookingsTable';
import Configuration from '../../components/admin/Configuration'; // ✅ config tab
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to fetch admin data');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ---- Analytics calculation ----
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const analyticsData = {
    users: {
      thisMonth: users.filter(u => new Date(u.createdAt) >= thisMonthStart).length,
      lastMonth: users.filter(
        u => new Date(u.createdAt) >= lastMonthStart && new Date(u.createdAt) <= lastMonthEnd
      ).length,
      total: users.length,
    },
    bookings: {
      thisMonth: bookings.filter(b => new Date(b.createdAt) >= thisMonthStart).length,
      lastMonth: bookings.filter(
        b => new Date(b.createdAt) >= lastMonthStart && new Date(b.createdAt) <= lastMonthEnd
      ).length,
      total: bookings.length,
    },
    revenue: {
      thisMonth: bookings
        .filter(b => new Date(b.createdAt) >= thisMonthStart && b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.room?.price || 0), 0),
      lastMonth: bookings
        .filter(
          b =>
            new Date(b.createdAt) >= lastMonthStart &&
            new Date(b.createdAt) <= lastMonthEnd &&
            b.status === 'confirmed'
        )
        .reduce((sum, b) => sum + (b.room?.price || 0), 0),
      total: bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.room?.price || 0), 0),
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardAnalytics analytics={analyticsData} />
            )}
            {activeTab === 'search' && (
              <UserSearch users={users} bookings={bookings} />
            )}
            {activeTab === 'rooms' && <RoomsTable rooms={rooms} refresh={fetchAll} />}
            {activeTab === 'bookings' && <BookingsTable bookings={bookings} />}
            {activeTab === 'config' && <Configuration />} {/* ✅ connected */}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
