/**
 * Shopping Muse — conversational marketplace + customer support data.
 *
 * Shopping Muse is SMCC's in-app conversational assistant. It can:
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
  /** Emoji used for the product tile (keeps the demo asset-light and clean). */
  emoji: string;
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
}

export const museProducts: MuseProduct[] = [
  { id: 'm-blazer', name: 'Lightweight linen blazer', brand: 'UNIQLO', price: 12900, cashbackPct: 6, emoji: '🧥', tag: 'Editor’s pick', blurb: 'Breathable smart-casual layer for humid evenings.' },
  { id: 'm-polo', name: 'Quick-dry polo shirt', brand: 'UNIQLO', price: 4200, cashbackPct: 6, emoji: '👕', blurb: 'Stays fresh through a full day out.' },
  { id: 'm-sneakers', name: 'Breathable travel sneakers', brand: 'ONE', price: 9800, cashbackPct: 8, emoji: '👟', tag: 'Trending', blurb: 'Cushioned for long days of walking.' },
  { id: 'm-sunglasses', name: 'Polarised sunglasses', brand: 'ZOFF', price: 6500, cashbackPct: 5, emoji: '🕶️', blurb: 'UV400 protection for bright, sunny days.' },
  { id: 'm-carryon', name: 'Compact 40L carry-on', brand: 'MUJI', price: 18900, cashbackPct: 10, emoji: '🧳', tag: 'Trip-ready', blurb: 'Cabin-sized, fits most airline limits.' },
  { id: 'm-adapter', name: 'Universal travel adapter', brand: 'ELECOM', price: 2300, cashbackPct: 12, emoji: '🔌', tag: 'Best cashback', blurb: 'Works in Singapore (Type G) and 150+ countries.' },
  { id: 'm-powerbank', name: 'Slim 10,000mAh power bank', brand: 'Anker', price: 3900, cashbackPct: 9, emoji: '🔋', blurb: 'Keeps your phone charged on the go.' },
  { id: 'm-earbuds', name: 'Noise-cancelling earbuds', brand: 'SONY', price: 15400, cashbackPct: 7, emoji: '🎧', blurb: 'Quiet the cabin on your flight.' },
];

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
];

export const museFaqById = (id: string): MuseFaq | undefined =>
  museFaqs.find((f) => f.id === id);

export const museFlows: MuseFlow[] = [
  {
    id: 'flow-sg-outfit',
    prompt: 'Outfit ideas for my Singapore trip',
    category: 'shop',
    keywords: ['outfit', 'wear', 'clothes', 'singapore', 'dress', 'style', 'fashion'],
    answer:
      "Singapore is warm and humid year-round, so I’d go light and smart-casual. Here are a few breathable picks — and because you booked with your SMCC card, each one has cashback already applied.",
    productIds: ['m-blazer', 'm-polo', 'm-sneakers', 'm-sunglasses'],
  },
  {
    id: 'flow-sg-pack',
    prompt: 'What should I pack for Singapore?',
    category: 'shop',
    keywords: ['pack', 'packing', 'luggage', 'bring', 'essentials', 'trip'],
    answer:
      'A few trip essentials I’d recommend for Singapore. The travel adapter uses Type G plugs, which you’ll need there. Cashback is shown per item.',
    productIds: ['m-carryon', 'm-adapter', 'm-powerbank', 'm-earbuds'],
  },
  {
    id: 'flow-tech',
    prompt: 'Show me trending tech deals',
    category: 'shop',
    keywords: ['tech', 'gadget', 'electronics', 'deal', 'earbuds', 'headphones', 'charger'],
    answer: 'Here’s what’s trending in tech right now, with card-linked cashback on each.',
    productIds: ['m-earbuds', 'm-powerbank', 'm-adapter'],
  },
  {
    id: 'flow-gift',
    prompt: 'Find a gift under ¥10,000',
    category: 'shop',
    keywords: ['gift', 'present', 'under', 'budget', 'cheap', 'affordable'],
    answer: 'Great gift ideas under ¥10,000 — all with cashback when you pay with your SMCC card.',
    productIds: ['m-sunglasses', 'm-polo', 'm-powerbank'],
  },
  {
    id: 'flow-cashback',
    prompt: 'What cashback am I earning?',
    category: 'cashback',
    keywords: ['cashback', 'earning', 'earn', 'rewards', 'back', 'save'],
    answer:
      'Right now your best live cashback is on travel and dining for your Singapore trip. Anything you buy through Muse below stacks card-linked cashback automatically — no codes to enter.',
    faqId: 'faq-cashback',
  },
  {
    id: 'flow-points',
    prompt: 'How do I redeem my V Points?',
    category: 'support',
    keywords: ['points', 'redeem', 'v points', 'balance', 'use points'],
    answer: 'Happy to help with V Points.',
    faqId: 'faq-points',
  },
  {
    id: 'flow-lost',
    prompt: 'My card is lost — what do I do?',
    category: 'support',
    keywords: ['lost', 'stolen', 'freeze', 'block', 'missing', 'fraud'],
    answer: 'Let’s secure your card right away.',
    faqId: 'faq-lost',
  },
  {
    id: 'flow-travel-cover',
    prompt: 'Does my card cover me while travelling?',
    category: 'support',
    keywords: ['insurance', 'protection', 'cover', 'travel', 'lounge', 'abroad', 'overseas'],
    answer: 'Good question — travel is where your card does a lot of quiet work.',
    faqId: 'faq-travel',
  },
  {
    id: 'flow-statement',
    prompt: 'Where can I see my statement?',
    category: 'support',
    keywords: ['statement', 'bill', 'transactions', 'history'],
    answer: 'Here’s how to find it.',
    faqId: 'faq-statement',
  },
];

/** Suggested prompt chips shown first, ordered to mix shopping and support. */
export const museSuggestedFlowIds = [
  'flow-sg-outfit',
  'flow-tech',
  'flow-cashback',
  'flow-points',
  'flow-travel-cover',
];

/**
 * Persona-aware proactive opening message. Demonstrates Muse proactively
 * engaging the customer based on their current context.
 */
export function museGreeting(appUser: AppUserId, firstName: string): string {
  switch (appUser) {
    case 3:
      return `Hi ${firstName} 👋 I noticed your Singapore trip coming up. Want smart-casual outfit ideas for the humid weather, or a hand activating your travel cashback?`;
    case 2:
      return `Hi ${firstName} 👋 Planning your Okinawa getaway? I can pull together warm-weather styles with cashback, or answer any question about your card.`;
    case 4:
      return `Hi ${firstName} 👋 It’s almost lunchtime. I can find nearby dining cashback, shop a few essentials, or help with anything on your card.`;
    default:
      return `Hi ${firstName} 👋 I’m Muse, your SMCC shopping assistant. Ask me to find products with cashback, or answer a question about your card.`;
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
