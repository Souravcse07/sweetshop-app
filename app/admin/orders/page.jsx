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
    const res = await fetch("/api/admin/orders");

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    const data = await res.json();

    setOrders(data.orders || []);
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
              className="border rounded p-4 shadow-sm bg-white"
            >
              {/* 🔥 ORDER TYPE BADGE */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  Order ID: {order._id}
                </span>

                {order.isBulk ? (
                  <span className="px-3 py-1 text-sm rounded bg-orange-100 text-orange-700">
                    BULK ORDER
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm rounded bg-green-100 text-green-700">
                    NORMAL ORDER
                  </span>
                )}
              </div>

              {/* USER INFO */}
              <p>
                <strong>User:</strong>{" "}
                {order.userEmail || "Guest"}
              </p>

              {/* STATUS */}
              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              {/* AMOUNT */}
              <p>
                <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>

              {/* BULK DETAILS */}
              {order.isBulk && order.bulkDetails && (
                <div className="mt-3 p-3 bg-orange-50 rounded">
                  <p className="font-semibold mb-1">
                    Bulk Order Details
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.bulkDetails.phone}
                  </p>
                  <p>
                    <strong>Event:</strong>{" "}
                    {order.bulkDetails.eventType}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {order.bulkDetails.eventDate}
                  </p>
                  <p>
                    <strong>Notes:</strong>{" "}
                    {order.bulkDetails.notes}
                  </p>
                </div>
              )}

              {/* ITEMS (NORMAL ORDERS) */}
              {!order.isBulk && (
                <div className="mt-3">
                  <p className="font-semibold mb-1">Items</p>
                  <ul className="list-disc list-inside text-sm">
                    {order.items?.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
