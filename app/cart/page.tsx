"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatNaira, site, whatsappLink } from "@/lib/config";

export default function Cart() {
  const { items, subtotal, ready, setQuantity, remove, clear } = useCart();
  if (!ready) return <div className="container-x py-24 text-center text-plum-soft">Loading your cart…</div>;
  if (!items.length)
    return (
      <section className="container-x py-24 text-center">
        <h1 className="text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-plum-soft">Find a fragrance you love and add it here.</p>
        <Link href="/shop" className="btn-primary mt-7">Browse the shop</Link>
      </section>
    );
  const message = `Hello ${site.name}, I’d like to order:\n` + items.map((i) => `• ${i.name} (${i.size})${i.giftWrap ? " + gift packaging" : ""} x${i.quantity} = ${formatNaira(i.unitPrice * i.quantity)}`).join("\n") + `\nSubtotal: ${formatNaira(subtotal)}`;
  const wa = whatsappLink(message);
  return (
    <section className="container-x py-12">
      <h1 className="section-title">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.key} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-lavender-200 p-5">
              <div>
                <Link href={`/product/${i.slug}`} className="font-serif text-xl text-plum hover:text-gold">{i.name}</Link>
                <p className="text-sm text-plum-soft">{i.size}{i.giftWrap ? " · Gift packaging" : ""} · {formatNaira(i.unitPrice)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-lavender-300" role="group" aria-label={`Quantity for ${i.name}`}>
                  <button aria-label="Decrease quantity" onClick={() => setQuantity(i.key, i.quantity - 1)} className="p-2.5"><Minus size={14} /></button>
                  <span className="w-7 text-center text-sm">{i.quantity}</span>
                  <button aria-label="Increase quantity" onClick={() => setQuantity(i.key, i.quantity + 1)} className="p-2.5"><Plus size={14} /></button>
                </div>
                <p className="w-24 text-right font-medium">{formatNaira(i.unitPrice * i.quantity)}</p>
                <button aria-label={`Remove ${i.name}`} onClick={() => remove(i.key)} className="rounded-full p-2 text-plum-soft hover:bg-lavender-100"><Trash2 size={18} /></button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-3xl bg-lavender-100 p-6">
          <h2 className="text-2xl">Summary</h2>
          <p className="mt-4 flex justify-between"><span>Subtotal</span><span className="font-medium">{formatNaira(subtotal)}</span></p>
          <p className="mt-1 text-xs text-plum-soft">Delivery is confirmed with us when you order.</p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full"><MessageCircle size={16} /> Order on WhatsApp</a>
          ) : (
            <p className="mt-6 rounded-2xl bg-white p-3 text-sm text-plum-soft">Ordering opens once the WhatsApp number is set in <code>.env.local</code>.</p>
          )}
          <button onClick={clear} className="mt-3 w-full text-sm text-plum-soft underline">Clear cart</button>
        </aside>
      </div>
    </section>
  );
}