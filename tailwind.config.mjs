/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakartasans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        pixelify: ["var(--font-pixelify-sans)", "serif"],
        playfair: ["var(--font-playfair)"],
        cormorant: ["var(--font-cormorant)"],

      },
      colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",

      // UI lama (jangan dihapus dulu)
      purpleNavbar: "#CB9DF0",
      pinkNavbar: "#F0C1E1",
      yellowBright: "#FFF9BF",
      yellowBG: "#FFFBD7",
      purple: "#C986FF",
      darkPurple: "#4B0088",

      // UI BARU
      primary: "#839E8F",
      cream: "#F4EFE7",
      card: "#D9D9D9",
      textMain: "#4E5F5A",
      accent: "#F5E4A5",
    },
    },
  },
  plugins: [],
};
