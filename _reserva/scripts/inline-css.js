// scripts/inline-css.js — Inline CSS no mobile.html
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('🎨 Inlining CSS for mobile.html...');

const distDir = join('dist', 'mobile');
const mobileHtmlPath = join('dist', 'mobile.html');

if (!existsSync(mobileHtmlPath)) {
  console.error('❌ mobile.html não encontrado em dist/');
  process.exit(1);
}

let html = readFileSync(mobileHtmlPath, 'utf-8');

// Find all CSS links
const cssLinkRegex = /<link rel="stylesheet" href="([^"]+)">/g;
let match;

while ((match = cssLinkRegex.exec(html)) !== null) {
  const href = match[1];
  const cssPath = join(distDir, href);
  
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, 'utf-8');
    html = html.replace(match[0], `<style>${css}</style>`);
    console.log(`  ✅ Inlined: ${href}`);
  }
}

// Find all JS scripts (inline small ones)
const jsScriptRegex = /<script src="([^"]+)"><\/script>/g;
while ((match = jsScriptRegex.exec(html)) !== null) {
  const src = match[1];
  const jsPath = join(distDir, src);
  
  if (existsSync(jsPath)) {
    const js = readFileSync(jsPath, 'utf-8');
    if (js.length < 10000) { // Only inline small scripts (<10KB)
      html = html.replace(match[0], `<script>${js}</script>`);
      console.log(`  ✅ Inlined JS: ${src}`);
    }
  }
}

// Minify HTML (basic)
html = html
  .replace(/\s+/g, ' ')
  .replace(/>\s+</g, '><')
  .trim();

writeFileSync(mobileHtmlPath, html);
console.log('✅ CSS inlined and HTML minified for mobile.html');