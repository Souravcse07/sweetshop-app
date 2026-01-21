"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function SavouriesPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const [weights, setWeights] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        // ✅ FIXED CATEGORY STRING
        const res = await fetch("/api/products?category=savouries");
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);

          const defaultWeights = {};
          data.products.forEach((p) => {
            defaultWeights[p._id] = "500g";
          });
          setWeights(defaultWeights);
        }
      } catch (error) {
        console.log("Error loading savouries:", error);
      }
    }

    fetchProducts();
  }, []);

  const calculatePrice = (basePrice, weight) => {
    if (weight === "250g") return basePrice * 0.25;
    if (weight === "500g") return basePrice * 0.5;
    return basePrice;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Savouries</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && <p>No savouries found.</p>}

        {products.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg cursor-pointer transition">
              <CardContent className="p-0">
                <Image
                  src={item.image}
                  width={300}
                  height={300}
                  alt={item.name}
                  className="rounded-t-lg object-cover w-full h-40"
                />

                <div className="p-3">
                  <h3 className="font-semibold">{item.name}</h3>

                  <select
                    className="w-full border p-2 rounded-md mt-2"
                    value={weights[item._id] || "500g"}
                    onChange={(e) =>
                      setWeights((prev) => ({
                        ...prev,
                        [item._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="250g">250g</option>
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                  </select>

                  <p className="text-orange-600 font-bold mt-2">
                    ₹{calculatePrice(item.price, weights[item._id])}
                  </p>

                  <Button
                    className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() =>
                      addToCart({
                        ...item,
                        weight: weights[item._id],
                        price: calculatePrice(
                          item.price,
                          weights[item._id]
                        ),
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
