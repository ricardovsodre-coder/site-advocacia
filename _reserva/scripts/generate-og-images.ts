// scripts/generate-og-images.ts — Gera OG images dinâmicas
import { execSync } from 'child_process';

console.log('🖼️  Generating OG images...');

try {
  console.log('📝 OG Image generation:');
  console.log('  1. Install: npm install -D @vercel/og @resvg/resvg-js satori');
  console.log('  2. Create API route: api/og/[slug].ts');
  console.log('  3. Template example:');
  console.log(`
import { ImageResponse } from '@vercel/og';

export async function GET({ params }) {
  const { slug } = params;
  
  return new ImageResponse(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 1200,
      height: 630,
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      fontFamily: 'Inter',
      color: 'white',
      padding: 80,
    }}>
      <div style={{ fontSize: 24, opacity: 0.8, marginBottom: 16 }}>
        Veríssimo Sodré Advocacia
      </div>
      <h1 style={{
        fontSize: 72,
        fontWeight: 800,
        lineHeight: 1.1,
        textAlign: 'center',
        maxWidth: 900,
      }}>
        {decodeURIComponent(slug)}
      </h1>
      <div style={{
        marginTop: 32,
        fontSize: 28,
        opacity: 0.9,
      }}>
        Seus direitos não podem esperar
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
  `);
  
  console.log('  4. Usage: <meta property="og:image" content="/api/og/verbas-rescisorias" />');
  
  // Create placeholder OG images directory
  const fs = require('fs');
  const path = require('path');
  const ogDir = path.join('public', 'og-images');
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }
  
  // Create placeholder OG images for each area
  const areas = [
    'verbas-rescisorias', 'horas-extras', 'assedio-moral',
    'sem-registro', 'justa-causa', 'insalubridade',
    'acidente-doenca', 'rescisao-indireta', 'acordo-coletivo'
  ];
  
  for (const area of areas) {
    const placeholderPath = path.join(ogDir, `${area}.svg`);
    if (!fs.existsSync(placeholderPath)) {
      const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1e3a8a"/>
  <text x="600" y="280" font-family="system-ui" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${area.replace('-', ' ').toUpperCase()}</text>
  <text x="600" y="360" font-family="system-ui" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle">Veríssimo Sodré Advocacia</text>
</svg>`;
      fs.writeFileSync(placeholderPath, svg);
    }
  }
  
  console.log('✅ Placeholder OG images created in public/og-images/');
  
} catch (error) {
  console.error('❌ OG image generation failed:', error);
}