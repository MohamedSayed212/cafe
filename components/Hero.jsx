"use client"; // needed to read the shared language state
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import Container from "@/components/Container";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-primary py-8 mt-[-10px] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-black/60" />

      <Container className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="text-white">
          <FadeIn delay={0}>
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-6 md:mb-5">
              {t.hero.eyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-7 md:mb-6">
              {t.hero.titleLine1}
              <br />
              <span className="text-accent">{t.hero.titleLine2}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 md:mb-10 max-w-md">
              {t.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="bg-accent text-white font-bold tracking-widest text-xs px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                {t.hero.viewMenu}
              </Link>
              <Link
                href="#reservation"
                className="border border-white/30 text-white font-bold tracking-widest text-xs px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                {t.hero.reserve}
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Right — image */}
        <FadeIn direction="left" delay={0.2}>
          <div className="relative hidden md:block">
            <div className="relative rounded-3xl overflow-hidden h-[520px]">
              <Image
                src="/caffe-image.jpg"
                alt="terra café"
                fill
                className="object-cover"
              />
            </div>
            {/* floating accent card — mirrors to the other side in RTL */}
            <div className="absolute -bottom-6 -left-6 rtl:left-auto rtl:-right-6 bg-accent text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-2xl font-bold">{t.hero.est}</p>
              <p className="text-xs tracking-widest uppercase mt-1 text-white/80">
                {t.hero.serving}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
