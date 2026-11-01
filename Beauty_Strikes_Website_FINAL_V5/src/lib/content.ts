import { getCollection, type CollectionEntry } from 'astro:content';
import { AFFILIATE } from '../config';

export type Article = CollectionEntry<'journal'>;
export type Product = CollectionEntry<'products'>;
export type Category = CollectionEntry<'categories'>;

/**
 * Published articles, newest first.
 * Drafts (draft: true) are NEVER built for production. During `npm run dev`
 * they are shown with a "Draft — not public" label so you can review them.
 */
export const SHOW_DRAFTS = import.meta.env.DEV;
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('journal', ({ data }) => !data.draft || SHOW_DRAFTS);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProducts(): Promise<Product[]> {
  const all = await getCollection('products', ({ data }) => SHOW_DRAFTS || data.status === 'live');
  // Live first, then placeholders; featured first within each group.
  const rank = (p: Product) => (p.data.status === 'live' ? 0 : p.data.status === 'draft' ? 1 : 2);
  return all.sort((a, b) => rank(a) - rank(b) || Number(b.data.featured) - Number(a.data.featured));
}

const CATEGORY_ORDER = ['korean-skincare', 'skincare-routines', 'haircare-scalp', 'beauty-tools'];
export async function getCategories(): Promise<Category[]> {
  const all = await getCollection('categories');
  return all.sort((a, b) => CATEGORY_ORDER.indexOf(a.id) - CATEGORY_ORDER.indexOf(b.id));
}

/** An affiliate button is only rendered when the program switch is on AND the product is live with a real Amazon URL. */
export function isAffiliateActive(p: Product): boolean {
  const url = p.data.affiliateUrl;
  return (
    AFFILIATE.amazonAssociate &&
    p.data.status === 'live' &&
    /^https:\/\/(www\.)?(amazon\.com|amzn\.to)\//.test(url)
  );
}

export function readingMinutes(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export const TEMPLATE_LABELS: Record<Article['data']['template'], string> = {
  'product-guide': 'Product Guide',
  comparison: 'Comparison',
  routine: 'Routine',
  ingredient: 'Ingredient Explainer',
  'tool-guide': 'Tool Guide',
};

export const CATEGORY_SHORT: Record<string, string> = {
  'korean-skincare': 'Korean Skincare',
  'skincare-routines': 'Routines',
  'haircare-scalp': 'Hair & Scalp',
  'beauty-tools': 'Tools',
};
