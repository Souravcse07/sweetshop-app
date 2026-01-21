import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Annapoorneswari Sweets",
  description: "Best traditional sweets online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Razorpay Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* 🔑 ADMIN PROVIDER MUST BE OUTSIDE */}
        <AdminProvider>
          <CartProvider>
            <Navbar />

            {/* PAGE CONTENT */}
            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
