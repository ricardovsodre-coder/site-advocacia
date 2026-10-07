# Scripts Utilitários

Esta pasta contém scripts de automação para build, deploy e manutenção do site.

## 📋 Lista de Scripts

| Script | Descrição | Comando |
|--------|-----------|---------|
| `sync-tokens.ts` | Sincroniza design tokens (CSS vars + Tailwind) | `npm run sync-tokens` |
| `build-desktop.ts` | Build desktop (Astro + React ilhas) | `npm run build:desktop` |
| `build-mobile.ts` | Build mobile (HTML único, CSS inlined) | `npm run build:mobile` |
| `build-all.ts` | Build completo (desktop + mobile + validação) | `npm run build:all` |
| `deploy-vercel.ts` | Deploy Vercel (prod + preview) | `npm run deploy` |
| `inline-css.js` | Inline CSS no mobile.html | `npm run inline-css` |
| `extract-critical-css.js` | Extrai critical CSS desktop | `npm run critical-css` |
| `generate-screenshots.ts` | Captura screenshots p/ phone mockup | `npm run screenshots` |
| `validate-a11y.ts` | Valida acessibilidade (axe-core) | `npm run a11y` |
| `generate-og-images.ts` | Gera OG images dinâmicas | `npm run generate-og` |
| `generate-sitemap.ts` | Gera sitemap.xml + mobile-sitemap.xml | `npm run generate-sitemap` |

## 🚀 Como Usar

```bash
# Instalar dependências
npm install

# Sincronizar tokens (sempre após mudar tokens)
npm run sync-tokens

# Desenvolvimento
npm run dev:desktop   # http://localhost:4321
npm run dev:mobile    # http://localhost:4322/mobile.html

# Build completo + validação
npm run build:all

# Deploy preview
npm run deploy

# Deploy produção
npm run deploy -- --prod

# Scripts individuais
node scripts/inline-css.js
node scripts/extract-critical-css.js
node scripts/generate-sitemap.ts
npx tsx scripts/validate-a11y.ts
npx tsx scripts/generate-og-images.ts
```

## 🔧 Pré-requisitos

- Node.js 20+
- npm 10+
- Vercel CLI (`npm install -g vercel`)
- Playwright (`npx playwright install`) para screenshots
- Axe-core CLI (`npm install -D @axe-core/cli`) para a11y

## 📁 Estrutura de Saída

```
dist/
├── desktop/           # Build desktop (SPA)
│   ├── index.html
│   ├── _astro/
│   ├── critical.css
│   └── ...
├── mobile.html        # Mobile único (HTML + CSS inlined)
├── sitemap.xml
├── mobile-sitemap.xml
├── robots.txt
└── ...
```

## 🔧 Variáveis de Ambiente Necessárias

```env
# Vercel
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID=...

# Vercel KV
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Gemini AI
GEMINI_API_KEY=...

# Leads export
LEAD_EXPORT_TOKEN=...
```