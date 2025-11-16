import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated palette: Deep plum base with warm coral accent
        primary: {
          50: '#faf5f8',
          100: '#f5ebf1',
          200: '#edd9e5',
          300: '#dfbbd1',
          400: '#cb91b5',
          500: '#b76d9a',
          600: '#9f507d',
          700: '#864066',
          800: '#703756',
          900: '#5f324a',
          950: '#3a1a2c', // Deep plum base
        },
        accent: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd5cc',
          300: '#ffb6a8',
          400: '#ff8974',
          500: '#fc6447', // Warm coral accent
          600: '#e94323',
          700: '#c43519',
          800: '#a22f18',
          900: '#862d1c',
          950: '#49140a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a', // Rich charcoal
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
