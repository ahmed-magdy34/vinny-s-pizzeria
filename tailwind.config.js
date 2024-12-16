/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the root index.html
    "./src/**/*.{js,jsx,ts,tsx}", // Include all relevant file extensions in src
  ],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
