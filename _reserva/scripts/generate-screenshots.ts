// scripts/generate-screenshots.ts — Pega screenshots do site p/ phone mockup
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log('📸 Generating screenshots for phone mockup...');

const urls = [
  { name: 'home', url: 'https://verissimosodre.com.br', viewport: { width: 390, height: 844 } },
  { name: 'areas', url: 'https://verissimosodre.com.br/areas', viewport: { width: 390, height: 844 } },
  { name: 'chat', url: 'https://verissimosodre.com.br/chat', viewport: { width: 390, height: 844 } },
  { name: 'mobile', url: 'https://verissimosodre.com.br/mobile.html', viewport: { width: 390, height: 844 } },
];

const outputDir = join('public', 'screenshots');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('📝 Screenshot generation:');
console.log('  1. Install: npx playwright install');
console.log('  2. Create script:');
console.log(`
const { chromium } = require('playwright');

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const { name, url, viewport } of urls) {
    await page.setViewportSize(viewport);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: \`public/screenshots/\${name}.png\`, fullPage: false });
    console.log(\`✅ Captured: \${name}.png\`);
  }
  
  await browser.close();
}

capture();
`);

  console.log('  3. Run: node scripts/capture-screenshots.js');
  console.log('  4. Output: public/screenshots/*.png (usado no DesktopPhoneMockup.astro)');
  
  // Create placeholder screenshots directory
  if (!existsSync(join(outputDir, '.gitkeep'))) {
    fs.writeFileSync(join(outputDir, '.gitkeep'), '');
  }
  
} catch (error) {
  console.error('❌ Screenshot generation setup failed:', error);
}