"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import LoginModal from "@/components/LoginModal";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  // 🧮 Total bill
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔑 PAYMENT FLOW
  const handlePayment = async () => {
    const user = auth.currentUser;

    // 🚫 Not logged in → show login modal
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!form.name || !form.phone) {
      alert("Please enter name and phone number");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay Order
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to create payment order");
        setLoading(false);
        return;
      }

      // 2️⃣ Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "Sri Annapoorneswari Sweets",
        description: "Takeaway Order",
        order_id: data.order.id,

        handler: async function (response) {
          // 3️⃣ SAVE ORDER IN DATABASE
          const orderRes = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              userEmail: user.email,

              items: cart.map((item) => ({
                name: item.name,
                weight: item.weight,
                quantity: item.quantity,
                price: item.price,
              })),

              totalAmount: totalAmount,
              paymentMethod: "Online",
              paymentStatus: "Paid",
              orderType: "Takeaway",

              // ✅ IMPORTANT
              status: "Placed",
            }),
          });

          const orderData = await orderRes.json();
          console.log("ORDER SAVE RESPONSE:", orderData);

          if (!orderData.success) {
            alert("Order save failed!");
            return;
          }

          clearCart();
          window.location.href = "/orders";
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: { color: "#F97316" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔐 LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            handlePayment(); // 🔁 retry checkout after login
          }}
        />
      )}

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* TAKEAWAY DETAILS */}
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Takeaway Details
            </h2>

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />

              <p className="text-sm text-gray-500">
                📍 This order is for takeaway only.
              </p>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id + item.weight}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {item.name} ({item.weight}) × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="text-xl font-bold flex justify-between mt-3">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <Button
              disabled={loading}
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 mt-5"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
