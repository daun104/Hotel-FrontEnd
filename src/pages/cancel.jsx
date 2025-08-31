import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-700">Payment Cancelled ❌</h1>
      <p className="mt-4 text-lg">Your payment was not completed. You can try again anytime.</p>
      <Link 
        to="/rooms"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
      >
        Back to Rooms
      </Link>
    </div>
  );
};

export default Cancel;
