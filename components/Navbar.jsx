"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME",    href: "/",         section: "home" },
  { label: "ABOUT",   href: "/#about",   section: "about" },
  { label: "MENU",    href: "/#menu",    section: "menu" },
  { label: "CONTACT", href: "/#contact", section: "contact" },
];

const SECTION_IDS = ["about", "menu", "gallery", "reservation", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Track active section while scrolling (homepage only)
  useEffect(() => {
    if (pathname !== "/") { setActive(null); return; }

    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    const onScroll = () => { if (window.scrollY < 80) setActive("home"); };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o?.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const handleClick = (e, section) => {
    setMenuOpen(false);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (pathname === "/" && section) {
      e.preventDefault();
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (section) =>
    pathname === "/" && (active === section || (section === "home" && !active));

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white">

      {/* Top bar */}
      <div className="flex items-center justify-between md:grid md:grid-cols-3 px-6 md:px-10 py-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleClick(e, "home")}
          className="text-lg font-bold tracking-widest"
        >
          terra
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center justify-center gap-8 text-xs font-semibold tracking-widest">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.section)}
                className={`transition-colors hover:text-accent ${isActive(link.section) ? "text-accent" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/#reservation"
          onClick={(e) => handleClick(e, "reservation")}
          className="hidden md:block justify-self-end bg-accent text-white text-xs font-bold tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          RESERVE A TABLE
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 ml-auto"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu — inside nav so it stays sticky with it */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.section)}
              className={`text-sm font-bold tracking-widest hover:text-accent transition-colors ${isActive(link.section) ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#reservation"
            onClick={(e) => handleClick(e, "reservation")}
            className="mt-2 bg-accent text-white text-xs font-bold tracking-widest px-6 py-3 rounded-full text-center hover:opacity-90 transition-opacity"
          >
            RESERVE A TABLE
          </Link>
        </div>
      )}

    </nav>
  );
}
