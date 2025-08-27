import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RoomCard from '../components/roomCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/rooms?limit=3'); // get 3 featured rooms
      setRooms(data);
    } catch (err) {
      toast.error('Failed to fetch rooms');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="space-y-12 p-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-blue-100 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Experience luxury and comfort with our world-class amenities and personalized service. 
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/rooms')}
        >
          Explore Rooms
        </button>
      </section>

      {/* Featured Rooms */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Rooms</h2>
        {loading ? (
          <p className="text-center">Loading featured rooms...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map(room => (
              <RoomCard
                key={room._id}
                room={room}
                onBook={() => navigate(`/booking?roomId=${room._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Amenities Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Free Wi-Fi</h3>
            <p>Stay connected with complimentary high-speed internet throughout the hotel.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Swimming Pool</h3>
            <p>Relax and unwind in our indoor and outdoor pools open year-round.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Fitness Center</h3>
            <p>Keep fit during your stay with our fully-equipped gym and personal trainers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
