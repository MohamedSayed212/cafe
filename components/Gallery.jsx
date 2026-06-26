import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const images = [
  { src: "/caffe-image.jpg",                                          alt: "terra café exterior",  span: "md:col-span-2", h: "h-72" },
  { src: "/terraAbout.jpeg",                                          alt: "terra café sign",      span: "",              h: "h-72" },
  { src: "/inside.jpg",                                               alt: "inside terra",         span: "",              h: "h-56" },
  { src: "/4.jpg",                                                    alt: "terra café details",   span: "",              h: "h-56" },
  { src: "/63ce807a97fef737f3a45fcb_1645078125_29.jpeg",             alt: "terra atmosphere",     span: "",              h: "h-56" },
  { src: "/Bone-Studio-Terra-Cafe-Dubai-Photo-Oculis-Project-Yellowtrace-26.jpg", alt: "terra interior", span: "md:col-span-2", h: "h-56" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
              Our Space
            </p>
            <h2 className="text-4xl font-bold text-primary">
              A Glimpse Inside terra
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <FadeIn key={i} delay={i * 0.08} className={img.span}>
              <div className={`relative ${img.h} rounded-2xl overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
