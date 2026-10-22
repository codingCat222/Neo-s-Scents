import Link from "next/link";
import { Gift, Heart, MessagesSquare, ShoppingBag, Sparkles } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import Photo from "@/components/Photo";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { images } from "@/lib/images";

const Section = ({ title, sub, bg = "", children }: { title: string; sub?: string; bg?: string; children: React.ReactNode }) => (
  <section className={`py-20 ${bg}`}>
    <div className="container-x">
      <h2 className="section-title">{title}</h2>
      {sub && <p className="-mt-6 mb-10 text-center text-sm">{sub}</p>}
      {children}
    </div>
  </section>
);

const packagingCaptions = ["Gift boxes", "Ribbon finishing", "Branded wrapping", "Ready to gift", "Careful presentation", "Every order"];

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const arrivals = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const why = [
    { icon: Sparkles, t: "A wide range", d: "Perfumes, oils, body mists and gift sets in one place." },
    { icon: Gift, t: "Beautiful packaging", d: "Every order is packaged with care." },
    { icon: Heart, t: "For every occasion", d: "Everyday wear, date nights, birthdays and gifts." },
    { icon: ShoppingBag, t: "Easy ordering", d: "Build your cart and send it straight to us." },
    { icon: MessagesSquare, t: "Friendly support", d: "Ask us anything before you buy." },
  ];
  return (
    <>
      <HeroCarousel />

      <section className="bg-white py-20">
        <div className="container-x">
          <h2 className="section-title">About Neo’s Scents</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl text-lavender-500">Find a scent that feels like you</h3>
              <p className="mb-4">Neo’s Scents helps people discover fragrances they love and makes every purchase feel special, from the first spritz to the ribbon on the box.</p>
              <p className="mb-8">We sell a range of perfumes, oils and body mists, and we package every order ourselves so it’s ready to enjoy or to give.</p>
              <Link href="/about" className="btn-primary">Learn more</Link>
            </div>
            <div className="card group"><Photo id={images.about} alt="A perfume bottle with flowers" className="aspect-[4/3]" /></div>
          </div>
        </div>
      </section>

      <Section title="Shop by Category"><CategoryGrid /></Section>

      <Section title="Bestsellers" sub="Sample products shown until real inventory is added." bg="bg-white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </Section>

      <Section title="Every Detail, Beautifully Packaged" sub="Because a beautiful fragrance deserves an equally beautiful presentation.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.packaging.map((id, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-soft">
              <Photo id={id} alt={`${packagingCaptions[i]} by Neo’s Scents`} className="aspect-square" sizes="(min-width:768px) 33vw, 50vw" />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum-dark/80 to-transparent p-4 pt-10 text-sm font-semibold text-white">{packagingCaptions[i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center"><Link href="/shop?category=gift-sets" className="btn-primary">Explore gift sets</Link></div>
      </Section>

      <Section title="New Arrivals" bg="bg-white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{arrivals.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </Section>

      <Section title="Why Choose Neo’s Scents?">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {why.map(({ icon: I, t, d }) => (
            <div key={t} className="card p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-lavender-400 to-plum text-white"><I size={24} /></span>
              <h3 className="mt-4 text-lg">{t}</h3>
              <p className="mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What Our Customers Say" sub="Sample testimonials. Replace with real customer feedback." bg="bg-white">
        <div className="grid gap-6 md:grid-cols-3">
          {["The packaging made it feel like a real gift.", "Easy to order and easy to ask questions.", "I found a scent that actually feels like me."].map((q, i) => (
            <figure key={i} className="card p-7">
              <blockquote className="text-plum-dark">“{q}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-lavender-500">Sample customer (placeholder)</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-to-br from-lavender-400 to-plum py-16 text-center text-white">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-white">Ready to find your scent?</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">Browse the collection or message us with any questions.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/shop" className="btn bg-white text-plum hover:bg-lavender-100">Shop now</Link><Link href="/contact" className="btn-light">Contact us</Link></div>
        </div>
      </section>
    </>
  );
}