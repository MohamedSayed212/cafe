"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { supabase } from "@/lib/supabase";

// Converts 24h "HH:MM" → "H:MM AM/PM" for display in the success modal
function to12h(time24) {
  if (!time24) return "";
  const [h, m] = time24.split(":");
  const hour = parseInt(h);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${m} ${period}`;
}

// Custom 12-hour time picker — three selects: Hour / Minute / AM·PM
function TimePicker({ value, onChange }) {
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
        className={`${base} border-l-0 border-r border-text/10`}
      >
        <option value="">Hr</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      <select
        value={minute}
        onChange={(e) => emit(hour, e.target.value, period)}
        className={`${base} border-r border-text/10`}
      >
        {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={period}
        onChange={(e) => emit(hour, minute, e.target.value)}
        className={`${base} border-r-0 w-20`}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
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

function SuccessModal({ form, onClose }) {
  const formattedDate = form.date
    ? new Date(form.date + "T00:00:00").toLocaleDateString("en-EG", {
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
        {/* Backdrop */}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-primary mb-2">You&apos;re booked!</h3>
          <p className="text-text/50 text-sm mb-8">
            We&apos;ve received your reservation and will confirm shortly.
          </p>

          {/* Summary */}
          <div className="bg-background rounded-xl p-5 text-left space-y-3 mb-8">
            <Row label="Name" value={form.name} />
            <Row label="Email" value={form.email} />
            <Row label="Phone" value={form.phone} />
            <Row label="Date" value={formattedDate} />
            <Row label="Time" value={to12h(form.time)} />
            <Row label="Guests" value={`${form.guests} ${form.guests === "1" ? "Guest" : "Guests"}`} />
            {form.notes && <Row label="Notes" value={form.notes} />}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-white font-bold tracking-widest text-xs py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            DONE
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
      <span className="text-text font-semibold text-right">{value}</span>
    </div>
  );
}

export default function ReservationSection() {
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
      setPhoneError("Enter a valid number (01X XXXXXXXX)");
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

  const handleClose = () => {
    setShowModal(false);
    setForm(INITIAL_FORM);
    setSubmitError("");
  };

  return (
    <>
      {showModal && <SuccessModal form={form} onClose={handleClose} />}

      <section id="reservation" className="py-24 px-6 bg-background">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-accent tracking-[0.3em] text-xs font-semibold uppercase mb-4">
                Visit Us
              </p>
              <h2 className="text-4xl font-bold text-primary">Reserve a Table</h2>
              <p className="text-text/50 mt-4 text-sm">
                Book your spot in advance and we&apos;ll have it ready for you.
              </p>
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
                    Full Name
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0 100 000 0000"
                    required
                    className={`w-full border rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none ${
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
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent"
                />
              </div>

              {/* Date & Time — side by side */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                    Date
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
                    Time
                  </label>
                  <TimePicker
                    value={form.time}
                    onChange={(val) => setForm({ ...form, time: val })}
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                  Guests
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-text mb-2">
                  Special Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests or occasion?"
                  className="w-full border border-text/10 rounded-xl px-4 py-3 text-text text-sm bg-background focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="text-red-500 text-sm text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white font-bold tracking-widest text-xs py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? "SUBMITTING…" : "RESERVE TABLE"}
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
