import React from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ adjust this import to match your actual auth hook/context/store
import { useAuth } from "../context/AuthContext";

const Cancel = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // assumes user = { id, name, role }

  const handleGoDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Payment Cancelled ❌
      </h2>
      <p className="mb-6">
        Your payment was not completed. You can try again or return to your
        dashboard.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)} // go back to previous page
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
        <button
          onClick={handleGoDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Cancel;
