/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'liquidRipple': 'liquidRipple 0.6s ease-out forwards',
      },
      keyframes: {
        liquidRipple: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(8)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}