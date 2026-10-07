// design-system/tokens/spacing.ts — Escala φ (base 4px)
export const spacingTokens = {
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
} as const;

// Semânticos para uso direto
export const semanticSpacing = {
  // Componentes
  component: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    DEFAULT: '1rem', // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  // Layout
  layout: {
    sm: '1rem',      // 16px
    DEFAULT: '1.5rem', // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
  },
  // Seções
  section: {
    sm: '2rem',      // 32px
    DEFAULT: '3rem', // 48px
    lg: '4rem',      // 64px
    xl: '6rem',      // 96px
    '2xl': '8rem',   // 128px
  },
  // Container padding
  container: {
    sm: '1rem',      // 16px
    DEFAULT: '1.5rem', // 24px
    lg: '2rem',      // 32px
    xl: '2.5rem',    // 40px
    '2xl': '3rem',   // 48px
  },
  // Gap
  gap: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    DEFAULT: '1rem', // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
} as const;

export type SpacingTokens = typeof spacingTokens;