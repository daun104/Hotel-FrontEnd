import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import api from "../services/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [loading, setLoading] = useState(false);

  // only run when button is clicked
  const handlePayment = async () => {
    if (!bookingId) {
      alert("No booking found.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/payments/create-checkout-session", {
        bookingId,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      alert("Payment failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
      <p className="mb-6">Your booking is saved. Please proceed to payment below.</p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Redirecting..." : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default Checkout;
