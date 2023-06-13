/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/public/login-background.png')",
      },
      maxHeight: {
        '96': '494px',
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
}

