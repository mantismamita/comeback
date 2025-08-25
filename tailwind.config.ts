import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          400: 'oklch(70.4% 0.191 22.216)',
          500: 'oklch(63.7% 0.237 25.331)',
          600: 'oklch(57.7% 0.245 27.325)',
        },
        orange: {
          50: 'oklch(98% 0.016 73.684)',
          900: 'oklch(40.8% 0.123 38.172)',
        },
        yellow: {
          50: 'oklch(98.7% 0.026 102.212)',
          200: 'oklch(94.5% 0.129 101.54)',
          400: 'oklch(85.2% 0.199 91.936)',
          800: 'oklch(47.6% 0.114 61.907)',
          900: 'oklch(42.1% 0.095 57.708)',
        },
        green: {
          400: 'oklch(79.2% 0.209 151.711)',
          600: 'oklch(62.7% 0.194 149.214)',
        },
        blue: {
          500: 'oklch(62.3% 0.214 259.815)',
        },
        indigo: {
          100: 'oklch(93% 0.034 272.788)',
          500: 'oklch(58.5% 0.233 277.117)',
          600: 'oklch(51.1% 0.262 276.966)',
        },
        purple: {
          600: 'oklch(55.8% 0.288 302.321)',
        },
        pink: {
          400: 'oklch(71.8% 0.202 349.761)',
          600: 'oklch(59.2% 0.249 0.584)',
        },
        gray: {
          50: 'oklch(98.5% 0.002 247.839)',
          100: 'oklch(96.7% 0.003 264.542)',
          200: 'oklch(92.8% 0.006 264.531)',
          300: 'oklch(87.2% 0.01 258.338)',
          400: 'oklch(70.7% 0.022 261.325)',
          500: 'oklch(55.1% 0.027 264.364)',
          600: 'oklch(44.6% 0.03 256.802)',
          700: 'oklch(37.3% 0.034 259.733)',
          800: 'oklch(27.8% 0.033 256.848)',
          900: 'oklch(21% 0.034 264.665)',
        },
        // Custom brand colors
        primary: {
          DEFAULT: 'oklch(55.8% 0.288 302.321)', // purple-600
          light: 'oklch(65% 0.25 305)',
          dark: 'oklch(48% 0.28 300)',
        },
        secondary: {
          DEFAULT: 'oklch(59.2% 0.249 0.584)', // pink-600
          light: 'oklch(71.8% 0.202 349.761)', // pink-400
          dark: 'oklch(52% 0.26 5)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Custom gradients
        'comeback-gradient':
          'linear-gradient(to right, var(--tw-gradient-stops))',
        'comeback-gradient-animated':
          'linear-gradient(to right, oklch(55.8% 0.288 302.321), oklch(65% 0.25 305), oklch(68% 0.23 345), oklch(59.2% 0.249 0.584))',
      },
    },
  },
  plugins: [],
};
