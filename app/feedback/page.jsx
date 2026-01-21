"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing feedback
  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    if (data.success) {
      setFeedbacks(data.feedbacks);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Submit feedback
  const submitFeedback = async () => {
    if (!message.trim()) {
      alert("Please enter feedback");
      return;
    }

    setLoading(true);

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || "Anonymous",
        message,
      }),
    });

    setName("");
    setMessage("");
    setLoading(false);
    fetchFeedbacks();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Customer Feedback
      </h1>

      {/* FEEDBACK FORM */}
      <div className="bg-white p-5 rounded shadow mb-8">
        <input
          placeholder="Your Name (optional)"
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your feedback..."
          className="w-full border p-2 rounded mb-3"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={submitFeedback} disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>

      {/* FEEDBACK LIST */}
      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="border p-4 rounded bg-gray-50"
            >
              <p className="font-semibold">{fb.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}