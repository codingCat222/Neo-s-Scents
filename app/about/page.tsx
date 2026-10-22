import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { images } from "@/lib/images";
export const metadata: Metadata = { title: "About Us", description: "Neo’s Scents helps people find fragrances they love and packages every order with care." };
export default function About() {
  return (
    <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
      <div className="card"><Photo id={images.about} alt="A perfume bottle with flowers" className="aspect-square" /></div>
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">About Neo’s Scents</h1>
        <p className="mt-5 max-w-md text-plum-soft">Neo’s Scents is a fragrance brand built around one idea: finding a scent you love should feel personal. We stock a range of perfumes, oils and body mists, and we package every order with care so it arrives ready to enjoy or give.</p>
        <p className="mt-4 max-w-md text-xs text-plum-soft">Placeholder story. Replace with the founder’s own words.</p>
        <Link href="/shop" className="btn-primary mt-7">Shop fragrances</Link>
      </div>
    </section>
  );
}