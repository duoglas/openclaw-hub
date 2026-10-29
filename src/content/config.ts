import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    editorialVersion: z.literal(2).optional(),
    pillar: z.enum(['agents', 'models', 'workflows']).optional(),
    reviewedAt: z.coerce.date().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['guide', 'comparison', 'tutorial', 'news', 'review', 'analysis']).default('guide'),
    lang: z.enum(['en', 'zh']).default('en'),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional().default([]),
  }),
});

export const collections = { blog };
