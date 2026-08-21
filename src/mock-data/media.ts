/** Reachable stock imagery (Pexels CDN) used for hero art and the avatar. */

const pexels = (id: number, w = 800, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const media = {
  /** Hanako's avatar portrait. */
  avatar: pexels(774909, 200, 200),
  /** Living-room hero for home / premium collection banners. */
  heroLiving: pexels(1571460, 800, 500),
  /** Kitchen hero for the household offer. */
  heroKitchen: pexels(3952047, 800, 500),
};
