// scripts/validate-a11y.ts — Valida acessibilidade (axe-core)
import { execSync } from 'child_process';

console.log('♿ Validating accessibility...');

try {
  console.log('📝 Accessibility validation:');
  console.log('  1. Install: npm install -D @axe-core/cli');
  console.log('  2. Run: npx axe http://localhost:4321 --save --dir reports/a11y');
  console.log('  3. CI: npx axe http://verissimosodre.com.br --exit');
  
  // Run axe if available
  try {
    execSync('npx axe http://localhost:4321 --dir reports/a11y', { stdio: 'inherit' });
  } catch {
    console.log('⚠️  axe-core não instalado ou servidor não rodando');
    console.log('   Execute: npm install -D @axe-core/cli');
  }
  
  // Checklist manual
  console.log('\n✅ Checklist WCAG 2.1 AA:');
  console.log('  [ ] Contraste mínimo 4.5:1 (textos) / 3:1 (UI)');
  console.log('  [ ] Focus visible em todos os elementos interativos');
  console.log('  [ ] Skip link ("Pular para conteúdo principal")');
  console.log('  [ ] Heading hierarchy (h1 → h2 → h3)');
  console.log('  [ ] Alt text em todas as imagens');
  console.log('  [ ] Labels associados em formulários');
  console.log('  [ ] aria-describedby para erros');
  console.log('  [ ] Lang="pt-BR" no html');
  console.log('  [ ] ARIA landmarks (main, nav, aside, footer)');
  console.log('  [ ] Teste com teclado (Tab, Enter, Esc)');
  console.log('  [ ] Teste com leitor de tela (NVDA/VoiceOver)');
  
} catch (error) {
  console.error('❌ Accessibility validation failed:', error);
}