"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminBulkOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/bulk-orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading bulk orders...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bulk Orders</h1>

        <a href="/api/bulk-orders/export">
          <Button className="bg-green-600 hover:bg-green-700">
            Download Excel
          </Button>
        </a>
      </div>

      {orders.length === 0 ? (
        <p>No bulk orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white border rounded-lg p-4 shadow"
            >
              <p className="font-semibold">{o.name}</p>
              <p className="text-sm text-gray-600">{o.email}</p>
              <p>📞 {o.phone}</p>
              <p>🎉 Event: {o.eventType}</p>
              {o.eventDate && <p>📅 {o.eventDate}</p>}
              {o.message && (
                <p className="text-sm mt-2 italic">
                  “{o.message}”
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
