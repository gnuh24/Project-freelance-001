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
      colors: {
        primary: {
          50: '#f3f8f6',
          100: '#e7f1ed',
          200: '#c2e0d8',
          300: '#9ed0c4',
          400: '#54b1a0',
          500: '#0f917c',
          600: '#0e8173',
          700: '#0c6a5f',
          800: '#0a534b',
          900: '#09463d',
        },
        secondary: {
          50: '#f8f7f9',
          100: '#f1eff3',
          200: '#dfd9e1',
          300: '#cec4d0',
          400: '#ab9dad',
          500: '#896a8a',
          600: '#7a5f7b',
          700: '#664f67',
          800: '#503f53',
          900: '#423540',
        },
        tertiary: {
          50: '#f9f9f8',
          100: '#f3f3f1',
          200: '#e0e0d9',
          300: '#cecdc2',
          400: '#a9a9a0',
          500: '#84847c',
          600: '#74746f',
          700: '#5f5f5e',
          800: '#4a4a4b',
          900: '#3e3e3d',
        },
        quaternary: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e0e0e0',
          300: '#cecece',
          400: '#aaaaaa',
          500: '#858585',
          600: '#757575',
          700: '#606060',
          800: '#4b4b4b',
          900: '#3f3f3f',
        },
        quinary: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e0e0e0',
          300: '#cecece',
          400: '#aaaaaa',
          500: '#858585',
          600: '#757575',
          700: '#606060',
          800: '#4b4b4b',
          900: '#3f3f3f',
        },
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
