"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { BottomNav } from "@/components/bottom-nav";
import { Footer } from "@/components/footer";
import { AdminContent } from "@/components/admin-content";

export default function AdminPage() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      setAllowed(true);
    } else {
      const key = prompt("Enter Admin Key:");

      if (key === "admin123") {
        localStorage.setItem("isAdmin", "true");
        setAllowed(true);
      } else {
        alert("Access Denied!");
        router.push("/");
      }
    }
  }, []);

  // Prevent rendering until checked
  if (!allowed) return null;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">
        <AdminContent />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}