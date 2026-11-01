// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: change this to your final URL (e.g. https://beauty-strikes.pages.dev
// or your own domain later). It is used for canonical URLs, Open Graph tags,
// the sitemap and robots.txt.
const SITE_URL = 'https://beauty-strikes.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Excluded: 404, placeholder products, thin journal category archives.
      filter: (page) =>
        !page.includes('/404') && !page.includes('/finds/placeholder-') && !page.includes('/journal/category/'),
    }),
  ],
});
