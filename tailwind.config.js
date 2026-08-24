/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // SMCC (Vpass) design tokens — clean, modern green system
        surface: '#f4f9f5',
        'surface-dim': '#d3e0d7',
        'surface-bright': '#f4f9f5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e9f4ec',
        'surface-container': '#e2efe6',
        'surface-container-high': '#dbe9df',
        'surface-container-highest': '#d4e3d8',
        'on-surface': '#14211a',
        'on-surface-variant': '#48584f',
        'inverse-surface': '#28322c',
        'inverse-on-surface': '#eaf3ec',
        outline: '#6f8078',
        'outline-variant': '#c3d5c9',
        primary: '#00846D',
        'on-primary': '#ffffff',
        'primary-container': '#00a98c',
        'on-primary-container': '#ffffff',
        'primary-fixed': '#bfeee4',
        'primary-fixed-dim': '#7fd9c8',
        secondary: '#0e8c86',
        'on-secondary': '#ffffff',
        'secondary-container': '#14b8a6',
        'secondary-fixed': '#c9efe9',
        tertiary: '#7a5200',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#96660a',
        'tertiary-fixed': '#ffe1a8',
        'tertiary-fixed-dim': '#ffc65a',
        'on-tertiary-fixed': '#2a1c00',
        background: '#f4f9f5',
        'on-background': '#14211a',

        // Legacy aliases remapped so existing components adopt the SMCC palette
        rakuten: {
          red: '#00846D',
          dark: '#006152',
        },
        mc: {
          red: '#00846D',
          orange: '#14b8a6',
        },
        ink: '#14211a',
        muted: '#48584f',
        canvas: '#f4f9f5',
        card: '#FFFFFF',
        success: '#1A7F37',
        warning: '#B7791F',
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.1rem' }],
        sm: ['0.9375rem', { lineHeight: '1.35rem' }],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.04)',
        float: '0 8px 20px rgba(0,0,0,0.08)',
        frame: '0 30px 80px rgba(23,23,23,0.28)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
