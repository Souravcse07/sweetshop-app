"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
<Link href="/admin/bulk-orders">Bulk Orders</Link>


export default function Navbar() {
  const [user, setUser] = useState(null);
  const { cart } = useCart();
  const { isAdmin, loading } = useAdmin();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (loading) return null;

  return (
    <nav className="w-full px-5 py-3 shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="text-xl font-bold">
          Sri Annapoorneswari Sweets
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/sweets" className="hover:text-blue-600">Sweets</Link>
          <Link href="/savouries" className="hover:text-blue-600">Savouries</Link>

          {/* 🔵 BULK ORDERS LINK (CUSTOMERS ONLY) */}
          {!isAdmin && (
            <Link
              href="/bulk-orders"
              className="hover:text-blue-600 font-medium"
            >
              Bulk Orders
            </Link>
          )}

          {/* Admin / Customer */}
          {isAdmin ? (
            <>
              <Link
                href="/admin/orders"
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Admin Orders
              </Link>
              <Link href="/admin">Dashboard</Link>
            </>
          ) : (
            <Link href="/orders" className="hover:text-blue-600">
              My Orders
            </Link>
          )}

          {/* Cart (customers only) */}
          {!isAdmin && (
            <Link href="/cart" className="relative">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Auth */}
          {!user ? (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {user.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
