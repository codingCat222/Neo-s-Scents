"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatNaira, giftPackagingFee } from "@/lib/config";
import type { Product } from "@/lib/products";

export default function AddToCart({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [gift, setGift] = useState(false);
  const [added, setAdded] = useState(false);
  const unit = size.price + (gift ? giftPackagingFee : 0);
  const onAdd = () => {
    add({ slug: p.slug, name: p.name, size: size.label, unitPrice: unit, giftWrap: gift, quantity: qty });
    setAdded(true);
  };
  return (
    <div className="mt-6 space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm text-plum-soft">Size</legend>
        <div className="flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button key={s.label} onClick={() => setSize(s)} aria-pressed={size.label === s.label}
              className={`rounded-full border px-4 py-2 text-sm ${size.label === s.label ? "border-plum bg-plum text-white" : "border-lavender-300 hover:bg-lavender-100"}`}>{s.label} · {formatNaira(s.price)}</button>
          ))}
        </div>
      </fieldset>
      {p.giftWrapAvailable && (
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-lavender-300 p-4">
          <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="h-4 w-4 accent-[#4A2878]" />
          <span className="text-sm">Add gift packaging <span className="text-plum-soft">(+{formatNaira(giftPackagingFee)})</span></span>
        </label>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-lavender-300" role="group" aria-label="Quantity">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus size={16} /></button>
          <span className="w-8 text-center" aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(20, qty + 1))} className="p-3"><Plus size={16} /></button>
        </div>
        <button onClick={onAdd} className="btn-primary flex-1 sm:flex-none">{added ? <><Check size={16} /> Added</> : `Add to cart · ${formatNaira(unit * qty)}`}</button>
      </div>
      {added && <p className="text-sm text-plum-soft">In your cart. <Link href="/cart" className="font-medium text-gold underline">View cart</Link></p>}
    </div>
  );
}