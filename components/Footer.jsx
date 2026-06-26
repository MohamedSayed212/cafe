import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-10 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-10 border-b border-white/10">
          <div>
            <p className="text-xl font-bold tracking-widest mb-4">terra</p>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Specialty coffee rooted in Cairo. A space to slow down, sip well,
              and stay a while.
            </p>
          </div>

          <div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-5">
              Quick Links
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/50 text-sm hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-5">
              Opening Hours
            </p>
            <div className="text-white/50 text-sm mb-6">
              <p>Open 24 hours · 7 days a week</p>
            </div>
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">
              Location
            </p>
            <div className="text-white/50 text-sm space-y-1">
              <p>15 El-Nozha St, Heliopolis</p>
              <p>Cairo, Egypt</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-white/25 text-xs tracking-widest">
          © {new Date().getFullYear()} terra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
