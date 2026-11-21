/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'image': '50%'
      },
      letterSpacing: {
        'otp': '3rem'
      },
      fontSize: {
        'otp': '2rem'
      },
      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
      },
    }
  },
  plugins: [],
}
