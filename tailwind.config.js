/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0A369D',
        'brand-blue-dark': '#061A45',
        'brand-blue-light': '#E6F0FF',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        classic: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
