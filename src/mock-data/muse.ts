/**
 * SMCC Agent — conversational marketplace + customer support data.
 *
 * SMCC Agent is SMCC's in-app conversational assistant. It can:
 *  - help the customer discover products conversationally (marketplace),
 *  - surface relevant cashback on those products,
 *  - move them into a transaction without leaving the app,
 *  - and answer common questions using SMCC FAQs.
 *
 * All content is illustrative and for demonstration only. The "AI" is a
 * deterministic keyword matcher so the demo is reliable and offline.
 */

import type { AppUserId } from '@/types';

/** A shoppable product surfaced by Muse, with a card-linked cashback rate. */
export interface MuseProduct {
  id: string;
  name: string;
  brand: string;
  /** Illustrative price in yen. */
  price: number;
  /** Illustrative card-linked cashback rate (%). */
  cashbackPct: number;
  /** Emoji used for the product tile (fallback when no image is provided). */
  emoji: string;
  /** Optional product photo path served from /public. Falls back to the emoji tile. */
  image?: string;
  /** Marketplace category, e.g. 'Fashion' | 'Tech' | 'Travel' | 'Everyday' | 'Luxury' | 'Experience'. */
  category?: string;
  /** Optional highlight tag, e.g. "Trending". */
  tag?: string;
  /** Short one-line descriptor. */
  blurb: string;
}

/** A single SMCC FAQ entry that Muse can answer with. */
export interface MuseFaq {
  id: string;
  question: string;
  answer: string;
}

/** A scripted conversational turn: a prompt the user can send, and Muse's reply. */
export interface MuseFlow {
  id: string;
  /** Suggested-prompt chip label / example user message. */
  prompt: string;
  category: 'shop' | 'support' | 'cashback';
  /** Lowercase keywords matched against free-text input. */
  keywords: string[];
  /** Muse's reply text. */
  answer: string;
  /** Optional product ids rendered as shoppable cards under the reply. */
  productIds?: string[];
  /** Optional FAQ id whose answer supplements the reply. */
  faqId?: string;
  /** Optional follow-up question Muse asks after the reply. */
  followUp?: string;
  /** Optional follow-up prompt chips offered after the reply. */
  followUpIds?: string[];
}

