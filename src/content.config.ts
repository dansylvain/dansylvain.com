import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projets = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projets' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    repo: z.url(),
    tech: z.array(z.string()),
    order: z.number(),
    // Un brouillon n'est ni listé ni généré.
    draft: z.boolean().default(false),
  }),
});

export const collections = { projets };
