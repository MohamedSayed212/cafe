"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/reservations", label: "Reservations" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 min-h-screen bg-primary flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/10">
        <span className="text-white font-bold text-xl tracking-wide">
          terra
        </span>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
        {navLinks.map((link) => {
          // Exact match for dashboard, starts-with for sub-routes
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
