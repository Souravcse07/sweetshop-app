"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="w-full py-16 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-5"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Fresh & Delicious Sweets from  
              <span className="text-orange-600"> Sri Annapoorneswari Sweets</span>
            </h1>

            <p className="text-gray-600 text-lg">
              Taste the tradition with our mouth-watering sweets made with love and pure ingredients.
            </p>

            <Link href="/sweets">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Order Now
              </Button>
            </Link>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 mt-10 md:mt-0"
          >
            <Image
  src="/logo/logo.png"
  width={500}
  height={500}
  alt="Sri Annapoorneswari Sweets"
  className="rounded-xl shadow-lg object-cover w-full h-[420px]"
/>

          </motion.div>
        </div>
      </section>

      {/* FESTIVAL BANNER */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/banners/festival.jpg"
            width={1200}
            height={400}
            alt="Festival Offers"
            className="rounded-xl w-full h-[320px] object-cover shadow-md"
          />
        </motion.div>
      </section>

      {/* BEST SELLERS (SWEETS + SAVOURIES) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            // SWEETS
            { name: "Mysore Pak", price: "₹250", img: "/sweets/mysore-pak.jpg" },
            { name: "Laddu", price: "₹180", img: "/sweets/ladoo.jpg" },
            { name: "Kaju Katli", price: "₹350", img: "/sweets/kaju.jpg" },
            { name: "Jalebi", price: "₹300", img: "/sweets/download.jpg" },

            // SAVOURIES
            { name: "Mixture", price: "₹300", img: "/saviours/haldiram's chanachur 200 gm.jpg" },
            { name: "Kara Boondi", price: "₹300", img: "/saviours/Kara Boondi Recipe.jpg" },
            { name: "Corn Flakes Mixture", price: "₹300", img: "/saviours/Air Fryer Cornflakes Chivda (Trail Mix).jpg" },
            { name: "Bombay Mixture", price: "₹300", img: "/saviours/Special Mixture.jpg" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="hover:shadow-lg cursor-pointer transition">
                <CardContent className="p-0">
                  <Image
                    src={item.img}
                    width={300}
                    height={300}
                    alt={item.name}
                    className="rounded-t-lg object-cover w-full h-40"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-orange-600 font-bold">{item.price}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
