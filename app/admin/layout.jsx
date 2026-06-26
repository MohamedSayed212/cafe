"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If no session and not already on the login page, redirect to login
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
        return;
      }

      // If there IS a session and we're on the login page, go to dashboard
      if (session && pathname === "/admin/login") {
        router.replace("/admin");
        return;
      }

      setChecking(false);
    }

    checkSession();
  }, [pathname, router]);

  // Show a blank screen while we check auth (avoids flicker)
  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text/40 text-sm">Loading…</p>
      </div>
    );
  }

  // Login page gets no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // All other admin pages get the sidebar layout
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-background p-8 overflow-auto">{children}</main>
    </div>
  );
}
