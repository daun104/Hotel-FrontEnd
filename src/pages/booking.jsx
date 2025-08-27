import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRoom = async () => {
    try {
      const { data } = await api.get(`/rooms/${roomId}`);
      setRoom(data);
    } catch (err) {
      toast.error('Failed to fetch room');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (roomId) fetchRoom();
    else setLoading(false);
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      return toast.error('Please select check-in and check-out dates');
    }
    try {
      await api.post('/bookings', {
        room: roomId,
        checkIn,
        checkOut,
      });
      toast.success('Booking successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <p className="p-8">Loading booking...</p>;
  if (!room) return <p className="p-8">No room selected</p>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Book Room: {room.type}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Check-In</label>
          <input
            type="date"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Check-Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
