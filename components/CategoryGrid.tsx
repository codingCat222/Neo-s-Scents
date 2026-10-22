import Link from "next/link";
import Photo from "./Photo";
import { categories } from "@/lib/products";
import { images } from "@/lib/images";

export default function CategoryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <Link key={c.slug} href={`/shop?category=${c.slug}`} className="card group block">
          <Photo id={images.categories[c.slug]} alt={`${c.label}`} hue={c.hue} className="aspect-[4/3]" />
          <div className="p-6">
            <h3 className="text-xl">{c.label}</h3>
            <p className="mt-1 text-sm">{c.blurb}</p>
            <p className="mt-3 text-sm font-semibold text-lavender-500">View products</p>
          </div>
        </Link>
      ))}
    </div>
  );
}