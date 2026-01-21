"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    cart,
    removeItem,
    increaseQty,
    decreaseQty,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your Cart is Empty
        </h2>
        <Link href="/sweets">
          <Button className="bg-orange-600 hover:bg-orange-700">
            Shop Sweets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Your Cart
      </h1>

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item._id + item.weight}
            className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-5 rounded shadow gap-4"
          >
            {/* LEFT */}
            <div className="flex items-center gap-5">
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="rounded object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  Weight: {item.weight}
                </p>
                <p className="text-orange-600 font-bold">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
              {/* QUANTITY */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    decreaseQty(item._id, item.weight)
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </Button>

                <span className="text-lg font-semibold">
                  {item.quantity}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    increaseQty(item._id, item.weight)
                  }
                >
                  +
                </Button>
              </div>

              {/* REMOVE */}
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() =>
                  removeItem(item._id, item.weight)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 p-5 bg-white shadow rounded gap-4">
        <h2 className="text-2xl font-bold">
          Total: ₹{total}
        </h2>

        <Link href="/checkout">
          <Button className="bg-green-600 px-6 py-3 text-lg hover:bg-green-700">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
