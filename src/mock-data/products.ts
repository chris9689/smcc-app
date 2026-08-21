import type { Product } from '@/types';



/**
 * Illustrative home-electronics catalogue used for the browsing chapter.
 * Prices and point rates are for demonstration only. Product photos load from
 * a stock-photo service and gracefully fall back to an emoji tile if offline.
 */
export const products: Product[] = [
  {
    id: 'p-kettle',
    name: 'Precision Electric Kettle',
    category: 'Kitchen',
    price: 8980,
    pointRate: 10,
    emoji: '🫖',
    image: '/products/electric_kettle.webp',
    tag: 'Trending',
    rating: 4.7,
    intentSignal: true,
  },
  {
    id: 'p-tv',
    name: '40-inch Smart TV',
    category: 'Living',
    price: 54800,
    pointRate: 8,
    emoji: '📺',
    image: '/products/40_inch_smarttv.webp',
    tag: 'Home setup',
    rating: 4.6,
  },
  {
    id: 'p-rice',
    name: 'IH Rice Cooker 5.5 Go',
    category: 'Kitchen',
    price: 21800,
    pointRate: 7,
    emoji: '🍚',
    image: '/products/rice_cooker.webp',
    rating: 4.8,
  },
  {
    id: 'p-air',
    name: 'Air Purifier Plus',
    category: 'Appliances',
    price: 18600,
    pointRate: 6,
    emoji: '🌬️',
    image: '/products/air_purifier.webp',
    rating: 4.5,
  },
  {
    id: 'p-lighting',
    name: 'Warm Lighting Set',
    category: 'Lighting',
    price: 12400,
    pointRate: 9,
    emoji: '💡',
    image: '/products/warm_lightening_set.webp',
    tag: 'Home setup',
    rating: 4.4,
  },
  {
    id: 'p-curtains',
    name: 'Blackout Curtains (Pair)',
    category: 'Home',
    price: 9800,
    pointRate: 6,
    emoji: '🪟',
    image: '/products/curtain.webp',
    rating: 4.3,
  },
  {
    id: 'p-cabinet',
    name: 'Modular Storage Cabinet',
    category: 'Home',
    price: 16800,
    pointRate: 7,
    emoji: '🗄️',
    image: '/products/storage.webp',
    rating: 4.5,
  },
  {
    id: 'p-dishacc',
    name: 'Dishwasher Care Accessories',
    category: 'Appliances',
    price: 3480,
    pointRate: 5,
    emoji: '🧴',
    image: '/products/dishwasher_care.webp',
    rating: 4.2,
  },
];

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
