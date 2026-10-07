// design-system/tokens/typography.ts — Suas fontes + escala φ
export const fontTokens = {
  // Famílias (substitua pelos nomes das SUAS fontes)
  families: {
    sans: 'var(--font-sans, "Inter", system-ui, sans-serif)',
    heading: 'var(--font-heading, "Inter", system-ui, sans-serif)',
    mono: 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
  },
  // Pesos
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  // Tamanhos (escala φ = 1.618, base 16px)
  sizes: {
    xs: { size: '0.75rem', lineHeight: '1.5' },      // 12px
    sm: { size: '0.875rem', lineHeight: '1.5' },     // 14px
    base: { size: '1rem', lineHeight: '1.6' },       // 16px
    lg: { size: '1.125rem', lineHeight: '1.6' },     // 18px
    xl: { size: '1.25rem', lineHeight: '1.5' },      // 20px
    '2xl': { size: '1.5rem', lineHeight: '1.4' },    // 24px
    '3xl': { size: '1.875rem', lineHeight: '1.3' },  // 30px
    '4xl': { size: '2.25rem', lineHeight: '1.2' },   // 36px
    '5xl': { size: '3rem', lineHeight: '1.1' },      // 48px
    '6xl': { size: '3.75rem', lineHeight: '1.1' },   // 60px
  },
  // Letter spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.1em',
  },
  // Line heights
  lineHeights: {
    none: '1',
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

export type FontTokens = typeof fontTokens;

// Helper para gerar classes CSS
export function generateFontClasses() {
  const classes: Record<string, string> = {};
  for (const [key, value] of Object.entries(fontTokens.sizes)) {
    classes[`text-${key}`] = `
      font-size: ${value.size};
      line-height: ${value.lineHeight};
    `;
  }
  return classes;
}