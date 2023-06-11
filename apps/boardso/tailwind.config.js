/** @type {import('tailwindcss').Config} */
const config = require("tailwind-config/tailwind.config.js")
const withMT = require("@material-tailwind/react/utils/withMT")
const colors = require("tailwindcss/colors")

module.exports = withMT({
  ...config,
  theme: {
    colors,
    extend: {
      colors: {
        "primary": colors.teal,
        "secondary": colors.amber,
        "tertiary": colors.slate,
      },
      backgroundImage: {
        "hero-image": "url('/assets/images/jon-tyson-YpR2V2C1IP0-unsplash.jpg')",
      },
    },
  },
  plugins: [],
})
