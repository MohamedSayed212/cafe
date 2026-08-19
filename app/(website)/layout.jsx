import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/components/LanguageProvider";

export default function WebsiteLayout({ children }) {
  return (
    // LanguageProvider wraps everything so the Navbar toggle and all
    // sections share one `lang` value.
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Floating WhatsApp button — visible on every website page */}
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}
