"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Blob() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
    );
  }

  return (
    <motion.div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"
      animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}