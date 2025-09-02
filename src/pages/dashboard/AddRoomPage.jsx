import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoomForm from '../../components/admin/AddRoomForm';

const AddRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/dashboard/admin')}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>

      <div className="border p-4 rounded shadow">
        <AddRoomForm onSuccess={() => navigate('/dashboard/admin')} />
      </div>
    </div>
  );
};

export default AddRoomPage;
