// design-system/tailwind.shared.js — Design tokens compartilhados (φ = 1.618)
const phi = 1.618;

// Escala φ para espaçamento (base 4px)
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

// Escala φ para tipografia
const fontSize = {
  xs: ['0.75rem', { lineHeight: '1.5' }],      // 12px
  sm: ['0.875rem', { lineHeight: '1.5' }],     // 14px
  base: ['1rem', { lineHeight: '1.6' }],       // 16px
  lg: ['1.125rem', { lineHeight: '1.6' }],     // 18px
  xl: ['1.25rem', { lineHeight: '1.5' }],      // 20px
  '2xl': ['1.5rem', { lineHeight: '1.4' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '1.3' }],  // 30px
  '4xl': ['2.25rem', { lineHeight: '1.2' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1.1' }],      // 48px
  '6xl': ['3.75rem', { lineHeight: '1.1' }],   // 60px
};

// Cores — SUAS CORES (substitua pelos hex reais)
const colors = {
  // Primária (azul escuro profissional)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e3a8a',  // SUA COR PRIMÁRIA
    900: '#1e3a8a',
    950: '#172554',
  },
  // Secundária / Accent (dourado/âmbar)
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  // Neutros (warm gray)
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
    950: '#0a0a0a',
  },
  // Semânticas
  success: {
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
};

// Bordas
const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
};

// Sombras
const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};

// Transições (GSAP-friendly)
const transitionDuration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
};

const transitionTimingFunction = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  // GSAP power easings aproximados
  'power1-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'power2-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'power3-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  'power4-out': 'cubic-bezier(0.005, 1, 0.165, 1)',
  'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
};

const fontFamily = {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  heading: ['var(--font-heading)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
};

export default {
  darkMode: 'class',
  theme: {
    extend: {
      spacing,
      fontSize,
      colors,
      borderRadius,
      boxShadow,
      transitionDuration,
      transitionTimingFunction,
      fontFamily,
      // Container widths
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      // Animações customizadas
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'text-reveal': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out',
        'slide-up': 'slide-up 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slide-down 300ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
        'text-reveal': 'text-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 2s linear infinite',
      },
      // Z-index scale
      zIndex: {
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        dropdown: '1000',
        sticky: '1100',
        modal: '1200',
        popover: '1300',
        tooltip: '1400',
        toast: '1500',
      },
    },
  },
  plugins: [],
};