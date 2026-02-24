import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // ✅ Alias (compatibilidad)
        primary: "#0A3B8C",
        primaryDark: "#072E6E",
        secondary: "#F97316",
        bgLight: "#F8FAFC",
        textMain: "#1E293B",

        // ✅ Texto consistente (marca) — MÁS LEGIBLE
        textStrong: "#0F172A", // títulos
        textBody: "#1E293B",   // párrafos (más oscuro y nítido)
        textMuted: "#334155",  // secundario (no apagado)

        // ✅ Paleta ORIAVISION basada en #0A3B8C
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1D4ED8",
          600: "#0A3B8C",
          700: "#072E6E",
          900: "#041A3D",
        },
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1200px",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;