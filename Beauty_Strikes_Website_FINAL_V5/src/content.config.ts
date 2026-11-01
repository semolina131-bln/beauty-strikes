import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const CATEGORY_IDS = ['korean-skincare', 'skincare-routines', 'haircare-scalp', 'beauty-tools'] as const;

const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    intro: z.string(),
    accent: z.enum(['violet', 'lavender', 'coral', 'lime']),
    sections: z.array(z.object({ id: z.string(), title: z.string(), text: z.string() })),
  }),
});

const products = defineCollection({
  loader: file('src/data/products.json'),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: z.enum(CATEGORY_IDS),
    subcategory: z.string().optional(),
    summary: z.string(),
    features: z.array(z.string()).default([]),
    pros: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    image: z
      .object({ src: z.string().default(''), alt: z.string().default(''), credit: z.string().default('') })
      .default({ src: '', alt: '', credit: '' }),
    amazonUrl: z.string().default(''),
    affiliateUrl: z.string().default(''),
    /** placeholder = sample entry; draft = real but unpublished link; live = affiliate link active; unavailable = discontinued */
    status: z.enum(['placeholder', 'draft', 'live', 'unavailable']),
    featured: z.boolean().default(false),
    lastReviewed: z.coerce.date(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_IDS),
    template: z.enum(['product-guide', 'comparison', 'routine', 'ingredient', 'tool-guide']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Optional hero image placed in /public/images/journal/ */
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    /** Vertical 2:3 image for Pinterest (1000×1500 recommended) */
    pinImage: z.string().optional(),
    relatedProducts: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { categories, products, journal };
