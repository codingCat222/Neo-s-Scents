import type { Metadata } from "next";
import CategoryGrid from "@/components/CategoryGrid";
export const metadata: Metadata = { title: "Collections", description: "Browse Neo’s Scents by collection: women’s, men’s, unisex, oils, body mists and gift sets." };
export default function Collections() {
  return (
    <section className="container-x py-14">
      <h1 className="section-title">Collections</h1>
      <p className="mb-10 mt-3 text-plum-soft">Find your style, then shop it.</p>
      <CategoryGrid />
    </section>
  );
}