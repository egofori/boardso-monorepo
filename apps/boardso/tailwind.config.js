/** @type {import('tailwindcss').Config} */
const config = require("tailwind-config/tailwind.config.js")

module.exports = {
  ...config,
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
