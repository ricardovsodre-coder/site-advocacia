// scripts/generate-sitemap.ts — Gera sitemap.xml para desktop + mobile
import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log('🗺️  Generating sitemaps...');

const BASE_URL = 'https://verissimosodre.com.br';
const TODAY = new Date().toISOString().split('T')[0];

// Desktop URLs
const desktopUrls = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/areas', changefreq: 'weekly', priority: 0.9 },
  { url: '/areas/verbas-rescisorias', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/horas-extras', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/assedio-moral', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/sem-registro', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/justa-causa', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/insalubridade', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/acidente-doenca', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/rescisao-indireta', changefreq: 'monthly', priority: 0.8 },
  { url: '/areas/acordo-coletivo', changefreq: 'monthly', priority: 0.8 },
  { url: '/como-atuamos', changefreq: 'monthly', priority: 0.7 },
  { url: '/artigos', changefreq: 'weekly', priority: 0.8 },
  { url: '/equipe', changefreq: 'monthly', priority: 0.6 },
  { url: '/cases', changefreq: 'monthly', priority: 0.7 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  { url: '/contato', changefreq: 'monthly', priority: 0.8 },
  { url: '/politica-de-privacidade', changefreq: 'yearly', priority: 0.3 },
  { url: '/termos-de-uso', changefreq: 'yearly', priority: 0.3 },
  { url: '/lgpd', changefreq: 'yearly', priority: 0.3 },
];

// Mobile URLs (subset)
const mobileUrls = [
  { url: '/mobile.html', changefreq: 'weekly', priority: 1.0 },
  { url: '/mobile.html#areas', changefreq: 'weekly', priority: 0.9 },
  { url: '/mobile.html#chat', changefreq: 'weekly', priority: 0.9 },
  { url: '/mobile.html#contato', changefreq: 'monthly', priority: 0.8 },
];

function generateSitemap(urls: typeof desktopUrls, filename: string) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${u.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${u.url}" />
    ${u.url.includes('mobile') ? '<mobile:mobile/>' : ''}
  </url>`).join('\n')}
</urlset>`;

  const outputPath = join('dist', filename);
  writeFileSync(outputPath, xml);
  console.log(`✅ Generated ${filename} (${urls.length} URLs)`);
}

function generateRobotsTxt() {
  const robots = `# robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://verissimosodre.com.br/sitemap.xml
Sitemap: https://verissimosodre.com.br/mobile-sitemap.xml

# Disallow private areas
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /_astro/
Disallow: /_vercel/

# Crawl-delay
Crawl-delay: 10

# Host
Host: https://verissimosodre.com.br
`;

  writeFileSync(join('dist', 'robots.txt'), robots);
  console.log('✅ Generated robots.txt');
}

// Generate
generateSitemap(desktopUrls, 'sitemap.xml');
generateSitemap(mobileUrls, 'mobile-sitemap.xml');
generateRobotsTxt();

console.log('✅ All sitemaps generated in dist/');