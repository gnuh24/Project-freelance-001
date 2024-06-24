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
        red: {
          50: "#FF0606",
          100: "#E33629",
          200: "#FF3C2F",
          300: "#FF592C",
          400: "#FE0000",
          500: "#E27022",
          600: "#FA4A41",
          700: "#5D0101"
      },
      green: {
          50: "#319F43",
          100: "#13E301"
      },
      blue: {
          50: "#587DBD",
          100: "#204D9B",
          200: "#318FA8",
          300: "#3D5A98",
          400: "#0A7EEB",
          500: "#000833",
          600: "#0289B3",
          700: "#231F20"
      },
      yellow: {
          50: "#F8BD00",
          100: "#FFF500"
      },
      orange: {
          50: "#FF3C2F",
          100: "#FF5C2C",
          200: "#E27022",
          300: "#FA4A41"
      },
      gray: {
          50: "#D9D9D9",
          100: "#999999",
          200: "#BFBFBF",
          300: "#7F7F7F",
          400: "#D1D1D6",
          500: "#3C3C3C",
          600: "#383634",
          700: "#D6D5D6",
          800: "#F2F2F7",
          900: "#BDDBDD",
          950: "#D9D9D9",
          975: "#BDBDBD"
      },
      black: {
          50: "#000000",
          100: "#121212",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#000000",
          600: "#222125"
      },
      white: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF"
      },
      brown: {
          50: "#5A575C",
          100: "#AEAE82",
          200: "#E4A341"
      },
      linear: {
          50: "Linear",
          100: "Linear",
          200: "Linear"
      },
      radial: {
          50: "Radial"
      }
        ,
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
