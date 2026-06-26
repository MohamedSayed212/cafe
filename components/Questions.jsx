"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do you take table reservations?",
    a: "Yes! You can reserve a table through our website or by calling us directly. We recommend booking in advance, especially on weekends.",
  },
  {
    q: "What are your opening hours?",
    a: "We're open 24 hours a day , 7 days a week.",
  },
  {
    q: "Do you offer takeaway?",
    a: "Absolutely. All drinks and food items on our menu are available for takeaway.",
  },
  {
    q: "Is there Wi-Fi available?",
    a: "Yes, free high-speed Wi-Fi is available for all guests. Just ask one of our baristas for the password.",
  },
];

export default function Questions() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-14 px-6 bg-primary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl font-bold text-white">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-medium text-sm hover:bg-white/5 transition-colors"
              >
                {faq.q}
                <span className="text-accent text-xl ml-4 flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
