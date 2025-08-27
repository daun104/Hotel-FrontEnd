// src/services/api.jsx
import axios from "axios";

// Base URL from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or however you store JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example service functions
export const getBookings = async () => {
  try {
    const response = await api.get("/api/v1/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const createBooking = async (data) => {
  try {
    const response = await api.post("/api/v1/bookings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export default api;
