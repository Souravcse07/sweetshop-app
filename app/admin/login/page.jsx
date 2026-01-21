"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ ADMIN EMAIL LIST
const ADMIN_EMAILS = [
  "admin@gmail.com",
  "sriannapoorneswari@gmail.com",
  "lyricalstatus2004@gmail.com",
];

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 EMAIL + PASSWORD ADMIN LOGIN
  const handleAdminLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      if (!ADMIN_EMAILS.includes(user.email)) {
        setError("You are not authorized as admin.");
        await auth.signOut();
        return;
      }

      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin/orders";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 GOOGLE ADMIN LOGIN
  const handleGoogleAdminLogin = async () => {
    setError("");

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!ADMIN_EMAILS.includes(user.email)) {
        setError("You are not authorized as admin.");
        await auth.signOut();
        return;
      }

      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin/orders";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-[360px]">
        <h1 className="text-2xl font-bold text-center mb-4">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleAdminLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </Button>

          <div className="text-center text-sm text-gray-500">or</div>

          <Button
            onClick={handleGoogleAdminLogin}
            disabled={loading}
            className="w-full bg-white text-black border hover:bg-gray-100"
          >
            Sign in with Google (Admin)
          </Button>
        </div>
      </div>
    </div>
  );
}
