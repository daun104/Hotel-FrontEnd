// src/pages/admin/Configuration.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const Configuration = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    newEmail: "",
    newPassword: "",
    currentEmail: "",
    currentPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerAdmin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/admin/register`, {
        email: formData.newEmail,
        password: formData.newPassword,
        currentEmail: formData.currentEmail,
        currentPassword: formData.currentPassword,
      }, { withCredentials: true });

      setMessage(res.data.message || "Admin registered successfully!");
      setFormData({ newEmail: "", newPassword: "", currentEmail: "", currentPassword: "" });
      setModalOpen(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to register admin.");
    } finally {
      setLoading(false);
    }
  };

  const deleteOldBookings = async () => {
    if (!window.confirm("Are you sure? This will delete all bookings older than 3 months!")) return;

    try {
      const res = await axios.delete(`${API_BASE}/bookings/delete-old`, { withCredentials: true });
      alert(res.data.message || "Old bookings deleted.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete bookings.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuration</h1>

      {message && <div className="mb-4 p-2 bg-gray-100 text-sm text-gray-700">{message}</div>}

      {/* Register New Admin */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        onClick={() => setModalOpen(true)}
      >
        Register New Admin
      </button>

      {/* Delete Old Bookings */}
      <button
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        onClick={deleteOldBookings}
      >
        Delete Bookings Older than 3 Months
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="p-6 bg-white rounded shadow max-w-md mx-auto mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Register New Admin</h2>

        <input
          type="email"
          name="newEmail"
          placeholder="New Admin Email"
          value={formData.newEmail}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Admin Password"
          value={formData.newPassword}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
        />

        <h3 className="font-semibold mb-2">Verify Current Admin</h3>
        <input
          type="email"
          name="currentEmail"
          placeholder="Your Email"
          value={formData.currentEmail}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="currentPassword"
          placeholder="Your Password"
          value={formData.currentPassword}
          onChange={handleInput}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={registerAdmin}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default Configuration;
