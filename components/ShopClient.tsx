"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories, products, type Category } from "@/lib/products";
import { formatNaira } from "@/lib/config";

const maxPrice = Math.max(...products.map((p) => p.price));

export default function ShopClient() {
  const params = useSearchParams();
  const initialCat = params.get("category");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">(categories.some((c) => c.slug === initialCat) ? (initialCat as Category) : "all");
  const [max, setMax] = useState(maxPrice);
  const [sort, setSort] = useState(params.get("sort") === "newest" ? "newest" : "featured");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { if (params.get("focus") === "search") input.current?.focus(); }, [params]);

  const list = useMemo(() => {
    const r = products.filter((p) => (cat === "all" || p.category === cat) && p.price <= max && p.name.toLowerCase().includes(q.trim().toLowerCase()));
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "newest") r.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return r;
  }, [q, cat, max, sort]);

  const reset = () => { setQ(""); setCat("all"); setMax(maxPrice); setSort("featured"); };

  return (
    <div className="container-x py-12">
      <h1 className="section-title">Shop</h1>
      <p className="-mt-6 mb-6 text-center text-sm text-plum-soft">Sample products shown until real inventory is added.</p>

      <div className="mt-8 grid gap-4 rounded-3xl bg-lavender-100 p-5 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <label htmlFor="search" className="sr-only">Search products</label>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-plum-soft" />
          <input id="search" ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fragrances" className="field !pl-10" />
        </div>
        <div>
          <label htmlFor="sort" className="sr-only">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field">
            <option value="featured">Featured</option><option value="newest">Newest arrivals</option>
            <option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-xs text-plum-soft">Up to {formatNaira(max)}</label>
          <input id="price" type="range" min={5000} max={maxPrice} step={500} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-[#4A2878]" />
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-4" role="group" aria-label="Category filter">
          {[{ slug: "all", label: "All" }, ...categories].map((c) => (
            <button key={c.slug} onClick={() => setCat(c.slug as Category | "all")} aria-pressed={cat === c.slug}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${cat === c.slug ? "border-plum bg-plum text-white" : "border-lavender-300 bg-white text-plum hover:bg-lavender-200"}`}>{c.label}</button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-plum-soft" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>
      {list.length ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-lavender-300 py-16 text-center">
          <p className="font-serif text-2xl text-plum">No fragrances match</p>
          <p className="mt-2 text-plum-soft">Try a different search or widen the price range.</p>
          <button onClick={reset} className="btn-primary mt-6">Clear filters</button>
        </div>
      )}
    </div>
  );
}