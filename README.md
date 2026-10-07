# Site Veríssimo Sodré — Dual Build (Desktop + Mobile)

> **Dois sites, uma identidade.** Desktop = autoridade completa. Mobile = conversão social (TikTok/Insta/Facebook).

---

## 🏗️ Arquitetura

```
website/
├── design-system/           # Tokens + componentes base (COMPARTILHADO)
├── templates/
│   ├── shared/              # Componentes base (Button, Card, Chip, etc.)
│   ├── desktop/             # Templates SÓ desktop (14 componentes)
│   └── mobile/              # Templates SÓ mobile (7 componentes)
├── content/
│   ├── desktop/             # Conteúdo completo (leis, blog, FAQ 50+, cases, team)
│   └── mobile/              # Conteúdo enxuto (resumido, chat prompts, top 10 FAQ)
├── api/                     # Vercel Edge Functions (auth, chat, lead)
├── generators/              # CLI scripts (create-content, build, deploy)
├── scripts/                 # Build helpers (inline-css, critical-css, a11y, og-images)
├── public/                  # Assets estáticos (fonts, icons, screenshots, og-images)
├── astro.config.desktop.mjs # Config desktop (full)
├── astro.config.mobile.mjs  # Config mobile (minimal)
├── vercel.json              # Config Vercel (routes, headers, edge functions)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## ⚡ Stack

| Camada | Escolha |
|--------|---------|
| **Framework** | Astro 4.x (multi-entry builds, ilhas React) |
| **3D** | React Three Fiber (R3F) + Drei |
| **Animações** | GSAP + ScrollTrigger |
| **Styling** | Tailwind CSS + CSS Variables (φ = 1.618) |
| **CMS/Conteúdo** | MDX local + Contentlayer |
| **Deploy** | Vercel (Edge Functions, KV, Preview) |
| **IA Chat** | Gemini 1.5 Flash (1.500 req/dia grátis) |
| **Auth** | Google OAuth + Vercel KV |

---

## 🚀 Comandos

```bash
# Instala dependências
npm install

# Sincroniza design tokens (CSS vars + Tailwind)
npm run sync-tokens

# Desenvolvimento
npm run dev:desktop   # http://localhost:4321
npm run dev:mobile    # http://localhost:4322/mobile.html

# Build
npm run build:desktop # → dist/desktop/
npm run build:mobile  # → dist/mobile.html (arquivo único, <50KB)
npm run build:all     # Ambos

# Preview local
npm run preview:desktop
npm run preview:mobile

# Deploy Vercel
npm run deploy              # Preview
npm run deploy -- --prod    # Produção

# CLI de conteúdo
npx site-advocacia create-area "Nova Área" --icon="..." --description="..." --deadline="..."
npx site-advocacia create-article "Título" --category="..." --tags="..."
npx site-advocacia create-faq --question="..." --answer="..." --category="..."
npx site-advocacia create-case "Título" --area="..." --description="..." --result="..."

# Scripts utilitários
npm run sync-tokens          # Sincroniza tokens (CSS vars + Tailwind)
npm run inline-css           # Inline CSS no mobile.html
npm run critical-css         # Extrai critical CSS desktop
npm run generate-og          # Gera OG images
npm run a11y                 # Valida acessibilidade
npm run screenshots          # Captura screenshots p/ phone mockup
```

---

## 🔧 Configuração Inicial

### 1. Variáveis de Ambiente (Vercel Dashboard)

```env
GOOGLE_CLIENT_ID=1011280330823-7psa5otse1og5pkqt64qdmtvstc48ehq.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
GEMINI_API_KEY=AIzaSy...
LEAD_EXPORT_TOKEN=senha-forte-aqui
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID=...
```

### 2. Google Cloud Console (OAuth)

**Origens JavaScript autorizadas:**
- `https://verissimosodre.com.br`
- `https://verissimosodre.vercel.app`
- `http://localhost:4321`

**URIs de redirecionamento autorizados:**
- `https://verissimosodre.com.br/api/auth/google`
- `https://verissimosodre.vercel.app/api/auth/google`
- `http://localhost:4321/api/auth/google`

### 3. Fontes e Assets

Coloque em `public/fonts/`:
- `inter-var.woff2` (fonte principal)
- `sua-fonte-heading.woff2` (fonte de títulos)

Coloque em `public/icons/`:
- SVGs de ícones customizados

---

## 📱 Mobile (`mobile.html`)

