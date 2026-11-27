// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dansylvain.com',
  // Sans coloration : les blocs de code suivent les tokens du thème (clair et sombre).
  markdown: { syntaxHighlight: false },
});
