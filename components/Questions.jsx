"use client";
import { useState } from "react";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

export default function Questions() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(null);

  return (
    <section className="py-14 bg-primary">
      <Container size="md">
        <div className="text-center mb-10">
          <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-white">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-start text-white font-medium text-sm hover:bg-white/5 transition-colors"
              >
                {faq.q}
                <span className="text-accent text-xl ms-4 flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
