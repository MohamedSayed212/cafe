import { Coffee, Heart, MapPin, Users } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const reasons = [
  {
    number: "01",
    icon: Coffee,
    title: "Fresh Daily",
    description: "Beans roasted every week. Your cup is never stale.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Egyptian Warmth",
    description: "Hospitality is in our DNA. Every guest feels at home.",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Cairo's Corner",
    description: "A quiet spot in Heliopolis to slow down and recharge.",
  },
  {
    number: "04",
    icon: Users,
    title: "Your Regular Café",
    description: "We remember your name. And your order.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-6 bg-card">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="mb-10">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-3">
              Why terra
            </p>
            <h2 className="text-3xl font-bold text-primary">
              More Than Just Coffee
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 border border-text/10 rounded-2xl overflow-hidden">
          {reasons.map((reason, i) => (
            <FadeIn key={reason.number} delay={i * 0.1}>
              <div
                className={`p-7 ${
                  i === 0 ? "border-b border-r border-text/10" :
                  i === 1 ? "border-b border-text/10" :
                  i === 2 ? "border-r border-text/10" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-accent/10 p-2 rounded-xl">
                    <reason.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-xl font-bold text-accent/20 leading-none">
                    {reason.number}
                  </span>
                </div>
                <h3 className="text-primary font-bold text-base mb-1">
                  {reason.title}
                </h3>
                <p className="text-text/50 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
