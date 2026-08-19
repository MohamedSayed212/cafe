"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

// Labels now come from the dictionary — only the href/section stay here.
const navLinks = [
  { key: "home", href: "/", section: "home" },
  { key: "about", href: "/#about", section: "about" },
  { key: "menu", href: "/#menu", section: "menu" },
  { key: "contact", href: "/#contact", section: "contact" },
];

const SECTION_IDS = ["about", "menu", "gallery", "reservation", "contact"];

// Language options shown in the dropdown
const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "ar", short: "AR", label: "العربية" },
];

// Clickable language button that opens a small dropdown menu
function LangToggle({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang);

  const select = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Switch language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 border border-white/30 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-widest hover:border-accent transition-colors"
      >
        <Globe className="w-3.5 h-3.5" strokeWidth={2} />
        {current.short}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <>
          {/* Invisible layer — clicking anywhere outside closes the dropdown */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <ul
            role="listbox"
            className="absolute top-full end-0 mt-2 z-50 w-36 bg-[#faf8f4] border border-accent/30 rounded-xl shadow-xl overflow-hidden py-1"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={lang === l.code}
                  onClick={() => select(l.code)}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-bold tracking-wide text-start transition-colors ${
                    lang === l.code
                      ? "text-accent bg-accent/10"
                      : "text-primary hover:bg-primary/5"
                  }`}
                >
                  {l.label}
                  {lang === l.code && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={3} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Track active section while scrolling (homepage only)
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      observer.observe(el);
      return observer;
    });

    const onScroll = () => {
      if (window.scrollY < 80) setActive("home");
    };
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
    <nav className="sticky top-0 z-50 bg-primary text-white relative">
      {/* Top bar */}
      <Container className="flex items-center justify-between md:grid md:grid-cols-3 py-4">
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
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.section)}
                className={`transition-colors hover:text-accent ${isActive(link.section) ? "text-accent" : ""}`}
              >
                {t.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop language toggle + CTA */}
        <div className="hidden md:flex items-center justify-end gap-4">
          <LangToggle lang={lang} setLang={setLang} />
          <Link
            href="/#reservation"
            onClick={(e) => handleClick(e, "reservation")}
            className="bg-accent text-white text-xs font-bold tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {t.nav.reserve}
          </Link>
        </div>

        {/* Mobile: language toggle sits next to the hamburger */}
        <div className="md:hidden flex items-center gap-3 ms-auto">
          <LangToggle lang={lang} setLang={setLang} />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </Container>

      {/* Mobile menu — absolute so it overlays content instead of pushing it down */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#faf8f4] border-t-2 border-accent/30 shadow-xl py-6 z-50">
          <Container className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={(e) => handleClick(e, link.section)}
                className={`text-sm font-bold tracking-widest transition-colors ${isActive(link.section) ? "text-accent" : "text-primary hover:text-accent"}`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              href="/#reservation"
              onClick={(e) => handleClick(e, "reservation")}
              className="mt-1 bg-primary text-white text-xs font-bold tracking-widest px-6 py-3 rounded-full text-center hover:bg-primary/90 transition-colors"
            >
              {t.nav.reserve}
            </Link>
          </Container>
        </div>
      )}
    </nav>
  );
}