export const museProducts: MuseProduct[] = [
  { id: 'm-blazer', name: 'Lightweight linen blazer', brand: 'UNIQLO', price: 12900, cashbackPct: 6, emoji: '🧥', image: '/muse/blazer.webp', category: 'Fashion', tag: 'Editor’s pick', blurb: 'Breathable smart-casual layer for humid evenings.' },
  { id: 'm-polo', name: 'Quick-dry polo shirt', brand: 'UNIQLO', price: 4200, cashbackPct: 6, emoji: '👕', image: '/muse/polo.jpg', category: 'Fashion', blurb: 'Stays fresh through a full day out.' },
  { id: 'm-sneakers', name: 'Breathable travel sneakers', brand: 'ONE', price: 9800, cashbackPct: 8, emoji: '👟', image: '/muse/sneaker.jpg', category: 'Fashion', tag: 'Trending', blurb: 'Cushioned for long days of walking.' },
  { id: 'm-sunglasses', name: 'Polarised sunglasses', brand: 'ZOFF', price: 6500, cashbackPct: 5, emoji: '🕶️', image: '/muse/sunglasses.webp', category: 'Fashion', blurb: 'UV400 protection for bright, sunny days.' },
  { id: 'm-carryon', name: 'Compact 40L carry-on', brand: 'MUJI', price: 18900, cashbackPct: 10, emoji: '🧳', image: '/muse/carryon.webp', category: 'Travel', tag: 'Trip-ready', blurb: 'Cabin-sized, fits most airline limits.' },
  { id: 'm-adapter', name: 'Universal travel adapter', brand: 'ELECOM', price: 2300, cashbackPct: 12, emoji: '🔌', image: '/muse/adapter.jpeg', category: 'Travel', tag: 'Best cashback', blurb: 'Works in Singapore (Type G) and 150+ countries.' },
  { id: 'm-powerbank', name: 'Slim 10,000mAh power bank', brand: 'Anker', price: 3900, cashbackPct: 9, emoji: '🔋', image: '/muse/powerbank.png', category: 'Tech', blurb: 'Keeps your phone charged on the go.' },
  { id: 'm-earbuds', name: 'Noise-cancelling earbuds', brand: 'SONY', price: 15400, cashbackPct: 7, emoji: '🎧', image: '/muse/earbuds.webp', category: 'Tech', blurb: 'Quiet the cabin on your flight.' },
  // New-member / everyday essentials (welcome persona)
  { id: 'm-mug', name: 'Insulated travel mug', brand: 'Zojirushi', price: 3200, cashbackPct: 10, emoji: '☕', image: '/muse/mug.webp', category: 'Everyday', tag: 'New-member pick', blurb: 'Keeps coffee hot for hours — great first buy.' },
  { id: 'm-tote', name: 'Everyday canvas tote', brand: 'MUJI', price: 2900, cashbackPct: 8, emoji: '👜', image: '/muse/tote.jpg', category: 'Everyday', blurb: 'Roomy carry-all for daily errands.' },
  { id: 'm-notebook', name: 'Everyday notebook set', brand: 'Kokuyo', price: 1200, cashbackPct: 6, emoji: '📓', image: '/muse/notebook.webp', category: 'Everyday', blurb: 'Simple, sturdy daily notebooks.' },
  // Weather / context-driven picks for the personalised feed
  { id: 'm-cap', name: 'UV-cut running cap', brand: 'UNIQLO', price: 2400, cashbackPct: 7, emoji: '🧢', image: '/muse/cap.webp', category: 'Fashion', blurb: 'Lightweight shade for bright days out.' },
  { id: 'm-bottle', name: 'Insulated water bottle', brand: 'Zojirushi', price: 3400, cashbackPct: 9, emoji: '🥤', image: '/muse/bottle.webp', category: 'Everyday', blurb: 'Ice-cold hydration through hot, humid days.' },
  { id: 'm-umbrella', name: 'Compact travel umbrella', brand: 'MUJI', price: 1900, cashbackPct: 8, emoji: '☂️', image: '/muse/umbrella.webp', category: 'Everyday', blurb: 'Pocket-sized cover when the rain rolls in.' },
  { id: 'm-sunscreen', name: 'SPF50+ sun lotion', brand: 'Biore', price: 1500, cashbackPct: 10, emoji: '🧴', image: '/muse/sunscreen.webp', category: 'Everyday', blurb: 'Non-sticky daily protection for sunny weather.' },
  // Singapore luxury retail & experiences (traveller persona)
  { id: 'm-perfume', name: 'Designer fragrance', brand: 'Orchard Road', price: 18500, cashbackPct: 8, emoji: '🧴', image: '/muse/perfume.webp', category: 'Luxury', tag: 'Luxury', blurb: 'A duty-friendly luxury pick on Orchard Road.' },
  { id: 'm-watch', name: 'Minimalist travel watch', brand: 'ION Orchard', price: 42000, cashbackPct: 6, emoji: '⌚', image: '/muse/watch.webp', category: 'Luxury', tag: 'Luxury', blurb: 'A refined souvenir from Singapore retail.' },
  { id: 'm-gardens', name: 'Gardens by the Bay entry', brand: 'Klook', price: 5300, cashbackPct: 10, emoji: '🌳', image: '/muse/gardens-by-the-bay.jpg', category: 'Experience', tag: 'Experience', blurb: 'Skip-the-line entry to the iconic domes.' },
  { id: 'm-nightsafari', name: 'Night Safari experience', brand: 'Klook', price: 6600, cashbackPct: 10, emoji: '🦁', image: '/muse/night-safari.jpg', category: 'Experience', tag: 'Experience', blurb: 'Evening wildlife adventure near the city.' },
];

/** Illustrative V Points earned on a purchase (1 point per ¥100 spent). */
export const vPointsFor = (price: number): number => Math.round(price / 100);

/** Marketplace filter categories (products only — experiences excluded). */
export const marketplaceCategories = ['All', 'Fashion', 'Tech', 'Travel', 'Everyday', 'Luxury'];

/** Shoppable marketplace products (excludes experience bookings). */
export const marketplaceProducts: MuseProduct[] = museProducts.filter(
  (p) => p.category && p.category !== 'Experience',
);

