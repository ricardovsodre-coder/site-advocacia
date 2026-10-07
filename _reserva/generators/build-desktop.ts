// generators/build-desktop.ts — Build desktop (Astro + React ilhas)
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🏗️  Building DESKTOP site...');

try {
  // Verifica se astro.config.desktop.mjs existe
  if (!existsSync('astro.config.desktop.mjs')) {
    console.error('❌ astro.config.desktop.mjs não encontrado');
    process.exit(1);
  }

  // Build
  execSync('npx astro build --config astro.config.desktop.mjs', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });

  console.log('✅ Desktop build completed → dist/desktop/');
} catch (error) {
  console.error('❌ Desktop build failed:', error);
  process.exit(1);
}