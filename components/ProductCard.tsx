"use client";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Photo from "./Photo";
import { useCart } from "./CartProvider";
import { formatNaira } from "@/lib/config";
import { categoryLabel, type Product } from "@/lib/products";

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const onAdd = () => {
    add({ slug: p.slug, name: p.name, size: p.sizes[0].label, unitPrice: p.sizes[0].price, giftWrap: false, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <article className="card group flex flex-col">
      <Link href={`/product/${p.slug}`} className="relative block" aria-label={`View ${p.name}`}>
        <Photo id={p.image} alt={`${p.name} perfume`} hue={p.hue} className="aspect-[4/5]" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
        {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-white">-{discount}%</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-lavender-500">{categoryLabel(p.category)}</p>
        <h3 className="mt-1 text-lg"><Link href={`/product/${p.slug}`} className="hover:text-lavender-500">{p.name}</Link></h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-plum">{formatNaira(p.price)}</span>
          {p.originalPrice && <span className="text-sm text-plum-soft line-through">{formatNaira(p.originalPrice)}</span>}
        </p>
        <div className="mt-4 flex gap-2">
          <button onClick={onAdd} className="btn-primary flex-1 !px-4 !py-2.5">{added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to cart</>}</button>
          <Link href={`/product/${p.slug}`} className="btn-outline !px-4 !py-2.5">Details</Link>
        </div>
      </div>
    </article>
  );
}