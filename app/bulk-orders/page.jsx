"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import app from "@/lib/firebase";

export default function BulkOrdersPage() {
  const auth = getAuth(app);
  const user = auth.currentUser;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to place a bulk order");
      return;
    }

    const payload = {
      userId: user.uid,               // 🔥 REQUIRED
      userName: form.name,
      userEmail: user.email,
      items: [],                      // Bulk enquiry, no cart items
      totalAmount: 0,                 // Quotation based
      bulkDetails: {
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate,
        notes: form.message,
      },
      paymentMethod: "COD",
    };

    console.log("🚀 Sending BULK ORDER:", payload);

    try {
      setLoading(true);

      const res = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("✅ Bulk order saved:", data);

      if (!res.ok) {
        alert("Bulk order failed. Try again.");
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("❌ Bulk order error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Thank You 🙏
        </h1>
        <p className="text-gray-600">
          Your bulk order enquiry has been received.
          <br />
          We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">
        Bulk Orders
      </h1>
      <p className="text-gray-600 mb-6">
        For weddings, festivals, parties & corporate events
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <select
          name="eventType"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select Event Type
          </option>
          <option value="Wedding">Wedding</option>
          <option value="Festival">Festival</option>
          <option value="Birthday Party">Birthday Party</option>
          <option value="Housewarming">Housewarming</option>
          <option value="Corporate Event">Corporate Event</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="eventDate"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Required items, quantities, special notes"
          rows={4}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 w-full"
        >
          {loading ? "Submitting..." : "Submit Bulk Order Enquiry"}
        </Button>
      </form>
    </div>
  );
}
