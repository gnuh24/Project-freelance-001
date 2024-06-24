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
        redProject: {
          50: '#FF0606',
          100: '#E33629',
          200: '#FF3C2F',
          300: '#FF592C',
          400: '#FE0000',
          500: '#E27022',
          600: '#FA4A41',
          700: '#5D0101',
        },
        greenProject: {
          50: '#319F43',
          100: '#13E301',
        },
        blueProject: {
          50: '#587DBD',
          100: '#204D9B',
          200: '#318FA8',
          300: '#3D5A98',
          400: '#0A7EEB',
          500: '#000833',
          600: '#0289B3',
          700: '#231F20',
        },
        yellowProject: {
          50: '#F8BD00',
          100: '#FFF500',
        },
        orangeProject: {
          50: '#FF3C2F',
          100: '#FF5C2C',
          200: '#E27022',
          300: '#FA4A41',
        },
        grayProject: {
          50: '#D9D9D9',
          100: '#999999',
          200: '#BFBFBF',
          300: '#7F7F7F',
          400: '#D1D1D6',
          500: '#3C3C3C',
          600: '#383634',
          700: '#D6D5D6',
          800: '#F2F2F7',
          900: '#BDDBDD',
          950: '#D9D9D9',
          975: '#BDBDBD',
        },
        blackProject: {
          50: '#000000',
          100: '#121212',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#222125',
        },
        whiteProject: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
        },
        brownProject: {
          50: '#5A575C',
          100: '#AEAE82',
          200: '#E4A341',
        },
        linearProject: {
          50: 'Linear',
          100: 'Linear',
          200: 'Linear',
        },
        radialProject: {
          50: 'Radial',
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
