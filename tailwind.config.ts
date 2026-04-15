import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── HWZ Brand Palette ──────────────────────
        deep:    "#0C342C",
        dark:    "#076653",
        mid:     "#076653",
        forest:  "#076653",
        sage:    "#E2FBCE",
        mint:    "#FFFDEE",
        mist:    "#E2FBCE",
        gold:    "#E3EF26",
        crimson: "#E3EF26",
        "crimson-glow": "#E3EF26",
        // Lumme (client palette)
        lumme: {
          cream: "#FFFDEE",
          lime: "#E3EF26",
          mint: "#E2FBCE",
          forest: "#076653",
          night: "#0C342C",
        },
      },
      fontFamily: {
        serif:    ["Cormorant Garamond", "Georgia", "serif"],
        sans:     ["DM Sans", "system-ui", "sans-serif"],
        ethiopic: [
          "Abyssinica SIL",
          "Noto Serif Ethiopic",
          "Nyala",
          "Ethiopia Jiret",
          "serif",
        ],
      },
      backdropBlur: {
        glass: "16px",
      },
      animation: {
        "pulse-gold":   "pulseGold 2.8s ease-in-out infinite",
        "pulse-red":    "pulseRed 2.8s ease-in-out infinite",
        "fade-in-up":   "fadeInUp 0.8s ease forwards",
        "scale-in":     "scaleIn 1.1s cubic-bezier(0.22,1,0.36,1) forwards",
        "scroll-down":  "scrollDown 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 22px rgba(227,239,38,.35), 0 4px 20px rgba(0,0,0,.3)" },
          "50%":     { boxShadow: "0 0 45px rgba(227,239,38,.6), 0 8px 30px rgba(0,0,0,.4)" },
        },
        pulseRed: {
          "0%,100%": { boxShadow: "0 0 22px rgba(227,239,38,.35), 0 4px 20px rgba(0,0,0,.35)" },
          "50%":     { boxShadow: "0 0 48px rgba(227,239,38,.7), 0 8px 28px rgba(0,0,0,.45)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { transform: "scale(0.92)" },
          to:   { transform: "scale(1)" },
        },
        scrollDown: {
          "0%":   { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "50%":  { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
          "51%":  { transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
