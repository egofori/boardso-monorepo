/** @type {import('tailwindcss').Config} */
const config = require("tailwind-config/tailwind.config.js")
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  ...config,
  theme: {
    extend: {},
  },
  plugins: [],
})