/** Persona-aware "Recommended for you" product ids for the marketplace. */
export const recommendedProductIdsByUser: Record<AppUserId, string[]> = {
  1: ['m-mug', 'm-tote', 'm-notebook', 'm-sunglasses'],
  2: ['m-carryon', 'm-adapter', 'm-earbuds', 'm-perfume', 'm-watch'],
};

export const museProductById = (id: string): MuseProduct | undefined =>
  museProducts.find((p) => p.id === id);

export const museFaqs: MuseFaq[] = [
  {
    id: 'faq-points',
    question: 'How do I redeem my V Points?',
    answer:
      'You can use V Points at checkout in SMCC Mall, convert them to a statement credit, or apply them to selected payments. Redemptions appear under Points in the app. Subject to programme rules.',
  },
  {
    id: 'faq-cashback',
    question: 'How does cashback work?',
    answer:
      'Activate a cashback offer, then pay with your SMCC card at the merchant. The cashback is calculated on your qualifying spend and credited to your account automatically — usually within a few statement cycles. Subject to programme rules.',
  },
  {
    id: 'faq-lost',
    question: 'What if my card is lost or stolen?',
    answer:
      'Freeze your card instantly under Card → Security, then reach our 24/7 support to arrange a replacement. Freezing blocks new transactions while keeping your card details safe.',
  },
  {
    id: 'faq-travel',
    question: 'Does my card include travel protection?',
    answer:
      'Eligible SMCC cards include overseas travel accident cover and purchase protection. Booking travel with your card may also unlock lounge access and partner benefits. Check Card → Benefits for your specific coverage.',
  },
  {
    id: 'faq-statement',
    question: 'Where can I see my statement?',
    answer:
      'Your monthly statement is available under Card → Statements. You can also set alerts so you always know when a new statement is ready.',
  },
  {
    id: 'faq-benefits',
    question: 'What benefits come with my card?',
    answer:
      'Your SMCC card includes card-linked cashback offers, V Points on eligible spend, member perks and campaigns, plus travel and purchase protection. New members also get welcome offers during their first 90 days. See everything under Card → Benefits.',
  },
  {
    id: 'faq-merchants',
    question: 'Which merchants offer cashback?',
    answer:
      'Cashback is available across thousands of merchants and partners. In the app, any offer tagged “Cashback” is ready to activate — just look for the savings badge. New merchants are added regularly.',
  },
  {
    id: 'faq-timing',
    question: 'How long does cashback take to appear?',
    answer:
      'Once you pay with your SMCC card on an activated offer, cashback is confirmed after the transaction settles — usually within a few statement cycles. You can track pending and confirmed cashback under Card → Cashback. Subject to programme rules.',
  },
];

export const museFaqById = (id: string): MuseFaq | undefined =>
  museFaqs.find((f) => f.id === id);

