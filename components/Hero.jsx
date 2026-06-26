import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative bg-primary min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-black/60" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="text-white">
          <FadeIn delay={0}>
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-5">
              Specialty Coffee · Cairo, Egypt
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Where Every Cup
              <br />
              <span className="text-accent">Tells a Story</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Handcrafted coffee, a warm atmosphere, and a corner of Cairo that
              feels like home. Come as a stranger, leave as a regular.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="bg-accent text-white font-bold tracking-widest text-xs px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                VIEW MENU
              </Link>
              <Link
                href="#reservation"
                className="border border-white/30 text-white font-bold tracking-widest text-xs px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                RESERVE A TABLE
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
            {/* floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-2xl font-bold">Est. 2018</p>
              <p className="text-xs tracking-widest uppercase mt-1 text-white/80">
                Serving Cairo
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
