"use client";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 bg-background">
      <Container className="grid md:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="relative rounded-2xl overflow-hidden h-96">
            <Image
              src="/terraAbout.jpeg"
              alt="terra café"
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div>
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              {t.about.eyebrow}
            </p>
            <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">
              {t.about.titleLine1}
              <br />
              {t.about.titleLine2}
            </h2>
            <p className="text-text/60 leading-relaxed mb-4">
              {t.about.paragraph1}
            </p>
            <p className="text-text/60 leading-relaxed mb-10">
              {t.about.paragraph2}
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-bold text-primary">2018</p>
                <p className="text-text/50 text-sm mt-1">
                  {t.about.statEstLabel}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-text/50 text-sm mt-1">
                  {t.about.statDrinksLabel}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
