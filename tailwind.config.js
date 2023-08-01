/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         colors: {
            text: "#e0ebf5",
            background: "#0c1a27",
            primary: "#d4c6ba",
            secondary: "#2c2621",
            accent: "#808589",
         },
      },
   },
   plugins: [],
};
