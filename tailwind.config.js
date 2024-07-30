/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#F87171",
        tertiary: "#FBBF24",
        dark: "#1F2937",
        light: "#F9FAFB",
        green: "#10B981",
      },
    },
  },
  plugins: [],
} 