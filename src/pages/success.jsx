import React from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ adjust this import to match your actual auth hook/context/store
import { useAuth } from "../context/authContext";

const Success = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // assumes user = { id, name, role }

  const handleGoDashboard = () => {
    if (user?.role === "admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/user");
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h2>
      <p className="mb-6">Your booking is confirmed. Thank you!</p>

      <button
        onClick={handleGoDashboard}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;
