import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
export const metadata: Metadata = { title: "Shop", description: "Shop perfumes, perfume oils, body mists and gift sets from Neo’s Scents." };
export default function Shop() {
  return <Suspense fallback={<div className="container-x py-24 text-center text-plum-soft">Loading products…</div>}><ShopClient /></Suspense>;
}