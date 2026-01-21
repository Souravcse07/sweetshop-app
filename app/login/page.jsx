"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Email Login
  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user; // ✅ user is defined here

      // ✅ Store email in cookie (optional)
      document.cookie = `userEmail=${user.email}; path=/`;

      toast.success("Login successful!");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // ✅ user defined here

      // ✅ Store email in cookie (optional)
      document.cookie = `userEmail=${user.email}; path=/`;

      toast.success("Welcome!");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-[380px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome Back 🍬
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label>Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label>Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm text-gray-500">or</div>

            <Button
              className="w-full bg-white text-black border hover:bg-gray-100"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Sign in with Google
            </Button>

            <p className="text-sm text-center mt-2">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
