const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photoPool = [
  "1541643600914-78b084683601", "1594035910387-fea47794261f", "1588405748880-12d1d2a59f75",
  "1523293182086-7651a899d37f", "1592945403244-b3fbafd7f539", "1615634260167-c8cdede054de",
  "1563170351-be82bc888aa4", "1557170334-a9632e77c6e4", "1587017539504-67cfbddac569", "1595425970377-c9703cf48b6d",
];

export const photoUrl = (id: string, w?: number) => u(id, w);

export const images = {
  hero: photoPool[0],
  about: photoPool[1],
  categories: { women: photoPool[2], men: photoPool[3], unisex: photoPool[4], oils: photoPool[5], mists: photoPool[6], "gift-sets": photoPool[7] },
  packaging: [photoPool[7], photoPool[8], photoPool[9], photoPool[5], photoPool[1], photoPool[3]],
};