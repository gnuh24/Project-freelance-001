const flowbite = require('flowbite-react/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      textShadow: {
        '3d-white-left-up':
          '-2px -2px 0px rgba(255, 255, 255, 1), -4px -4px 0px rgba(255, 255, 255, 1), -6px -6px 0px rgba(255, 255, 255, 1)',
      },
    },
  },
  darkMode: 'selector',
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-3d-white-left-up': {
          textShadow:
            '-2px -2px 0px rgba(255, 255, 255, 1), -4px -4px 0px rgba(255, 255, 255, 1), -6px -6px 0px rgba(255, 255, 255, 1)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
