"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { navLinks, site } from "@/lib/config";
import { useCart } from "./CartProvider";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-plum" onClick={() => setOpen(false)}><Sparkles size={22} className="text-lavender-500" aria-hidden />Neo’s <span className="-ml-1.5 text-lavender-500">Scents</span></Link>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-lavender-500 ${path === l.href ? "text-lavender-500" : "text-plum-dark"}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/shop?focus=search" aria-label="Search products" className="rounded-full p-2.5 hover:bg-lavender-100"><Search size={20} /></Link>
          <Link href="/cart" aria-label={`Shopping cart, ${count} items`} className="relative rounded-full p-2.5 hover:bg-lavender-100">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">{count}</span>}
          </Link>
          <button className="rounded-full p-2.5 hover:bg-lavender-100 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-lavender-200 bg-white md:hidden">
          <div className="container-x flex flex-col py-3">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-lavender-100 py-3 text-plum last:border-0">{l.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}