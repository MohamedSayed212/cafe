"use client";
import FadeIn from "@/components/FadeIn";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-14 bg-card">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              {t.contact.eyebrow}
            </p>
            <h2 className="text-4xl mb-8 font-bold text-primary">
              {t.contact.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-10">
              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  {t.contact.addressTitle}
                </h3>
                <p className="text-text/60 text-sm leading-relaxed">
                  {t.contact.addressLine1}
                  <br />
                  {t.contact.addressLine2}
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-accent text-xs font-bold tracking-widest uppercase hover:underline"
                >
                  {t.contact.directions}
                </a>
              </div>

              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  {t.contact.hoursTitle}
                </h3>
                <p className="text-text/60 text-sm">{t.contact.hoursValue}</p>
              </div>

              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  {t.contact.touchTitle}
                </h3>
                {/* Contact details stay in Latin digits on purpose — they are dialable */}
                <div className="text-text/60 text-sm space-y-1" dir="ltr">
                  <p>+20 100 123 4567</p>
                  <p>hello@terra.com</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-2xl overflow-hidden h-80 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d31.3236!3d30.0836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA1JzAwLjkiTiAzMcKwMTknMjUuMCJF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="terra café location"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
