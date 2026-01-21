"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function MyOrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Get logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 2️⃣ Fetch orders for logged-in user
  useEffect(() => {
    async function fetchOrders() {
      try {
        const email = user?.email || "guest";
        const res = await fetch(`/api/orders?email=${email}`);
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }

    if (!loading) {
      fetchOrders();
    }
  }, [user, loading]);

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 mb-5 bg-white shadow-sm"
          >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
              <div>
                <p className="font-semibold">
                  Order ID:{" "}
                  <span className="text-gray-600">
                    {order.orderId || order._id}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* BADGES */}
              <div className="mt-2 md:mt-0 flex gap-2">
                {/* Order Type */}
                <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
                  {order.orderType || "Takeaway"}
                </span>

                {/* ✅ ORDER STATUS (ADMIN CONTROLLED) */}
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "Ready"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Preparing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Completed"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status || "Placed"}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="border-t pt-3">
              <p className="font-semibold mb-2">Items</p>
              <ul className="space-y-1">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} ({item.weight}) × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FOOTER */}
            <div className="border-t mt-3 pt-3 flex flex-col md:flex-row md:justify-between md:items-center">
              <p className="font-semibold text-lg">
                Total: ₹{order.totalAmount}
              </p>

              {/* PAYMENT INFO (TEXT ONLY – NO BADGE) */}
              <div className="text-sm text-gray-600 mt-2 md:mt-0">
                Payment:{" "}
                <b>{order.paymentMethod || "Online"}</b>{" "}
                ({order.paymentStatus || "Paid"})
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
