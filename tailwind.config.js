/* ==========================================================================
   CONFIG
   ========================================================================== */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-dark": "#0a0a0a",
        "surface-card": "#121212",
        "light": "#F9FAFB",
        "muted": "#9CA3AF",
        "brand-contrast": "#F59E0B",
        "error": "#EF4444",
      },
      fontFamily: {
        sans: ["Poppins", "Plus Jakarta Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
