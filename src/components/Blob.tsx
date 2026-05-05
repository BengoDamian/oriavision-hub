"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Blob() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[620px] w-[1120px] -translate-x-1/2 rounded-full bg-blue-50 blur-3xl opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-240px] h-[660px] w-[1180px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),rgba(96,165,250,0.10)_42%,rgba(255,255,255,0)_72%)] blur-2xl"
        animate={{ y: [0, 28, 0], scale: [1, 1.06, 1], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-180px] top-[150px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.18),rgba(255,255,255,0)_68%)] blur-2xl"
        animate={{ x: [0, 38, 0], y: [0, -22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-160px] top-[120px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),rgba(255,255,255,0)_70%)] blur-2xl"
        animate={{ x: [0, -34, 0], y: [0, 28, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35"
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
