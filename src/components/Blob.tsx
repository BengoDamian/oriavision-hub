"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Blob() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[min(1000px,92vw)] -translate-x-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl" />
    );
  }

  return (
    <motion.div
      className="absolute left-1/2 top-0 -z-10 h-[520px] w-[min(1000px,92vw)] -translate-x-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl"
      animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}