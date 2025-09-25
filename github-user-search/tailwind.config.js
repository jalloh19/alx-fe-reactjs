/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-dark': '#0d1117',
        'github-gray': '#161b22',
        'github-border': '#30363d',
        'github-text': '#f0f6fc',
        'github-muted': '#8b949e',
      },
    },
  },
  plugins: [],
}

