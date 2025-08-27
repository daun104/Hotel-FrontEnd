// src/services/roomService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://hotel-booking-ar5z.onrender.com/api/v1";

/**
 * Fetch all room types from backend
 * Returns { success: boolean, roomTypes: [], message: string }
 */
export const fetchRoomTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/rooms/`);

    // Normalize response: array directly or wrapped in object
    const rooms = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.rooms)
      ? res.data.rooms
      : Array.isArray(res.data.roomTypes)
      ? res.data.roomTypes
      : [];

    return {
      success: true,
      roomTypes: rooms,
      message: "",
    };
  } catch (err) {
    console.error("Error fetching room types:", err);
    return {
      success: false,
      roomTypes: [],
      message: err.response?.data?.message || "Failed to fetch rooms",
    };
  }
};
