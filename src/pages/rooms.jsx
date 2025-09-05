// src/pages/rooms.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

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
      updatedRooms = updatedRooms.filter(
        (room) => room.roomType?.toLowerCase() === filterType.toLowerCase()
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
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">🏨 Available Rooms</h1>

      {/* 🔍 Filter Section */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Dropdown for room type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-3 py-1 rounded w-44"
        >
          <option value="">All Room Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Presidential">Presidential</option>
        </select>

        {/* Price filters */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-1 rounded w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-1 rounded w-28"
        />
        <Button onClick={handleFilter} className="h-9">
          Apply Filters
        </Button>
      </div>

      {/* 🏷️ Rooms List */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <Card
              key={room._id}
              className="overflow-hidden border rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden group">
                <img
                  src={room.image || "https://via.placeholder.com/400x250"}
                  alt={room.roomType}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {!room.isAvailable && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">Unavailable</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div>
                    <div>{room.roomType || room.name}</div>
                    <div className="text-sm text-gray-500 font-normal">
                      {room.size} • {room.bedType}
                    </div>
                  </div>
                  <Badge variant="secondary">RM {room.price}</Badge>
                </CardTitle>
                <CardDescription>
                  {room.capacity} guests • {room.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full mt-2"
                  onClick={() => navigate(`/booking?roomId=${room._id}`)}
                  disabled={!room.isAvailable}
                  variant={room.isAvailable ? "default" : "secondary"}
                >
                  {room.isAvailable ? "Book This Room" : "Unavailable"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
