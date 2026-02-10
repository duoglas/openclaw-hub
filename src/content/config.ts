import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['guide', 'comparison', 'tutorial', 'news', 'review']).default('guide'),
    lang: z.enum(['en', 'zh']).default('en'),
  }),
});

export const collections = { blog };
