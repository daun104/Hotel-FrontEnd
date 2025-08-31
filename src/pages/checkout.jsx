import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import api from "../services/api";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); 
// Make sure you add VITE_STRIPE_PUBLIC_KEY in your .env file

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // we’ll pass bookingId from Booking.jsx
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createCheckoutSession = async () => {
      if (!bookingId) {
        toast.error("No booking found.");
        return;
      }

      setLoading(true);
      try {
        const { data } = await api.post("/payments/create-checkout-session", {
          bookingId,
        });

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.id, // BE returns session id
        });

        if (error) toast.error(error.message);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to start payment");
      }
      setLoading(false);
    };

    createCheckoutSession();
  }, [bookingId]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Redirecting to payment...</h2>
      {loading && <p>Please wait while we connect to Stripe.</p>}
    </div>
  );
};

export default Checkout;
