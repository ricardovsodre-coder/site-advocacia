// scripts/extract-critical-css.js — Extract critical CSS para desktop
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('⚡ Extracting critical CSS for desktop...');

try {
  // Use penthouse or critical for critical CSS extraction
  // This is a placeholder - in production, install @critical/css or penthouse
  
  console.log('📝 Critical CSS extraction:');
  console.log('  1. Install: npm install -D critical');
  console.log('  2. Run: npx critical dist/desktop/index.html --inline --base dist/desktop/ --width 1300 --height 900');
  console.log('  3. Output: critical.css (inline no <head>)');
  
  // Generate placeholder critical CSS
  const criticalCSS = `
/* Critical CSS - Above the fold */
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{font-family:var(--font-sans);background:var(--color-bg);color:var(--color-text);line-height:1.6;min-height:100vh}
a{color:var(--color-primary);text-decoration:none}a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
button{font-family:inherit;cursor:pointer;border:none;background:none}
input,textarea{font-family:inherit;font-size:1rem}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.container{width:100%;max-width:var(--container-max);margin:0 auto;padding:0 1rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-weight:600;border-radius:999px;padding:.875rem 1.5rem;transition:all .2s ease;border:none;cursor:pointer}
.btn-primary{background:var(--color-primary);color:#fff}.btn-primary:hover{background:var(--color-primary-hover)}
.btn-whatsapp{background:#25D366;color:#fff}.btn-whatsapp:hover{background:#1EBE5A}
.chip{display:inline-flex;align-items:center:gap:.375rem;padding:.375rem .75rem;border-radius:999px;font-size:.75rem;font-weight:500;white-space:nowrap}
.card{background:var(--color-surface);border-radius:var(--radius);border:1px solid var(--color-border);box-shadow:var(--shadow)}
.skip-link{position:absolute;top:-100%;left:50%;transform:translateX(-50%);background:var(--color-primary);color:#fff;padding:.75rem 1.5rem;border-radius:.5rem;z-index:9999;transition:top .2s}.skip-link:focus{top:1rem}
  `.trim();

  // Write critical CSS file
  const fs = require('fs');
  fs.writeFileSync('dist/desktop/critical.css', criticalCSS);
  console.log('✅ Critical CSS written to dist/desktop/critical.css');
  
} catch (error) {
  console.error('❌ Critical CSS extraction failed:', error);
  process.exit(1);
}