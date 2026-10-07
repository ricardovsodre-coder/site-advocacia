# CHANGELOG

## [1.0.0] - 2024-01-15 - Initial Release

### ✨ Added
- **Dual-site architecture**: Desktop (SPA com 3D/animações) + Mobile (HTML único, <50KB)
- **Design System completo**: Tokens φ=1.618, componentes (Button, Card, Chip, Input, Modal, Header, Footer, ChatWidget)
- **IA Chat Widget**: Google OAuth + Gemini 1.5 Flash + Rate limit 5/dia + Lead capture
- **Conteúdo jurídico**: 9 áreas de atuação, FAQ, artigos, cases, equipe, leis de referência
- **Deploy Vercel**: Edge Functions, KV, Preview deployments, CI/CD GitHub Actions
- **PWA**: Service Worker, manifest, offline fallback
- **Acessibilidade**: WCAG 2.1 AA, skip links, ARIA, focus visible
- **SEO**: Meta tags, Open Graph, JSON-LD, sitemaps, robots.txt
- **CI/CD**: GitHub Actions com lint, typecheck, build, a11y, Lighthouse, deploy Vercel

### 🏗️ Architecture
- **Framework**: Astro 4.x (multi-entry builds, React islands)
- **3D**: React Three Fiber + Drei (logo particle, monitor/phone mockups)
- **Animações**: GSAP + ScrollTrigger
- **Styling**: Tailwind CSS + CSS Variables (φ scale)
- **CMS**: MDX local + Contentlayer
- **Deploy**: Vercel (Edge Functions, KV, Preview)

### 📱 Mobile First
- Single-file HTML (`mobile.html` <50KB)
- CSS inlined, zero framework runtime
- Bottom bar fixa (IA | WhatsApp | Ligar)
- Area chips scrolláveis
- FAQ accordion nativo `<details>`
- Chat widget lazy-loaded (client:idle)

### 🖥️ Desktop Rich
- Hero 3D com logo particle formation
- Monitor/phone mockups interativos
- Scroll animations (GSAP)
- Ilhas React: Hero3D, MonitorMockup, PhoneMockup, ChatWidget, ScrollReveal
- Conteúdo completo: 9 áreas expandidas, blog, leis, FAQ 50+, cases, team
- Landing pages por área

### 🤖 IA Chat
- Google OAuth 2.0 (30 dias sessão, cookie httpOnly)
- Gemini 1.5 Flash (1.500 req/dia grátis)
- Streaming response (SSE)
- Rate limit: 5 perguntas/dia/usuário
- Lead capture automático (email, nome, perguntas)
- Área pré-selecionada via OAuth state

### 📚 Conteúdo Jurídico
- **9 Áreas**: Verbas rescisórias, Horas extras, Assédio moral, Sem registro, Justa causa, Insalubridade, Acidente/doença, Rescisão indireta, Acordo coletivo
- **Artigos**: 4+ artigos long-form (SEO)
- **FAQ**: 10 perguntas mobile + 50+ desktop
- **Cases**: 3 cases anônimos com resultados
- **Equipe**: 3 advogados com OAB
- **Leis**: CLT artigos, Súmulas TST, NRs, prazos

### 🔧 Developer Experience
- CLI generators: create-area, create-article, create-faq, create-case
- Scripts: sync-tokens, inline-css, critical-css, generate-og, a11y, screenshots, sitemap
- CI/CD: GitHub Actions (lint, typecheck, build, a11y, Lighthouse, deploy)
- Contentlayer para type-safe content
- Contentlayer config com rehype/remark plugins

---

## [0.9.0] - 2024-01-10 - Beta

### Added
- Initial project structure
- Design system tokens
- Basic Astro configs
- Netlify functions (legacy)
- Basic AI chat widget

### Changed
- Migrated from Netlify to Vercel
- Added dual-build architecture
- Added React Three Fiber 3D components
- Added GSAP animations

---

## [0.5.0] - 2024-01-05 - Alpha

### Added
- Initial Netlify Drop deployment
- Basic HTML/CSS/JS chat widget
- Google OAuth setup
- Gemini API integration
- Basic mobile.html

---

> **Versão atual**: 1.0.0 | **Próxima**: 1.1.0 (Newsletter, WhatsApp webhook, Analytics dashboard)