export const museFlows: MuseFlow[] = [
  // ── New Cardholder · FAQ / support-led, with welcome commerce ──
  {
    id: 'flow-earn-cashback',
    prompt: 'How do I earn cashback?',
    category: 'cashback',
    keywords: ['how do i earn', 'earn cashback', 'how cashback', 'start earning', 'get cashback'],
    answer:
      "Easy — activate any offer tagged “Cashback”, then pay with your SMCC card at that merchant. The cashback is worked out on your spend and credited automatically. As a new member you’ve also got a 5% first-purchase welcome offer ready to go.",
    faqId: 'faq-cashback',
    followUp: 'Want to see which merchants offer cashback, or how long it takes to appear?',
    followUpIds: ['flow-merchants', 'flow-cashback-timing', 'flow-welcome-shop'],
  },
  {
    id: 'flow-card-benefits',
    prompt: 'What benefits come with my card?',
    category: 'support',
    keywords: ['benefit', 'benefits', 'perks', 'come with', 'what do i get', 'included'],
    answer: 'Here’s what your card unlocks from day one.',
    faqId: 'faq-benefits',
    followUp: 'Shall I show your welcome offers, or explain how cashback is paid?',
    followUpIds: ['flow-welcome-shop', 'flow-earn-cashback', 'flow-abroad'],
  },
  {
    id: 'flow-merchants',
    prompt: 'Which merchants offer cashback?',
    category: 'cashback',
    keywords: ['merchant', 'merchants', 'which stores', 'which shops', 'where can i', 'where cashback'],
    answer: 'Cashback works across a lot of places — here’s the short version.',
    faqId: 'faq-merchants',
    followUp: 'Want to browse welcome offers you can activate now?',
    followUpIds: ['flow-welcome-shop', 'flow-earn-cashback'],
  },
  {
    id: 'flow-cashback-timing',
    prompt: 'How long does cashback take to appear?',
    category: 'support',
    keywords: ['how long', 'when will', 'timing', 'appear', 'take to', 'credited', 'show up'],
    answer: 'Good to check — here’s the timing.',
    faqId: 'faq-timing',
    followUp: 'Want to activate your first cashback offer now?',
    followUpIds: ['flow-welcome-shop', 'flow-earn-cashback'],
  },
  {
    id: 'flow-abroad',
    prompt: 'Can I use my card abroad?',
    category: 'support',
    keywords: ['abroad', 'overseas', 'international', 'foreign', 'other country', 'travel with card'],
    answer: 'Yes — your card works abroad, and it brings some travel cover with it too.',
    faqId: 'faq-travel',
    followUp: 'Anything else — your card benefits, or welcome offers to get started?',
    followUpIds: ['flow-card-benefits', 'flow-welcome-shop'],
  },
  {
    id: 'flow-welcome-shop',
    prompt: 'Show me welcome offers',
    category: 'shop',
    keywords: ['welcome', 'first purchase', 'new member', 'get started', 'starter', 'good first buy'],
    answer:
      'Here are a few easy first buys — each has cashback applied, so your welcome 5% and everyday cashback stack automatically when you pay with your SMCC card.',
    productIds: ['m-mug', 'm-tote', 'm-notebook'],
    followUp: 'Want me to explain how the cashback is paid, or which merchants take part?',
    followUpIds: ['flow-earn-cashback', 'flow-merchants'],
  },
  // ── Singapore Traveller · travel-commerce marketplace ──
  {
    id: 'flow-sg-todo',
    prompt: 'Best things to do in Singapore',
    category: 'shop',
    keywords: ['things to do', 'do in singapore', 'attractions', 'see in singapore', 'sightseeing', 'experiences'],
    answer:
      'Singapore packs a lot in. Two crowd-pleasers near Marina Bay — and because you’ll pay with your SMCC card, each booking earns cashback.',
    productIds: ['m-gardens', 'm-nightsafari'],
    followUp: 'Want dining cashback near your hotel, or where to stay around Marina Bay?',
    followUpIds: ['flow-sg-dining-cashback', 'flow-sg-stay', 'flow-sg-luxury'],
  },
  {
    id: 'flow-sg-stay',
    prompt: 'Where should I stay near Marina Bay?',
    category: 'shop',
    keywords: ['where to stay', 'stay near', 'marina bay', 'hotel near', 'accommodation'],
    answer:
      'You’ve already booked Marina Bay — smart base. It puts you next to Gardens by the Bay, the waterfront and the shopping malls. Your SMCC travel offers add hotel and dining cashback on top for the trip.',
    followUp: 'Shall I line up things to do nearby, or your Singapore dining cashback?',
    followUpIds: ['flow-sg-todo', 'flow-sg-dining-cashback'],
  },
  {
    id: 'flow-sg-dining-cashback',
    prompt: 'Can I earn cashback on dining in Singapore?',
    category: 'cashback',
    keywords: ['dining', 'eat', 'food', 'restaurant singapore', 'dining cashback', 'cashback dining'],
    answer:
      'Yes — you’ve got 10% cashback on Marina Bay dining ready to activate for your trip. Pay with your SMCC card at participating restaurants and it’s applied automatically.',
    faqId: 'faq-cashback',
    followUp: 'Want luxury shopping picks too, or things to do nearby?',
    followUpIds: ['flow-sg-luxury', 'flow-sg-todo'],
  },
  {
    id: 'flow-sg-luxury',
    prompt: 'Show me luxury shopping offers in Singapore',
    category: 'shop',
    keywords: ['luxury', 'shopping', 'orchard', 'retail', 'designer', 'boutique'],
    answer:
      'Orchard Road is the place for it. A couple of standout picks with card-linked cashback — ideal as a trip souvenir.',
    productIds: ['m-perfume', 'm-watch'],
    followUp: 'Want travel benefits on your card, or dining cashback for the trip?',
    followUpIds: ['flow-travel-cover', 'flow-sg-dining-cashback'],
  },
  {
    id: 'flow-sg-outfit',
    prompt: 'Outfit ideas for my Singapore trip',
    category: 'shop',
    keywords: ['outfit', 'wear', 'clothes', 'singapore', 'dress', 'style', 'fashion'],
    answer:
      "Singapore is warm and humid year-round, so I’d go light and smart-casual. Here are a few breathable picks — and because you booked with your SMCC card, each one has cashback already applied.",
    productIds: ['m-blazer', 'm-polo', 'm-sneakers', 'm-sunglasses'],
    followUp: 'Want me to sort out what to pack, or check your travel cashback first?',
    followUpIds: ['flow-sg-pack', 'flow-cashback', 'flow-travel-cover'],
  },
  {
    id: 'flow-sg-pack',
    prompt: 'What should I pack for Singapore?',
    category: 'shop',
    keywords: ['pack', 'packing', 'luggage', 'bring', 'essentials', 'trip'],
    answer:
      'A few trip essentials I’d recommend for Singapore. The travel adapter uses Type G plugs, which you’ll need there. Cashback is shown per item.',
    productIds: ['m-carryon', 'm-adapter', 'm-powerbank', 'm-earbuds'],
    followUp: 'Shall I show trending tech for the flight, or your Singapore dining cashback?',
    followUpIds: ['flow-tech', 'flow-cashback'],
  },
  {
    id: 'flow-tech',
    prompt: 'Show me trending tech deals',
    category: 'shop',
    keywords: ['tech', 'gadget', 'electronics', 'deal', 'earbuds', 'headphones', 'charger'],
    answer: 'Here’s what’s trending in tech right now, with card-linked cashback on each.',
    productIds: ['m-earbuds', 'm-powerbank', 'm-adapter'],
    followUp: 'Want a gift idea too, or a hand redeeming your V Points?',
    followUpIds: ['flow-gift', 'flow-points'],
  },
  {
    id: 'flow-gift',
    prompt: 'Find a gift under ¥10,000',
    category: 'shop',
    keywords: ['gift', 'present', 'under', 'budget', 'cheap', 'affordable'],
    answer: 'Great gift ideas under ¥10,000 — all with cashback when you pay with your SMCC card.',
    productIds: ['m-sunglasses', 'm-polo', 'm-powerbank'],
    followUp: 'Need anything else — outfit ideas or packing help for your trip?',
    followUpIds: ['flow-sg-outfit', 'flow-sg-pack'],
  },
  {
    id: 'flow-cashback',
    prompt: 'What cashback am I earning?',
    category: 'cashback',
    keywords: ['cashback', 'earning', 'earn', 'rewards', 'back', 'save'],
    answer:
      'Right now your best live cashback is on travel and dining for your Singapore trip. Anything you buy through Muse below stacks card-linked cashback automatically — no codes to enter.',
    faqId: 'faq-cashback',
    followUp: 'Want to start shopping those Singapore picks?',
    followUpIds: ['flow-sg-outfit', 'flow-sg-pack', 'flow-tech'],
  },
  {
    id: 'flow-points',
    prompt: 'How do I redeem my V Points?',
    category: 'support',
    keywords: ['points', 'redeem', 'v points', 'balance', 'use points'],
    answer: 'Happy to help with V Points.',
    faqId: 'faq-points',
    followUp: 'Anything else? I can check your cashback or travel cover.',
    followUpIds: ['flow-cashback', 'flow-travel-cover'],
  },
  {
    id: 'flow-lost',
    prompt: 'My card is lost — what do I do?',
    category: 'support',
    keywords: ['lost', 'stolen', 'freeze', 'block', 'missing', 'fraud'],
    answer: 'Let’s secure your card right away.',
    faqId: 'faq-lost',
    followUp: 'Would you like to see your latest statement, or check travel cover?',
    followUpIds: ['flow-statement', 'flow-travel-cover'],
  },
  {
    id: 'flow-travel-cover',
    prompt: 'What travel benefits do I have with my card?',
    category: 'support',
    keywords: ['insurance', 'protection', 'cover', 'travel benefit', 'travel benefits', 'lounge', 'while travelling'],
    answer: 'Good question — travel is where your card does a lot of quiet work.',
    faqId: 'faq-travel',
    followUp: 'Want lounge-ready travel picks, or your Singapore cashback?',
    followUpIds: ['flow-sg-pack', 'flow-sg-dining-cashback'],
  },
  {
    id: 'flow-statement',
    prompt: 'Where can I see my statement?',
    category: 'support',
    keywords: ['statement', 'bill', 'transactions', 'history'],
    answer: 'Here’s how to find it.',
    faqId: 'faq-statement',
    followUp: 'Anything else — redeeming V Points, or your live cashback?',
    followUpIds: ['flow-points', 'flow-cashback'],
  },
];

