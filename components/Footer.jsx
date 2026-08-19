"use client";
import Link from "next/link";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "menu", href: "/menu" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-14">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 pb-10 border-b border-white/10">
          <div>
            <p className="text-xl font-bold tracking-widest mb-4">terra</p>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-5">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="text-white/50 text-sm hover:text-accent transition-colors"
                  >
                    {t.footer.links[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-5">
              {t.footer.hoursTitle}
            </p>
            <div className="text-white/50 text-sm mb-6">
              <p>{t.footer.hoursValue}</p>
            </div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">
              {t.footer.locationTitle}
            </p>
            <div className="text-white/50 text-sm space-y-1">
              <p>{t.footer.addressLine1}</p>
              <p>{t.footer.addressLine2}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-white/25 text-xs tracking-widest">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
