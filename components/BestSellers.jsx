import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { products } from "@/data/products";

// Pick featured drinks by ID and assign a tag
const FEATURED = [
  { id: 2,  tag: "Customer Favorite" },
  { id: 4,  tag: "Barista's Pick"    },
  { id: 7,  tag: "House Specialty"   },
  { id: 10, tag: "Summer Special"    },
];

const featured = FEATURED.map(({ id, tag }) => ({
  ...products.find((p) => p.id === id),
  tag,
}));

export default function BestSellers() {
  return (
    <section className="py-24 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              What We Brew
            </p>
            <h2 className="text-4xl font-bold text-white">Featured Drinks</h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((drink, i) => (
            <FadeIn key={drink.id} delay={i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors h-full flex flex-col">

                {/* Real product image */}
                <div className="relative h-44 flex-shrink-0">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1">
                    {drink.tag}
                  </span>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {drink.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {drink.description}
                  </p>
                  <p className="text-accent font-bold text-sm mt-4">
                    {drink.price} EGP
                  </p>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
