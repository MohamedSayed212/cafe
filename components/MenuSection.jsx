import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { products } from "@/data/products";

// Hand-picked preview — one from each category to show variety
const PREVIEW_IDS = [1, 5, 8, 10, 13, 19];
const preview = products.filter((p) => PREVIEW_IDS.includes(p.id));

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              A Taste of What We Offer
            </p>
            <h2 className="text-4xl font-bold text-primary mb-4">Menu Preview</h2>
            <p className="text-text/50 text-sm leading-relaxed max-w-sm mx-auto">
              A curated selection across our menu — coffee, iced drinks, desserts, and fresh bakery.
            </p>
          </div>
        </FadeIn>

        {/* Preview cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {preview.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08} className={i >= 4 ? "hidden sm:block" : ""}>
              <div className="bg-card rounded-2xl overflow-hidden border border-text/5 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-primary text-base leading-snug">
                      {product.name}
                    </h3>
                    <span className="text-accent font-bold text-sm whitespace-nowrap">
                      {product.price} EGP
                    </span>
                  </div>
                  <p className="text-text/55 text-xs leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-accent/70 bg-accent/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="text-center">
            <Link
              href="/menu"
              className="inline-block bg-primary text-white font-bold tracking-widest text-xs px-10 py-4 rounded-full hover:bg-primary/90 transition-colors"
            >
              VIEW FULL MENU
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
