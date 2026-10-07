// generators/sync-tokens.ts — Sincroniza design tokens entre builds
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔄 Syncing design tokens...');

const tokensDir = join('design-system', 'tokens');
const outputDir = join('design-system', 'generated');

// Token files to sync
const tokenFiles = [
  'colors.ts',
  'typography.ts',
  'spacing.ts',
  'border-radius.ts',
  'shadows.ts',
  'motion.ts',
];

// Generate CSS custom properties
function generateCSSVariables() {
  let css = ':root {\n';
  
  // Colors
  css += '  /* Colors */\n';
  css += '  --color-primary: #1e3a8a;\n';
  css += '  --color-primary-hover: #1e40af;\n';
  css += '  --color-accent: #f59e0b;\n';
  css += '  --color-bg: #fafafa;\n';
  css += '  --color-surface: #ffffff;\n';
  css += '  --color-text: #171717;\n';
  css += '  --color-text-muted: #737373;\n';
  css += '  --color-border: #e5e5e5;\n';
  
  // Typography
  css += '\n  /* Typography */\n';
  css += '  --font-sans: "Inter", system-ui, sans-serif;\n';
  css += '  --font-heading: "Inter", system-ui, sans-serif;\n';
  css += '  --font-mono: "JetBrains Mono", ui-monospace, monospace;\n';
  
  // Spacing (φ scale)
  css += '\n  /* Spacing (φ = 1.618) */\n';
  css += '  --space-1: 0.25rem;\n';
  css += '  --space-2: 0.5rem;\n';
  css += '  --space-3: 0.75rem;\n';
  css += '  --space-4: 1rem;\n';
  css += '  --space-5: 1.25rem;\n';
  css += '  --space-6: 1.5rem;\n';
  css += '  --space-8: 2rem;\n';
  css += '  --space-10: 2.5rem;\n';
  css += '  --space-12: 3rem;\n';
  css += '  --space-16: 4rem;\n';
  css += '  --space-20: 5rem;\n';
  css += '  --space-24: 6rem;\n';
  css += '  --space-32: 8rem;\n';
  
  // Border radius
  css += '\n  /* Border Radius */\n';
  css += '  --radius-sm: 0.25rem;\n';
  css += '  --radius: 0.5rem;\n';
  css += '  --radius-md: 0.75rem;\n';
  css += '  --radius-lg: 1rem;\n';
  css += '  --radius-xl: 1.5rem;\n';
  css += '  --radius-2xl: 2rem;\n';
  css += '  --radius-full: 9999px;\n';
  
  // Shadows
  css += '\n  /* Shadows */\n';
  css += '  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n';
  css += '  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n';
  css += '  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n';
  css += '  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n';
  css += '  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n';
  css += '  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n';
  
  // Transitions
  css += '\n  /* Transitions */\n';
  css += '  --duration-fast: 150ms;\n';
  css += '  --duration-normal: 200ms;\n';
  css += '  --duration-slow: 300ms;\n';
  css += '  --easing: cubic-bezier(0.4, 0, 0.2, 1);\n';
  css += '  --easing-out: cubic-bezier(0, 0, 0.2, 1);\n';
  
  // Container
  css += '\n  /* Container */\n';
  css += '  --container-max: 1120px;\n';
  
  // Dark mode
  css += '\n  /* Dark mode */\n';
  css += '}\n\n@media (prefers-color-scheme: dark) {\n';
  css += '  :root {\n';
  css += '    --color-bg: #0a0a0a;\n';
  css += '    --color-surface: #171717;\n';
  css += '    --color-text: #fafafa;\n';
  css += '    --color-text-muted: #a3a3a3;\n';
  css += '    --color-border: #262626;\n';
  css += '  }\n';
  css += '}\n';

  return css;
}

// Write CSS variables
const cssVars = generateCSSVariables();
const outputPath = join(outputDir, 'css-variables.css');
writeFileSync(outputPath, cssVars);
console.log(`✅ CSS variables written to ${outputPath}`);

// Generate Tailwind config snippet
const tailwindConfig = `// Auto-generated from design tokens
// DO NOT EDIT MANUALLY - run 'npm run sync-tokens'

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'power2-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'power3-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
    },
  },
};

const tailwindPath = join('design-system', 'generated', 'tailwind-tokens.js');
writeFileSync(tailwindPath, tailwindConfig);
console.log(`✅ Tailwind tokens written to ${tailwindPath}`);

console.log('✅ Design tokens synced successfully!');