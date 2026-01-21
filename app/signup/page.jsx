"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Signup
  const handleSignup = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
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
              Create Account 🎉
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

            <Button className="w-full" onClick={handleSignup} disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm text-gray-500">or</div>

            <Button 
              className="w-full bg-white text-black border hover:bg-gray-100"
              onClick={handleGoogleSignup}
            >
              Sign up with Google
            </Button>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
