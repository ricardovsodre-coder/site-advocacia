// astro.config.mobile.mjs — Config mobile (HTML único, CSS inlined, zero JS)
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://verissimosodre.com.br',
  output: 'static',
  adapter: vercel({
    edgeMiddleware: false,
  }),
  integrations: [
    tailwind({
      configFile: './tailwind.config.js',
      // Inline CSS no HTML final
      applyBaseStyles: true,
    }),
  ],
  // Build otimizado para mobile.html único
  build: {
    assets: 'assets',
    inlineStylesheets: 'always', // CSS inlined no HTML
  },
  // Zero JS por padrão
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          // Single file output
          entryFileNames: 'mobile.js',
          chunkFileNames: 'mobile.js',
          assetFileNames: 'mobile.[ext]',
        },
      },
    },
  },
  // Sem prefetch no mobile (economiza bandwidth)
  prefetch: false,
  compressHTML: true,
});