/** Suggested prompt chips shown first, ordered to mix shopping and support. */
export const museSuggestedFlowIds = [
  'flow-earn-cashback',
  'flow-card-benefits',
  'flow-merchants',
  'flow-cashback-timing',
  'flow-welcome-shop',
];

/**
 * Persona-aware suggested prompt chips. The New Cardholder leads with FAQ /
 * support prompts, while the Singapore Traveller leads with travel commerce.
 */
export const museSuggestedFlowIdsByUser: Record<AppUserId, string[]> = {
  1: [
    'flow-earn-cashback',
    'flow-card-benefits',
    'flow-merchants',
    'flow-cashback-timing',
    'flow-abroad',
    'flow-welcome-shop',
  ],
  2: [
    'flow-sg-todo',
    'flow-sg-stay',
    'flow-travel-cover',
    'flow-sg-dining-cashback',
    'flow-sg-luxury',
    'flow-sg-outfit',
  ],
};

export const museFlowById = (id: string): MuseFlow | undefined =>
  museFlows.find((f) => f.id === id);

/** A leading, guided category chip that maps to a starter flow. */
export interface MuseCategoryChip {
  label: string;
  icon: string;
  flowId: string;
}

/**
 * Persona-aware leading category chips shown before the customer types, so
 * they immediately see what they can ask (Offers / Cashback / Points / Nearby /
 * Travel) rather than facing a blank composer.
 */
