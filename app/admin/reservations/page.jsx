"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Background color for each status badge
const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    setLoading(true);
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    setReservations(data ?? []);
    setLoading(false);
  }

  async function handleStatusChange(id, newStatus) {
    await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", id);

    // Update the status locally without re-fetching the whole list
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  }

  async function handleDelete(id) {
    if (!confirm("Delete this reservation?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Reservations</h1>
        <p className="text-text/50 text-sm mt-0.5">
          {reservations.length} total
        </p>
      </div>

      {loading ? (
        <p className="text-text/40 text-sm">Loading…</p>
      ) : reservations.length === 0 ? (
        <p className="text-text/40 text-sm">No reservations yet.</p>
      ) : (
        <div className="bg-card border border-text/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-text/10 text-left">
                  <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest">
                    Guest
                  </th>
                  <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest hidden sm:table-cell">
                    Date & Time
                  </th>
                  <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest hidden md:table-cell">
                    Guests
                  </th>
                  <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-text/5 last:border-0"
                  >
                    {/* Guest info */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-primary">{r.name}</p>
                      <p className="text-text/40 text-xs">{r.email}</p>
                      {r.phone && (
                        <p className="text-text/40 text-xs">{r.phone}</p>
                      )}
                    </td>

                    {/* Date & time */}
                    <td className="px-5 py-4 text-text/60 hidden sm:table-cell">
                      <p>{r.date}</p>
                      <p className="text-xs text-text/40">{r.time}</p>
                    </td>

                    {/* Number of guests */}
                    <td className="px-5 py-4 text-text/60 hidden md:table-cell">
                      {r.guests}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, e.target.value)
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${
                          statusColors[r.status] ?? "bg-text/10 text-text/60"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
