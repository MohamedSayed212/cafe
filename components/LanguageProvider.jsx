"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";

// Shared language state. Wraps the site in app/(website)/layout.jsx so the
// Navbar toggle and every section read the same value.
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Flip the document direction so Tailwind's rtl:/ltr: variants and logical
  // utilities (ms-, me-, text-start) mirror the layout automatically.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Read the current language + dictionary: const { t, lang, setLang } = useLanguage();
export function useLanguage() {
  return useContext(LanguageContext);
}
