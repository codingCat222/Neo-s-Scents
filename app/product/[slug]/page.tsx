import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { categoryLabel, getProduct, products } from "@/lib/products";
import { formatNaira } from "@/lib/config";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description } };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, offers: { "@type": "Offer", priceCurrency: "NGN", price: p.price } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-plum-soft"><Link href="/shop" className="hover:text-plum">Shop</Link> / {p.name}</nav>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="card"><Photo id={p.image} alt={`${p.name} perfume`} hue={p.hue} priority className="aspect-square" sizes="(min-width:768px) 50vw, 100vw" /></div>
          <div>
            <p className="text-sm text-plum-soft">{categoryLabel(p.category)}</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{p.name}</h1>
            <p className="mt-3 flex items-baseline gap-3 text-2xl">
              <span className="text-plum">{formatNaira(p.price)}</span>
              {p.originalPrice && <span className="text-base text-plum-soft line-through">{formatNaira(p.originalPrice)}</span>}
            </p>
            <p className="mt-5 max-w-md text-plum-soft">{p.description}</p>
            <AddToCart product={p} />
          </div>
        </div>
        <h2 className="section-title mt-24">You may also like</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
      </div>
    </>
  );
}