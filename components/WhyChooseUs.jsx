"use client";
import { Coffee, Heart, MapPin, Users } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

// Only the visuals stay here — title/description come from the dictionary,
// matched by index with t.why.items.
const reasons = [
  { number: "01", icon: Coffee },
  { number: "02", icon: Heart },
  { number: "03", icon: MapPin },
  { number: "04", icon: Users },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-card">
      <Container>
        <FadeIn>
          <div className="mb-10">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-3">
              {t.why.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-primary">{t.why.title}</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 border border-text/10 rounded-2xl overflow-hidden">
          {reasons.map((reason, i) => (
            <FadeIn key={reason.number} delay={i * 0.1}>
              <div
                className={`p-7 ${
                  i === 0
                    ? "border-b border-e border-text/10"
                    : i === 1
                      ? "border-b border-text/10"
                      : i === 2
                        ? "border-e border-text/10"
                        : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-accent/10 p-2 rounded-xl">
                    <reason.icon
                      className="w-5 h-5 text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xl font-bold text-accent/20 leading-none">
                    {reason.number}
                  </span>
                </div>
                <h3 className="text-primary font-bold text-base mb-1">
                  {t.why.items[i].title}
                </h3>
                <p className="text-text/50 text-sm leading-relaxed">
                  {t.why.items[i].description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
