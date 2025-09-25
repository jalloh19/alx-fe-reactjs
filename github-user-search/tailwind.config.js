/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          black: '#24292f',
          white: '#ffffff',
          border: '#d0d7de',
          green: '#2da44e',
          'green-hover': '#2c974b',
          blue: '#0969da',
          gray: '#57606a',
          red: '#cf222e',
          'input-bg': '#f6f8fa',
        },
      },
    },
  },
  plugins: [],
}

