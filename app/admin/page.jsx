"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // 🔥 USE WORKING API
      const res = await fetch("/api/bulk-orders");
      const data = await res.json();

      // API may return single order or array
      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Orders (Normal + Bulk)
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow bg-white"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>

                <span className="px-3 py-1 text-sm rounded bg-orange-100 text-orange-700">
                  BULK ORDER
                </span>
              </div>

              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {order.bulkDetails && (
                <div className="mt-2 bg-orange-50 p-3 rounded">
                  <p><strong>Phone:</strong> {order.bulkDetails.phone}</p>
                  <p><strong>Event:</strong> {order.bulkDetails.eventType}</p>
                  <p><strong>Date:</strong> {order.bulkDetails.eventDate}</p>
                  <p><strong>Notes:</strong> {order.bulkDetails.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
