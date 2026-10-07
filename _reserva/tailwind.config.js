/** @type {import('tailwindcss').Config} */
import sharedConfig from './design-system/tailwind.shared.js';

export default {
  ...sharedConfig,
  content: [
    './templates/**/*.{astro,tsx,ts,js,jsx}',
    './design-system/components/**/*.{tsx,ts}',
    './content/**/*.{mdx,md,yaml,yml,json}',
    './api/**/*.ts',
  ],
};