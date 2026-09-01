/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      screens: {
        // Small phones
        xs: '375px',

        // Existing Tailwind breakpoints remain available:
        // sm: 640px
        // md: 768px
        // lg: 1024px
        // xl: 1280px
        // 2xl: 1536px

        // Large desktop
        '3xl': '1920px',
      },
    },
  },

  plugins: [],
};