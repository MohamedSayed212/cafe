"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Container from "@/components/Container";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageProvider";

// Converts 24h "HH:MM" → "H:MM AM/PM" for display in the success modal
function to12h(time24, t) {
  if (!time24) return "";
  const [h, m] = time24.split(":");
  const hour = parseInt(h);
  const period = hour >= 12 ? t.pm : t.am;
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${m} ${period}`;
}

// Custom 12-hour time picker — three selects: Hour / Minute / AM·PM
function TimePicker({ value, onChange, t }) {
  // Parse the stored 24h value back to 12h parts for display
  const parse = (val) => {
    if (!val) return { hour: "", minute: "00", period: "AM" };
    const [h, m] = val.split(":");
    const hour24 = parseInt(h);
    return {
      hour: String(hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24),
      minute: m,
      period: hour24 >= 12 ? "PM" : "AM",
    };
  };

  const { hour, minute, period } = parse(value);

  // Convert 12h parts → 24h string and bubble up
  const emit = (h, m, p) => {
    if (!h) return;
    let h24 = parseInt(h);
    if (p === "PM" && h24 !== 12) h24 += 12;
    if (p === "AM" && h24 === 12) h24 = 0;
    onChange(`${String(h24).padStart(2, "0")}:${m}`);
  };

  const base =
    "flex-1 border-y border-text/10 px-3 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent appearance-none text-center cursor-pointer";

  return (
    <div className="flex border border-text/10 rounded-xl overflow-hidden focus-within:border-accent transition-colors">
      <select
        value={hour}
        onChange={(e) => emit(e.target.value, minute, period)}
        className={`${base} border-s-0 border-e border-text/10`}
      >
        <option value="">{t.hour}</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <select
        value={minute}
        onChange={(e) => emit(hour, e.target.value, period)}
        className={`${base} border-e border-text/10`}
      >
        {[
          "00",
          "05",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
          "55",
        ].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={period}
        onChange={(e) => emit(hour, minute, e.target.value)}
        className={`${base} border-e-0 w-20`}
      >
        <option value="AM">{t.am}</option>
        <option value="PM">{t.pm}</option>
      </select>
    </div>
  );
}

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  notes: "",
};

function SuccessModal({ form, onClose, t, locale }) {
  const formattedDate = form.date
    ? new Date(form.date + "T00:00:00").toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop — click to dismiss */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Card */}
        <motion.div
          className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-primary mb-2">
            {t.modal.title}
          </h3>
          <p className="text-text/50 text-sm mb-8">{t.modal.message}</p>

          {/* Summary of what was booked */}
          <div className="bg-background rounded-xl p-5 text-start space-y-3 mb-8">
            <Row label={t.name} value={form.name} />
            <Row label={t.email} value={form.email} />
            <Row label={t.phone} value={form.phone} />
            <Row label={t.date} value={formattedDate} />
            <Row label={t.time} value={to12h(form.time, t)} />
            <Row
              label={t.guests}
              value={`${form.guests} ${form.guests === "1" ? t.guestSingular : t.guestPlural}`}
            />
            {form.notes && <Row label={t.notes} value={form.notes} />}
          </div>

          {/* Closes the modal AND resets the form */}
          <button
            onClick={onClose}
            className="w-full bg-primary text-white font-bold tracking-widest text-xs py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            {t.modal.done}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-text/40 font-medium shrink-0">{label}</span>
      <span className="text-text font-semibold text-end">{value}</span>
    </div>
  );
}

export default function ReservationSection() {
  const { lang, t: dict } = useLanguage();
  const t = dict.reservation; // shorthand — this section only needs its own keys

  const [form, setForm] = useState(INITIAL_FORM);
  const [phoneError, setPhoneError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "phone") setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phone = form.phone.replace(/\s/g, "");
    if (!phone.startsWith("01") || phone.length !== 11) {
      setPhoneError(t.phoneError);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    // Save reservation to Supabase
    const { error } = await supabase.from("reservations").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      message: form.notes,
      // status defaults to 'pending' in the database
    });

    setSubmitting(false);

    if (error) {
      console.error("Reservation error:", error);
      setSubmitError(error.message);
      return;
    }

    // Show success modal only after successful save
    setShowModal(true);
  };

  // "Done" → close the modal and clear the form
  const handleClose = () => {
    setShowModal(false);
    setForm(INITIAL_FORM);
    setSubmitError("");
  };

  return (
    <>
      {showModal && (
        <SuccessModal
          form={form}
          onClose={handleClose}
          t={t}
          locale={lang === "ar" ? "ar-EG" : "en-EG"}
        />
      )}

      <section id="reservation" className="py-14 bg-background">
        <Container size="sm">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
                {t.eyebrow}
              </p>
              <h2 className="text-4xl font-bold text-primary">{t.title}</h2>
              <p className="text-text/50 mt-4 text-sm">{t.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl shadow-sm border border-text/5 p-8 space-y-5"
            >
              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    dir="ltr"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    required
                    className={`w-full border rounded-xl px-4 py-3 text-text text-sm bg-background text-start focus:outline-none ${
                      phoneError
                        ? "border-red-400 focus:border-red-400"
                        : "border-text/10 focus:border-accent"
                    }`}
                  />
                  {phoneError && (
                    <p className="text-red-400 text-xs mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  dir="ltr"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background text-start focus:outline-none focus:border-accent"
                />
              </div>

              {/* Date & Time — side by side */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                    {t.date}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                    {t.time}
                  </label>
                  <TimePicker
                    value={form.time}
                    onChange={(val) => setForm({ ...form, time: val })}
                    t={t}
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                  {t.guests}
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t.guestSingular : t.guestPlural}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                  {t.notes}
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t.notesPlaceholder}
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="text-red-500 text-sm text-center">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white font-bold tracking-widest text-xs py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? t.submitting : t.submit}
              </button>
            </form>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
