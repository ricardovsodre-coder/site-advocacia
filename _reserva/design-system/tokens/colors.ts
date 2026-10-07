// design-system/tokens/colors.ts — Suas cores como tokens semânticos
export const colorTokens = {
  // Primária (identidade visual)
  primary: {
    light: '#3b82f6',
    DEFAULT: '#2563eb',
    dark: '#1d4ed8',
    darker: '#1e3a8a',
    contrast: '#ffffff',
  },
  // Accent (dourado/âmbar)
  accent: {
    light: '#fbbf24',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
    darker: '#b45309',
    contrast: '#171717',
  },
  // Neutros warm
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
  semantic: {
    success: {
      light: '#4ade80',
      DEFAULT: '#22c55e',
      dark: '#16a34a',
    },
    warning: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
    error: {
      light: '#f87171',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
    },
    info: {
      light: '#60a5fa',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
    },
  },
  // Backgrounds
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    inverse: '#171717',
  },
  // Text
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    inverse: '#fafafa',
    link: '#2563eb',
    linkHover: '#1d4ed8',
  },
  // Borders
  border: {
    light: '#e5e5e5',
    DEFAULT: '#d4d4d4',
    dark: '#a3a3a3',
    focus: '#2563eb',
    error: '#ef4444',
  },
  // Overlay
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    DEFAULT: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

export type ColorTokens = typeof colorTokens;