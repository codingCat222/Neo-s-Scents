import { photoPool } from "./images";
export type Category = "women" | "men" | "unisex" | "oils" | "mists" | "gift-sets";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  sizes: { label: string; price: number }[];
  hue: string;
  image: string;
  createdAt: string;
  featured?: boolean;
  giftWrapAvailable: boolean;
}

export const categories: { slug: Category; label: string; blurb: string; hue: string }[] = [
  { slug: "women", label: "Women’s Perfumes", blurb: "Floral, fruity and soft", hue: "#D9B8F0" },
  { slug: "men", label: "Men’s Perfumes", blurb: "Woody, fresh and bold", hue: "#8F7BB8" },
  { slug: "unisex", label: "Unisex Fragrances", blurb: "For everyone", hue: "#C6B4E8" },
  { slug: "oils", label: "Perfume Oils", blurb: "Long-lasting and personal", hue: "#E3CFA0" },
  { slug: "mists", label: "Body Mists", blurb: "Light, everyday freshness", hue: "#EBD3F2" },
  { slug: "gift-sets", label: "Gift Sets", blurb: "Ready to give", hue: "#B995E0" },
];

const s = (a: number, b: number) => [
  { label: "30ml", price: a },
  { label: "50ml", price: b },
];

const raw: Omit<Product, "image">[] = [
  { slug: "lavender-dusk", name: "Lavender Dusk", category: "women", price: 18500, originalPrice: 22000, description: "A soft, floral fragrance for calm evenings. Sample description until real product details are added.", sizes: s(18500, 27500), hue: "#C9A8EA", createdAt: "2026-09-02", featured: true, giftWrapAvailable: true },
  { slug: "golden-hour", name: "Golden Hour", category: "women", price: 24000, description: "A warm, glowing scent that suits daytime and dinner alike. Placeholder description.", sizes: s(24000, 34000), hue: "#E3C98A", createdAt: "2026-10-05", featured: true, giftWrapAvailable: true },
  { slug: "midnight-oak", name: "Midnight Oak", category: "men", price: 21000, description: "A deep, woody scent with a confident finish. Placeholder description.", sizes: s(21000, 31000), hue: "#6F5A9C", createdAt: "2026-08-18", featured: true, giftWrapAvailable: true },
  { slug: "clean-linen", name: "Clean Linen", category: "men", price: 16500, originalPrice: 19000, description: "A fresh, easy fragrance for everyday wear. Placeholder description.", sizes: s(16500, 24500), hue: "#A8C4E8", createdAt: "2026-07-21", giftWrapAvailable: true },
  { slug: "soft-orchid", name: "Soft Orchid", category: "unisex", price: 19500, description: "A smooth, balanced scent that works on anyone. Placeholder description.", sizes: s(19500, 29000), hue: "#D7B6EC", createdAt: "2026-10-12", featured: true, giftWrapAvailable: true },
  { slug: "amber-veil", name: "Amber Veil", category: "unisex", price: 23000, description: "A rich, warm scent with lasting presence. Placeholder description.", sizes: s(23000, 33000), hue: "#D2A56B", createdAt: "2026-06-30", giftWrapAvailable: true },
  { slug: "velvet-oil", name: "Velvet Perfume Oil", category: "oils", price: 9500, description: "A concentrated oil you apply directly to the skin. Placeholder description.", sizes: [{ label: "10ml", price: 9500 }, { label: "20ml", price: 15000 }], hue: "#C9A66B", createdAt: "2026-09-25", featured: true, giftWrapAvailable: true },
  { slug: "rose-oil", name: "Rose Perfume Oil", category: "oils", price: 10500, description: "A gentle rose-led oil for close, personal wear. Placeholder description.", sizes: [{ label: "10ml", price: 10500 }, { label: "20ml", price: 16500 }], hue: "#E8A9C4", createdAt: "2026-10-15", giftWrapAvailable: true },
  { slug: "peach-cloud-mist", name: "Peach Cloud Body Mist", category: "mists", price: 7500, originalPrice: 9000, description: "A light, sweet body mist for everyday. Placeholder description.", sizes: [{ label: "100ml", price: 7500 }, { label: "200ml", price: 12000 }], hue: "#F2B8A8", createdAt: "2026-08-04", giftWrapAvailable: false },
  { slug: "lilac-mist", name: "Lilac Body Mist", category: "mists", price: 7000, description: "A fresh floral mist that layers well. Placeholder description.", sizes: [{ label: "100ml", price: 7000 }, { label: "200ml", price: 11500 }], hue: "#CDB4EE", createdAt: "2026-10-18", giftWrapAvailable: false },
  { slug: "the-signature-set", name: "The Signature Gift Set", category: "gift-sets", price: 38000, description: "A boxed set of a perfume and a body mist. Contents are placeholders until real stock is added.", sizes: [{ label: "Standard", price: 38000 }, { label: "Deluxe", price: 52000 }], hue: "#B28CE0", createdAt: "2026-10-10", featured: true, giftWrapAvailable: true },
  { slug: "pocket-trio", name: "Pocket Trio Set", category: "gift-sets", price: 26000, description: "Three travel-size fragrances in one box. Placeholder description.", sizes: [{ label: "3 x 10ml", price: 26000 }], hue: "#DDBFF0", createdAt: "2026-09-14", giftWrapAvailable: true },
];

export const products: Product[] = raw.map((p, i) => ({ ...p, image: photoPool[i % photoPool.length] }));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const categoryLabel = (c: Category) => categories.find((x) => x.slug === c)?.label ?? c;