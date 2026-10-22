import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-plum-soft">That page doesn’t exist or has moved. Head back to the shop to keep browsing.</p>
      <Link href="/shop" className="btn-primary mt-8">Go to shop</Link>
    </section>
  );
}