import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import BestSellers from "@/components/BestSellers";
import MenuSection from "@/components/MenuSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Questions from "@/components/Questions";
import ReservationSection from "@/components/ReservationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <BestSellers />
      <MenuSection />
      <WhyChooseUs />
      <Gallery />
      <Questions />
      <ReservationSection />
      <ContactSection />
    </>
  );
}
