// src/pages/rooms.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate(); // ✅ for redirecting

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        const roomData = Array.isArray(res.data) ? res.data : res.data.data;
        setRooms(roomData);
        setFilteredRooms(roomData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleFilter = () => {
    let updatedRooms = [...rooms];
    if (filterType) {
      updatedRooms = updatedRooms.filter((room) =>
        room.roomType.toLowerCase().includes(filterType.toLowerCase())
      );
    }
    if (minPrice) {
      updatedRooms = updatedRooms.filter(
        (room) => room.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      updatedRooms = updatedRooms.filter(
        (room) => room.price <= parseFloat(maxPrice)
      );
    }
    setFilteredRooms(updatedRooms);
  };

  return (
    <div>
      <h1>🏨 Available Rooms</h1>

      {/* 🔍 Filter Section */}
      <div className="filters" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Filter by room type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      {/* 🏷️ Rooms List */}
      <div className="rooms-list">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{room.roomType}</h3>
              <p>Price: RM{room.price}</p>
              <p>{room.description}</p>

              {/* ✅ Add Book Button */}
              <button
                onClick={() => navigate(`/booking?roomId=${room._id}`)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Book this Room
              </button>
            </div>
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