export const museCategoryChipsByUser: Record<AppUserId, MuseCategoryChip[]> = {
  1: [
    { label: 'Offers', icon: 'local_offer', flowId: 'flow-welcome-shop' },
    { label: 'Cashback', icon: 'savings', flowId: 'flow-earn-cashback' },
    { label: 'Points', icon: 'account_balance_wallet', flowId: 'flow-points' },
    { label: 'Nearby', icon: 'near_me', flowId: 'flow-merchants' },
    { label: 'Travel', icon: 'flight', flowId: 'flow-abroad' },
  ],
  2: [
    { label: 'Offers', icon: 'local_offer', flowId: 'flow-sg-luxury' },
    { label: 'Cashback', icon: 'savings', flowId: 'flow-sg-dining-cashback' },
    { label: 'Points', icon: 'account_balance_wallet', flowId: 'flow-points' },
    { label: 'Nearby', icon: 'near_me', flowId: 'flow-sg-todo' },
    { label: 'Travel', icon: 'flight', flowId: 'flow-travel-cover' },
  ],
};

/**
 * Persona-aware proactive opening message. Demonstrates Muse proactively
 * engaging the customer based on their current context.
 */
export function museGreeting(appUser: AppUserId, firstName: string): string {
  switch (appUser) {
    case 2:
      return `Hi ${firstName} 👋 I can see your Singapore trip coming up. Want the best things to do near Marina Bay, luxury shopping picks, or a hand activating your travel cashback?`;
    case 1:
    default:
      return `Hi ${firstName} 👋 Welcome to SMCC! You’re still in your welcome period, so I can answer any question about your card — how cashback works, your benefits, eligible merchants — or line up welcome offers to activate.`;
  }
}

/** Deterministic matcher: map free-text to the best flow, or undefined. */
export function matchMuseFlow(input: string): MuseFlow | undefined {
  const q = input.trim().toLowerCase();
  if (!q) return undefined;
  let best: { flow: MuseFlow; score: number } | undefined;
  for (const flow of museFlows) {
    let score = 0;
    for (const kw of flow.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { flow, score };
  }
  return best?.flow;
}
