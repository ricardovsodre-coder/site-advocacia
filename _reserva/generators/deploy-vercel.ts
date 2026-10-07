// generators/deploy-vercel.ts — Deploy Vercel (prod + preview)
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Deploying to Vercel...');

try {
  // Verifica se vercel.json existe
  if (!existsSync('vercel.json')) {
    console.error('❌ vercel.json não encontrado');
    process.exit(1);
  }

  // Verifica se vercel CLI está instalado
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch {
    console.log('📦 Instalando Vercel CLI...');
    execSync('npm install -g vercel@latest', { stdio: 'inherit' });
  }

  // Deploy
  const isProd = process.argv.includes('--prod');
  const cmd = isProd ? 'vercel --prod' : 'vercel';
  
  console.log(`🚀 Running: ${cmd}`);
  execSync(cmd, {
    stdio: 'inherit',
    env: { ...process.env, VERCEL_ORG_ID: process.env.VERCEL_ORG_ID, VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID },
  });

  console.log('✅ Deploy completed!');
  console.log('📋 Próximos passos:');
  console.log('   1. Configure variáveis de ambiente no Vercel Dashboard');
  console.log('   2. Configure domínio personalizado (verissimosodre.com.br)');
  console.log('   3. Teste ambos: desktop + mobile.html');
} catch (error) {
  console.error('❌ Deploy failed:', error);
  process.exit(1);
}