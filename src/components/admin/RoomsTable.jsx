// src/components/admin/RoomsTable.jsx
import React from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const RoomsTable = ({ rooms, refresh }) => {
  const grouped = rooms.reduce((acc, room) => {
    const type = room.roomType || 'Others';
    if (!acc[type]) acc[type] = [];
    acc[type].push(room);
    return acc;
  }, {});

  const handleDelete = async id => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted');
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(grouped).map(type => (
        <div key={type}>
          <h3 className="text-xl font-bold mb-2">{type}</h3>
          <table className="min-w-full border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Features</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {grouped[type].map(r => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">${r.price}</td>
                  <td className="px-4 py-2">{r.features?.join(', ') || '—'}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => toast.info('Edit coming soon')} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RoomsTable;
