"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const y = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
