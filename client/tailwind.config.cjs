module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C8A2C8',
        lilac: {
          50: '#FBF7FB',
          100: '#F7EFF7',
          200: '#EEDFEF',
          300: '#E5CFE7',
          400: '#D8B6D8',
          500: '#C8A2C8',
          600: '#A67AA6',
          700: '#7F4F7F',
          800: '#5F335F',
          900: '#3F1F3F',
        },
      },
      borderRadius: {
        lg: '0.75rem',
      },
      boxShadow: {
        'card-lg': '0 8px 24px rgba(60, 20, 60, 0.08)',
      },
    },
  },
  plugins: [],
};
