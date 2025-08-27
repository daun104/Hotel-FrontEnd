import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/roomCard';
import { toast } from 'react-toastify';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/rooms');
      setRooms(data);
      setFilteredRooms(data);
    } catch (err) {
      toast.error('Failed to fetch rooms');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    let filtered = rooms.filter(r => r.price >= priceRange[0] && r.price <= priceRange[1]);
    if (typeFilter) {
      filtered = filtered.filter(r => r.type.toLowerCase().includes(typeFilter.toLowerCase()));
    }
    setFilteredRooms(filtered);
  }, [typeFilter, priceRange, rooms]);

  if (loading) return <p className="p-8">Loading rooms...</p>;

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Rooms</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Room Type"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange[0]}
          onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="p-2 border rounded w-24"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="p-2 border rounded w-24"
        />
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <RoomCard
            key={room._id}
            room={room}
            onBook={() => navigate(`/booking?roomId=${room._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
