import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function AboutUs() {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
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

        <FadeIn direction="left" delay={0.15}>
          <div>
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              Our Story
            </p>
            <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">
              A Passion for Coffee,
              <br />
              Rooted in Cairo
            </h2>
            <p className="text-text/60 leading-relaxed mb-4">
              terra was born from a simple belief — that great coffee deserves a
              great space. Nestled in the heart of Heliopolis, we opened our
              doors to bring specialty coffee culture to Cairo without losing
              the warmth and hospitality Egypt is known for.
            </p>
            <p className="text-text/60 leading-relaxed mb-10">
              Every bean is carefully sourced, every cup is brewed with
              intention. Whether you're starting your morning or winding down
              your evening, terra is your place.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-bold text-primary">2018</p>
                <p className="text-text/50 text-sm mt-1">Est. in Cairo</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-text/50 text-sm mt-1">Drinks on the Menu</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