**Especificação:**
- Arquivo único (HTML + CSS inlined + JS mínimo)
- Zero framework runtime — só `IntersectionObserver` p/ lazy chat
- Chat widget lazy-loaded (só carrega se usuário clicar)
- Bottom bar fixa: IA | WhatsApp | Ligar (sempre visível)
- Hero curto: 1 headline + 1 sub + 2 CTAs
- Áreas: Chips horizontais scrolláveis (9 áreas)
- FAQ: Top 10, accordion nativo `<details>`
- Fonts: Preload + `font-display: swap`
- **Lighthouse target: 100/100/100/100**

---

## 🖥️ Desktop

**Especificação:**
- SPA com Astro + React ilhas
- Ilhas hidratadas: Hero3D, MonitorMockup, PhoneMockup, ChatWidget, ScrollReveal
- 3D: Logo particle formation (R3F), monitor/phone mockups interativos
- Animações: GSAP scroll-triggered (fade, slide, text morph, parallax)
- Conteúdo completo: 9 áreas expandidas, blog, leis, FAQ 50+, cases, team
- PWA: Service worker, manifest, offline fallback
- **Lighthouse target: 95+/90+/90+/100**

---

## 🤖 IA Chat + Google Auth

**Fluxo:**
1. Usuário clica "Conversar com IA" → abre modal
2. Se não logado: botão "Continuar com Google"
3. OAuth → callback `/api/auth/google` → sessão 30 dias + cookie httpOnly
3. Redireciona para chat com área pré-selecionada
4. Usuário pergunta → streaming Gemini 1.5 Flash
5. Contador decrementa (5 → 4 → 3...)
6. Após 5: bloqueia + manda pro WhatsApp
7. Cada interação salva lead no Vercel KV (email, nome, perguntas)

**Rate Limit:** 5 perguntas/dia/usuário

---

## 📊 Leads

**Exportar:**
```bash
curl -H "Authorization: Bearer SEU_LEAD_EXPORT_TOKEN" \
  https://verissimosodre.com.br/api/lead
```

Retorna JSON com todos leads (email, nome, perguntas, timestamps).

---

## ♿ Acessibilidade

```bash
# Validação
npm run a11y

# Checklist WCAG 2.1 AA
- Contraste 4.5:1 / 3:1
- Focus visible
- Skip link
- Heading hierarchy
- Alt text
- Labels + aria-describedby
- Lang="pt-BR"
- ARIA landmarks
- Teclado + Screen reader
```

---

## 📁 Estrutura de Conteúdo

### Desktop (`content/desktop/`)
```
areas/           # 9 áreas (MDX completo)
articles/        # Blog (MDX + frontmatter)
faq/             # 50+ perguntas (MDX)
cases/           # Cases anônimos (MDX)
team/            # Advogados (YAML)
laws/            # CLT, Súmulas, Normas (MDX)
landing/         # Landing pages (MDX)
site.yaml        # Config global
```

### Mobile (`content/mobile/`)
```
areas.yaml       # 9 áreas (resumo + icon + href)
faq.yaml         # Top 10 FAQ (accordion nativo)
chat-prompts.yaml # Sugestões por área
quick-contacts.yaml # WhatsApp, telefone, email, endereço
site.yaml        # Config mobile
```

---

## 🔄 Fluxo de Trabalho Diário

```bash
# 1. Edita conteúdo
code content/desktop/areas/verbas-rescisorias.mdx
code content/mobile/areas.yaml

# 2. Testa local
npm run dev:desktop  # http://localhost:4321
npm run dev:mobile   # http://localhost:4322/mobile.html

# 3. Build + Deploy
npm run deploy
# ✅ Desktop: verissimosodre.com.br
# ✅ Mobile: verissimosodre.com.br/mobile.html
```

---

## 📚 Referências Visuais

| Modelo | Peso | O que entrou |
|--------|------|--------------|
| **Noomo** | 25% | 3D mockups, scroll animations, text morphing, case study layout |
| **Austensor** | 15% | Golden ratio tokens, logo particle, GPU particles leves, scroll→3D sync |
| **Dribbble Event App** | 35% | Mobile card layout, CTA hierarchy, bottom bar fixa, clean conversion |
| **AI Lawyer Matching** | 25% | Chat IA patterns, natural language input, area chips, lawyer match CTA |

---

## 📄 Licença

Uso interno — Veríssimo Sodré Advocacia Trabalhista.