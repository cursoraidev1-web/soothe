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
        // SOOHE TECHNOLOGIES Brand Colors
        // Primary: Deep Purple (#770F5B)
        primary: {
          50: '#faf5f9',
          100: '#f5ebf3',
          200: '#edd6e8',
          300: '#dfb5d6',
          400: '#cb8abd',
          500: '#b76da3',
          600: '#9f5088',
          700: '#86406e',
          800: '#70375a',
          900: '#5f324a',
          950: '#770F5B', // Base Deep Purple
          DEFAULT: '#770F5B',
        },
        // Secondary: Vivid Purple (#FF2BD0)
        secondary: {
          50: '#fff5fd',
          100: '#ffe8fb',
          200: '#ffd5f7',
          300: '#ffb6f0',
          400: '#ff8ae6',
          500: '#ff5dd9',
          600: '#FF2BD0', // Base Vivid Purple
          700: '#e61fb8',
          800: '#c41a9a',
          900: '#a2177e',
          950: '#7a1259',
          DEFAULT: '#FF2BD0',
        },
        // Soft Beige (#DCCBB8)
        beige: {
          50: '#faf9f7',
          100: '#f5f2ed',
          200: '#ede6d9',
          300: '#e2d4c0',
          400: '#DCCBB8', // Base Soft Beige
          500: '#c9b8a3',
          600: '#b5a38d',
          700: '#9d8a72',
          800: '#7f6f5c',
          900: '#66584a',
          950: '#3d342c',
          DEFAULT: '#DCCBB8',
        },
        // Accent: Using Vivid Purple as accent
        accent: {
          50: '#fff5fd',
          100: '#ffe8fb',
          200: '#ffd5f7',
          300: '#ffb6f0',
          400: '#ff8ae6',
          500: '#ff5dd9',
          600: '#FF2BD0', // Base Vivid Purple
          700: '#e61fb8',
          800: '#c41a9a',
          900: '#a2177e',
          950: '#7a1259',
          DEFAULT: '#FF2BD0',
        },
        // Neutral: Updated to use Midnight Black (#140211) as base
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
          950: '#140211', // Midnight Black
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
