export const site = {
  name: "Neo’s Scents",
  tagline: "More Than Just a Scent, It’s a Vibe.",
  description: "Fragrances for every personality, beautifully packaged. Shop perfumes, oils, body mists and gift sets from Neo’s Scents.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const giftPackagingFee = 2500;

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");

export function whatsappLink(message: string) {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}