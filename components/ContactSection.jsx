import FadeIn from "@/components/FadeIn";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              Find Us
            </p>
            <h2 className="text-4xl font-bold text-primary">Contact & Location</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-10">
              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  Address
                </h3>
                <p className="text-text/60 text-sm leading-relaxed">
                  15 El-Nozha Street, Heliopolis
                  <br />
                  Cairo, Egypt
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-accent text-xs font-bold tracking-widest uppercase hover:underline"
                >
                  Get Directions →
                </a>
              </div>

              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  Opening Hours
                </h3>
                <p className="text-text/60 text-sm">Open 24 hours · 7 days a week</p>
              </div>

              <div>
                <h3 className="text-primary font-bold text-xs tracking-widest uppercase mb-3">
                  Get in Touch
                </h3>
                <div className="text-text/60 text-sm space-y-1">
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
      </div>
    </section>
  );
}
