"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAILS = [
  "lyricalstatus2004@gmail.com",
  "admin@gmail.com",
];

const AdminContext = createContext({
  isAdmin: false,
  loading: true,
});

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
