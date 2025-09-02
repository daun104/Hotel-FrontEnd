import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const roomTypes = ["Standard", "Deluxe", "Suite", "Presidential"];
const bedTypes = ["Single", "Double", "Queen", "King"];

const AddRoomForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    roomType: "",
    price: "",
    capacity: "",
    size: "",
    bedType: "",
    description: "",
    image: "",
    features: "",
    amenities: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.roomType || !form.price || !form.capacity) {
      return toast.error("Please fill in all required fields!");
    }

    try {
      await api.post("/rooms", {
        ...form,
        price: parseFloat(form.price),
        capacity: parseInt(form.capacity),
        features: form.features ? form.features.split(",") : [],
        amenities: form.amenities ? form.amenities.split(",") : [],
      });
      toast.success("Room added successfully!");
      onSuccess && onSuccess();
      setForm({
        name: "",
        roomType: "",
        price: "",
        capacity: "",
        size: "",
        bedType: "",
        description: "",
        image: "",
        features: "",
        amenities: "",
        isAvailable: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add room");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
      <div>
        <label>Room Name*</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Room Type*</label>
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Price per Night (RM)*</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Capacity*</label>
        <input
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Size</label>
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="e.g., 30 sqm"
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Bed Type</label>
        <select
          name="bedType"
          value={form.bedType}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Bed Type</option>
          {bedTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Features (comma separated)</label>
        <input
          name="features"
          value={form.features}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label>Amenities (comma separated)</label>
        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isAvailable"
          checked={form.isAvailable}
          onChange={handleChange}
        />
        <label>Available</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoomForm;
