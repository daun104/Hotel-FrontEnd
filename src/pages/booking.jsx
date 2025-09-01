// src/pages/Booking.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const roomId = searchParams.get("roomId");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomId) {
          setLoading(false);
          return;
        }
        const res = await api.get(`/rooms/${roomId}`);

        // ✅ handle both possible response structures
        const roomData = res.data?.data || res.data;
        console.log("Room API response:", res.data);

        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleBooking = async () => {
    try {
      if (!roomId) {
        alert("No room selected.");
        return;
      }

      const res = await api.post("/bookings", {
        roomId,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 night default
      });

      if (res.data) {
        const bookingData = res.data?.data || res.data;
        console.log("Booking created:", bookingData);

        // ✅ Redirect to checkout with bookingId
        navigate(`/checkout?bookingId=${bookingData._id}`);
      }
    } catch (error) {
  console.error("Error creating booking:", error.response?.data || error.message);
  alert("Failed to create booking. Please try again.");
}

  };

  if (loading) return <p>Loading room details...</p>;
  if (!roomId) return <p>No room selected.</p>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div>
      <h1>Booking Page</h1>
      <h2>{room.roomType}</h2>
      <p>Price: RM{room.price}</p>
      <p>{room.description}</p>

      <button
        onClick={handleBooking}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
