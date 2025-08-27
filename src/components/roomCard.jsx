import React from 'react';

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="border rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">{room.type}</h3>
        <p className="mt-2">Price: ${room.price}</p>
        <p className="mt-1">Features: {room.features?.join(', ')}</p>
      </div>
      <button
        onClick={onBook}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomCard;
