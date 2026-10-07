// generators/create-content.ts — CLI para criar conteúdo
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { slugify } from '../design-system/utils/formatters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

interface AreaData {
  title: string;
  icon: string;
  description: string;
  deadline: string;
  href: string;
}

interface ArticleData {
  title: string;
  category: string;
  tags: string[];
  content: string;
}

interface FAQData {
  question: string;
  answer: string;
  category: string;
}

interface CaseData {
  title: string;
  area: string;
  description: string;
  result: string;
  anonymous: boolean;
}

function ensureDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function createArea(data: AreaData) {
  const slug = slugify(data.title);
  const desktopPath = join(ROOT, 'content/desktop/areas', `${slug}.mdx`);
  const mobilePath = join(ROOT, 'content/mobile/areas.yaml');

  // Desktop MDX
  const desktopContent = `---
title: "${data.title} — ${data.description}"
description: "${data.description}"
area: "${slug}"
deadline: "${data.deadline}"
icon: |
${data.icon.split('\n').map(l => '  ' + l).join('\n')}
order: 1
---

# ${data.title}

${data.description}

## O que a lei diz

- Item 1
- Item 2

## O que fazer agora

1. Passo 1
2. Passo 2

> **Orientação informativa.** Assessoria completa: Dr. Ricardo Sodré — OAB/SP 441.049 | WhatsApp: (15) 98803-3000
`;

  // Mobile YAML entry
  const mobileEntry = `  - title: "${data.title}"
    icon: |
${data.icon.split('\n').map(l => '      ' + l).join('\n')}
    href: "/areas/${slug}"
    summary: "${data.description}"
`;

  writeFileSync(desktopPath, desktopContent);
  console.log(`✅ Created desktop area: ${desktopPath}`);

  // Append to mobile areas.yaml
  const existing = existsSync(mobilePath) ? readFileSync(mobilePath, 'utf-8') : 'areas:\n';
  const updated = existing.replace('areas:', 'areas:\n' + mobileEntry);
  writeFileSync(mobilePath, updated);
  console.log(`✅ Updated mobile areas.yaml`);
}

function createArticle(data: ArticleData) {
  const slug = slugify(data.title);
  const path = join(ROOT, 'content/desktop/articles', `${slug}.mdx`);

  const content = `---
title: "${data.title}"
description: "Artigo sobre ${data.category}"
category: "${data.category}"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
date: ${new Date().toISOString().split('T')[0]}
readingTime: 5
---

# ${data.title}

${data.content}

> **Orientação informativa.** Assessoria completa: Dr. Ricardo Sodré — OAB/SP 441.049 | WhatsApp: (15) 98803-3000
`;

  ensureDir(dirname(path));
  writeFileSync(path, content);
  console.log(`✅ Created article: ${path}`);
}

function createFAQ(data: FAQData) {
  const mobilePath = join(ROOT, 'content/mobile/faq.yaml');
  const desktopPath = join(ROOT, 'content/desktop/faq', `${slugify(data.question)}.mdx`);

  const mobileEntry = `  - question: "${data.question}"
    answer: "${data.answer}"
    category: "${data.category}"
`;

  // Update mobile FAQ
  const existing = existsSync(mobilePath) ? readFileSync(mobilePath, 'utf-8') : 'faqs:\n';
  const updated = existing.replace('faqs:', 'faqs:\n' + mobileEntry);
  writeFileSync(mobilePath, updated);

  // Create desktop FAQ detail
  const desktopContent = `---
question: "${data.question}"
answer: "${data.answer}"
category: "${data.category}"
---

# ${data.question}

${data.answer}

> **Orientação informativa.** Assessoria completa: Dr. Ricardo Sodré — OAB/SP 441.049 | WhatsApp: (15) 98803-3000
`;

  ensureDir(dirname(desktopPath));
  writeFileSync(desktopPath, desktopContent);

  console.log(`✅ Created FAQ: ${data.question}`);
}

function createCase(data: CaseData) {
  const slug = slugify(data.title);
  const path = join(ROOT, 'content/desktop/cases', `${slug}.mdx`);

  const content = `---
title: "${data.title}"
area: "${data.area}"
description: "${data.description}"
result: "${data.result}"
anonymous: ${data.anonymous}
date: ${new Date().toISOString().split('T')[0]}
---

# ${data.title}

**Área:** ${data.area}

## Caso

${data.description}

## Resultado

${data.result}

> **Orientação informativa.** Assessoria completa: Dr. Ricardo Sodré — OAB/SP 441.049 | WhatsApp: (15) 98803-3000
`;

  ensureDir(dirname(path));
  writeFileSync(path, content);
  console.log(`✅ Created case: ${path}`);
}

// CLI
import { Command } from 'commander';
import { readFileSync } from 'fs';

const program = new Command();

program
  .name('site-advocacia')
  .description('CLI para gerenciar conteúdo do site Veríssimo Sodré')
  .version('1.0.0');

program
  .command('create-area')
  .description('Cria nova área de atuação (desktop + mobile)')
  .requiredOption('--title <string>', 'Título da área')
  .requiredOption('--icon <string>', 'SVG do ícone (multilinha, use \\n)')
  .requiredOption('--description <string>', 'Descrição resumida')
  .requiredOption('--deadline <string>', 'Prazo/urgência')
  .action((options) => {
    createArea({
      title: options.title,
      icon: options.icon.replace(/\\n/g, '\n'),
      description: options.description,
      deadline: options.deadline,
      href: `/areas/${slugify(options.title)}`,
    });
  });

program
  .command('create-article')
  .description('Cria novo artigo (desktop only)')
  .requiredOption('--title <string>', 'Título do artigo')
  .requiredOption('--category <string>', 'Categoria')
  .requiredOption('--tags <string>', 'Tags separadas por vírgula')
  .option('--content <string>', 'Conteúdo (markdown)')
  .action((options) => {
    createArticle({
      title: options.title,
      category: options.category,
      tags: options.tags.split(',').map(t => t.trim()),
      content: options.content || '# Conteúdo do artigo\n\nEscreva aqui...',
    });
  });

program
  .command('create-faq')
  .description('Cria nova FAQ (desktop + mobile)')
  .requiredOption('--question <string>', 'Pergunta')
  .requiredOption('--answer <string>', 'Resposta')
  .requiredOption('--category <string>', 'Categoria')
  .action((options) => {
    createFAQ(options);
  });

program
  .command('create-case')
  .description('Cria novo case anônimo (desktop only)')
  .requiredOption('--title <string>', 'Título do case')
  .requiredOption('--area <string>', 'Área de atuação')
  .requiredOption('--description <string>', 'Descrição do caso')
  .requiredOption('--result <string>', 'Resultado obtido')
  .option('--anonymous', 'Case anônimo', true)
  .action((options) => {
    createCase({
      title: options.title,
      area: options.area,
      description: options.description,
      result: options.result,
      anonymous: options.anonymous,
    });
  });

program.parse();