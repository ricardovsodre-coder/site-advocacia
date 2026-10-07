// astro.config.desktop.mjs — Config desktop (SPA completa com ilhas 3D/animações)
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/edge';

export default defineConfig({
  site: 'https://verissimosodre.com.br',
  output: 'static',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.js',
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['@google/generative-ai', 'gsap', '@gsap/react'],
    },
    optimizeDeps: {
      include: ['gsap', '@gsap/react'],
    },
  },
  // Múltiplas entry points: desktop + mobile
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  // Prefetch para navegação instantânea
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  // Compressão
  compressHTML: true,
});