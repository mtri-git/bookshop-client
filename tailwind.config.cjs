/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
      boxShadow: {
        '3xl': '0 35px 60px -15px rgb(249,115,22)',
        'xl': '-2px 10px 30px -10px rgb(249,115,22)',
      },
      borderRadius:{
        'image': '50%'
      },
      letterSpacing:{
        'otp':'3rem'
      },
      fontSize:{
        'otp':'2rem'
      },      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
        'book-flip': 'bookFlip 1.5s ease-in-out infinite',
        'progress': 'progressBar 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        bookFlip: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-180deg)' },
        },
        progressBar: {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      flex: {
        '1': '1 0 0%',
        '2':'2 0 0%'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
