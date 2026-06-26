"use client";
import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";

const CATEGORIES = ["All", "Coffee", "Iced Coffee", "Desserts", "Bakery"];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic — runs every render (simple and readable)
  const filtered = products.filter((product) => {
    // Check if product name contains the search text (case-insensitive)
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // Check if product belongs to the selected category (or "All" is selected)
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    // Product must pass BOTH checks to be shown
    return matchesSearch && matchesCategory;
  });

  // Reset both filters back to default
  const handleReset = () => {
    setSearch("");
    setActiveCategory("All");
  };

  // Show the reset button only when filters are active
  const isFiltered = search !== "" || activeCategory !== "All";

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────── */}
      <div className="bg-primary text-white py-16 px-6 text-center">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-3">
          Explore
        </p>
        <h1 className="text-4xl md:text-5xl font-bold">Our Full Menu</h1>
        <p className="text-white/50 mt-4 text-sm max-w-md mx-auto leading-relaxed">
          Handcrafted drinks and fresh bites — something for every mood.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* ── Search & Filters ──────────────────────── */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search input */}
          <div className="relative max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Search drinks or food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-text/10 rounded-full px-5 py-3 text-text text-sm bg-card focus:outline-none focus:border-accent pr-10"
            />
            {/* Small search icon hint */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text/30 text-sm">
              ⌕
            </span>
          </div>

          {/* Category tabs */}
          <div className="flex gap-3 justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reset button — only visible when filters are active */}
          {isFiltered && (
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-xs font-bold tracking-widest uppercase text-accent hover:underline"
              >
                ✕ Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ── Results count ─────────────────────────── */}
        <p className="text-text/40 text-xs tracking-widest uppercase mb-8 text-center">
          {filtered.length} {filtered.length === 1 ? "item" : "items"} found
        </p>

        {/* ── Product Grid ──────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-2xl overflow-hidden border border-text/5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product image */}
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-primary text-base leading-snug">
                      {product.name}
                    </h3>
                    <span className="text-accent font-bold text-sm whitespace-nowrap">
                      {product.price} EGP
                    </span>
                  </div>
                  <p className="text-text/55 text-xs leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-accent/70 bg-accent/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── No results message ─────────────────── */
          <div className="text-center py-24">
            <p className="text-5xl mb-4">☕</p>
            <h3 className="text-primary font-bold text-xl mb-2">
              No products found
            </h3>
            <p className="text-text/50 text-sm mb-6">
              Try a different search term or category.
            </p>
            <button
              onClick={handleReset}
              className="bg-primary text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
