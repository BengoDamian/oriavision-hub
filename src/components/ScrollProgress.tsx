"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-brand-600 via-blue-400 to-yellow-300 shadow-[0_0_18px_rgba(37,99,235,0.45)]"
      style={{ scaleX }}
    />
  );
}
