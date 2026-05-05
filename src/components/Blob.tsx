"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Blob() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-50 opacity-70 blur-3xl" />
        <div className="absolute -right-28 top-28 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="absolute -left-28 top-64 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-50 opacity-70 blur-3xl"
        animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-28 top-28 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-28 top-64 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl"
        animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
