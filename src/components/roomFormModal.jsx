import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const RoomFormModal = ({ isOpen, onClose, room, onSuccess }) => {
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');

  useEffect(() => {
    if (room) {
      setType(room.type);
      setPrice(room.price);
      setFeatures(room.features?.join(', '));
    } else {
      setType('');
      setPrice('');
      setFeatures('');
    }
  }, [room]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        type,
        price: Number(price),
        features: features.split(',').map(f => f.trim())
      };
      if (room?._id) {
        await api.put(`/rooms/${room._id}`, payload);
        toast.success('Room updated successfully');
      } else {
        await api.post('/rooms', payload);
        toast.success('Room added successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{room?._id ? 'Edit Room' : 'Add Room'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={features}
            onChange={e => setFeatures(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {room?._id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomFormModal;
