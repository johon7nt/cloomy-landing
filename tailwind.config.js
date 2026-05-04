export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-page': '#0A0A14',
        'bg-card': '#13131E',
        'bg-elevated': '#1A1A2A',
        'bg-footer': '#F2EAD8',
        'brand-500': '#6C47FF',
        'brand-600': '#5A38F5',
        'brand-700': '#4B2ECC',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A8A8B8',
        'text-tertiary': '#68687A',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 22s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'brand-glow': '0 0 40px rgba(108, 71, 255, 0.25)',
        'brand-glow-lg': '0 0 80px rgba(108, 71, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
