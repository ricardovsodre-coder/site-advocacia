/**
 * Contentlayer configuration for desktop content
 * Provides type-safe content collections with validation
 */

import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** Áreas de atuação */
const Area = defineDocumentType(() => ({
  name: 'Area',
  filePathPattern: `areas/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    area: { type: 'string', required: true },
    deadline: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    order: { type: 'number', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('areas/', '') },
    url: { type: 'string', resolve: (doc) => `/areas/${doc._raw.flattenedPath.replace('areas/', '')}` },
  },
});

/** Artigos do blog */
const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    readingTime: { type: 'number', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('articles/', '') },
    url: { type: 'string', resolve: (doc) => `/artigos/${doc._raw.flattenedPath.replace('articles/', '')}` },
  },
});

/** Perguntas frequentes */
const FAQ = defineDocumentType(() => ({
  name: 'FAQ',
  filePathPattern: `faq/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    question: { type: 'string', required: true },
    answer: { type: 'string', required: true },
    category: { type: 'string', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('faq/', '') },
  },
});

/** Cases anônimos */
const Case = defineDocumentType(() => ({
  name: 'Case',
  filePathPattern: `cases/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    area: { type: 'string', required: true },
    description: { type: 'string', required: true },
    result: { type: 'string', required: true },
    anonymous: { type: 'boolean', required: true, default: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('cases/', '') },
  },
});

/** Equipe */
const TeamMember = defineDocumentType(() => ({
  name: 'TeamMember',
  filePathPattern: `team/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    oab: { type: 'string', required: true },
    role: { type: 'string', required: true },
    focus: { type: 'string', required: true },
    bio: { type: 'string', required: true },
    photo: { type: 'string', required: false },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('team/', '') },
  },
});

export default makeSource({
  contentDirPath: './content/desktop',
  documentTypes: [Area, Article, FAQ, Case, TeamMember],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, { theme: 'github-dark', keepBackground: true }],
    ],
    remarkPlugins: [remarkGfm],
  },
});