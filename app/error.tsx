"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container-x py-28 text-center">
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="mt-3 text-plum-soft">Please try again.</p>
      <button onClick={reset} className="btn-primary mt-6">Try again</button>
    </section>
  );
}