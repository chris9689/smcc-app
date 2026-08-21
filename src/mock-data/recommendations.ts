import type { Recommendation } from '@/types';

/**
 * Illustrative product recommendations surfaced in the browsing carousel.
 */
export const recommendations: Recommendation[] = [
  {
    id: 'rec-tv',
    productId: 'p-tv',
    reason: 'Complements a new living space',
  },
  {
    id: 'rec-lighting',
    productId: 'p-lighting',
    reason: 'Popular in home-setup baskets',
  },
  {
    id: 'rec-rice',
    productId: 'p-rice',
    reason: 'Frequently paired with kettles',
  },
  {
    id: 'rec-cabinet',
    productId: 'p-cabinet',
    reason: 'Helps organise a new home',
  },
];
