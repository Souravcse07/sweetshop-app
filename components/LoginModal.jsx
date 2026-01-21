"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      onSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Login to Continue
        </h2>

        <div className="space-y-3">
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleEmailLogin}
            disabled={loading}
          >
            Login
          </Button>

          <div className="text-center text-sm text-gray-500">or</div>

          <Button
            className="w-full bg-white text-black border"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
