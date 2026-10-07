// generators/build-mobile.ts — Build mobile (HTML único, CSS inlined)
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('📱 Building MOBILE site...');

try {
  if (!existsSync('astro.config.mobile.mjs')) {
    console.error('❌ astro.config.mobile.mjs não encontrado');
    process.exit(1);
  }

  // Build Astro mobile
  execSync('npx astro build --config astro.config.mobile.mjs', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });

  // Post-process: inline CSS, minify HTML, create single mobile.html
  const distDir = join('dist', 'mobile');
  const indexPath = join(distDir, 'index.html');
  
  if (existsSync(indexPath)) {
    let html = readFileSync(indexPath, 'utf-8');
    
    // Inline critical CSS (simplified - em produção use critical-css)
    // Move scripts to end, inline styles
    html = html
      .replace(/<link rel="stylesheet" href="([^"]+)">/g, (match, href) => {
        const cssPath = join(distDir, href);
        if (existsSync(cssPath)) {
          const css = readFileSync(cssPath, 'utf-8');
          return `<style>${css}</style>`;
        }
        return match;
      })
      .replace(/<script src="([^"]+)"><\/script>/g, (match, src) => {
        const jsPath = join(distDir, src);
        if (existsSync(jsPath)) {
          const js = readFileSync(jsPath, 'utf-8');
          return `<script>${js}</script>`;
        }
        return match;
      });

  // Write single mobile.html
  const mobileHtmlPath = join('dist', 'mobile.html');
  writeFileSync(mobileHtmlPath, html);
  console.log(`✅ Mobile HTML created: ${mobileHtmlPath}`);
  }

  console.log('✅ Mobile build completed → dist/mobile.html');
} catch (error) {
  console.error('❌ Mobile build failed:', error);
  process.exit(1);
}