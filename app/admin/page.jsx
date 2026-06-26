"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [menuCount, setMenuCount] = useState(null);
  const [reservationCount, setReservationCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Count total menu items
      const { count: menuItems } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true });

      // Count total reservations
      const { count: reservations } = await supabase
        .from("reservations")
        .select("*", { count: "exact", head: true });

      setMenuCount(menuItems ?? 0);
      setReservationCount(reservations ?? 0);
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-1">Dashboard</h1>
      <p className="text-text/50 text-sm mb-8">Welcome back.</p>

      {loading ? (
        <p className="text-text/40 text-sm">Loading stats…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg">
          {/* Menu Items Stat */}
          <StatCard label="Menu Items" value={menuCount} />

          {/* Reservations Stat */}
          <StatCard label="Reservations" value={reservationCount} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-card border border-text/10 rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-semibold text-text/40 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-4xl font-bold text-primary">{value}</p>
    </div>
  );
}
