/**
 * Central site settings. Edit these values — no code changes elsewhere needed.
 */
export const SITE = {
  name: 'Beauty Strikes',
  tagline: 'Bold Beauty. No Fluff.',
  /** Supporting message */
  subline: 'Sharp picks. Smart routines. Your rules.',
  mission:
    'We cut through beauty marketing noise with curated discoveries, practical guides, clear product information and thoughtful recommendations.',
  description:
    'Beauty Strikes is an independent beauty editorial: Korean skincare, routines, haircare and beauty tools — explained clearly, recommended carefully, no hype.',
  locale: 'en_US',
  /** External legal notice (Impressum). Do not replace with invented details. */
  legalNoticeUrl: 'https://sites.google.com/view/skinstrike-legal',
  /** Add the VERIFIED updated Beauty Strikes Pinterest profile URL. Blank hides the link. */
  pinterestUrl: 'https://de.pinterest.com/beautystrikes/',
  /** Optional: Pinterest domain verification code (from Pinterest > Claim website). */
  pinterestVerification: '',
};

/**
 * AFFILIATE SWITCH
 * Keep `amazonAssociate: false` until you are enrolled in the
 * Amazon Associates program and permitted to use Special Links. While false:
 *  - no product buttons link to Amazon,
 *  - the required Amazon statement is NOT shown as active.
 * Set to true only after enrollment AND after adding real affiliate URLs
 * with `status: "live"` in src/data/products.json.
 */
export const AFFILIATE = {
  amazonAssociate: false,
  /** Required statement (Amazon Associates Operating Agreement). Do not alter wording. */
  amazonStatement: 'As an Amazon Associate I earn from qualifying purchases.',
  /** Link-level label shown next to every affiliate button. */
  linkLabel: 'Paid link',
};

export const NAV = [
  { href: '/korean-skincare/', label: 'Korean Skincare' },
  { href: '/skincare-routines/', label: 'Routines' },
  { href: '/haircare-scalp/', label: 'Hair & Scalp' },
  { href: '/beauty-tools/', label: 'Tools' },
  { href: '/finds/', label: 'Beauty Finds' },
  { href: '/journal/', label: 'Journal' },
];
