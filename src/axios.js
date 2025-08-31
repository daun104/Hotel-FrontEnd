import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-booking-f1ei.onrender.com/api/v1", // ✅ your live BE
  withCredentials: true, // important if BE sets cookies (like JWT)
});

export default api;
