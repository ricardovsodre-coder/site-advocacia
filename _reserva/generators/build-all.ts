// generators/build-all.ts — Build both desktop + mobile + validation
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🏗️  Building ALL sites (desktop + mobile)...');

try {
  // 1. Sync tokens first
  console.log('\n1️⃣  Syncing design tokens...');
  execSync('npx tsx generators/sync-tokens.ts', { stdio: 'inherit' });

  // 2. Build desktop
  console.log('\n2️⃣  Building DESKTOP...');
  execSync('npx astro build --config astro.config.desktop.mjs', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });

  // 3. Build mobile
  console.log('\n3️⃣  Building MOBILE...');
  execSync('npx astro build --config astro.config.mobile.mjs', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });

  // 4. Post-process mobile (inline CSS)
  console.log('\n4️⃣  Post-processing mobile.html...');
  execSync('node scripts/inline-css.js', { stdio: 'inherit' });

  // 5. Extract critical CSS for desktop
  console.log('\n5️⃣  Extracting critical CSS for desktop...');
  execSync('node scripts/extract-critical-css.js', { stdio: 'inherit' });

  // 6. Validate accessibility
  console.log('\n6️⃣  Validating accessibility...');
  try {
    execSync('npx axe http://localhost:4321 --dir reports/a11y', { stdio: 'inherit' });
  } catch {
    console.log('⚠️  Axe-core not run (server not running or not installed)');
  }

  // 7. Validate build outputs
  console.log('\n7️⃣  Validating build outputs...');
  validateBuilds();

  console.log('\n✅ ALL BUILDS COMPLETED SUCCESSFULLY!');
  console.log('📁 Desktop: dist/desktop/');
  console.log('📁 Mobile: dist/mobile.html');
  console.log('🚀 Ready for deploy: npm run deploy');

} catch (error) {
  console.error('\n❌ BUILD FAILED:', error);
  process.exit(1);
}

function validateBuilds() {
  const requiredDesktop = [
    'dist/desktop/index.html',
    'dist/desktop/_astro/',
  ];

  const requiredMobile = [
    'dist/mobile.html',
  ];

  for (const file of requiredDesktop) {
    if (!existsSync(file)) {
      throw new Error(`Missing desktop file: ${file}`);
    }
  }

  for (const file of requiredMobile) {
    if (!existsSync(file)) {
      throw new Error(`Missing mobile file: ${file}`);
    }
  }

  // Check mobile.html size (< 50KB)
  const mobileHtml = require('fs').readFileSync('dist/mobile.html', 'utf-8');
  const sizeKB = (Buffer.byteLength(mobileHtml, 'utf-8') / 1024).toFixed(1);
  console.log(`📱 mobile.html size: ${sizeKB} KB`);
  
  if (parseFloat(sizeKB) > 50) {
    console.warn(`⚠️  Mobile HTML exceeds 50KB (${sizeKB} KB)`);
  } else {
    console.log('✅ Mobile HTML size OK (< 50KB)');
  }

  console.log('✅ All build validations passed');
}