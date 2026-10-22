"use client";
import Link from "next/link";
import { useState } from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/config";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const wa = whatsappLink("Hello Neo’s Scents, I’d like to ask about your fragrances.");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!site.email) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent("Please add me to the Neo’s Scents list: " + email)}`;
    setSent(true);
  };
  return (
    <footer className="mt-24 bg-gradient-to-br from-lavender-200 to-lavender-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-2xl font-bold text-plum-dark">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-plum-soft">Fragrances for every personality, packaged with care.</p>
          <div className="mt-5 flex gap-3">
            {site.instagram && <a href={site.instagram} aria-label="Instagram" className="rounded-full bg-white p-2.5 text-plum hover:text-gold"><Instagram size={18} /></a>}
            {wa && <a href={wa} aria-label="Chat on WhatsApp" className="rounded-full bg-white p-2.5 text-plum hover:text-gold"><MessageCircle size={18} /></a>}
            {site.email && <a href={`mailto:${site.email}`} aria-label="Email" className="rounded-full bg-white p-2.5 text-plum hover:text-gold"><Mail size={18} /></a>}
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="text-lg font-semibold text-plum-dark">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-plum-soft hover:text-plum">{l.label}</Link></li>)}
            <li><Link href="/cart" className="text-plum-soft hover:text-plum">Cart</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-lg font-semibold text-plum-dark">New arrivals, by email</p>
          {site.email ? (
            <form onSubmit={subscribe} className="mt-3 flex gap-2">
              <label htmlFor="nl" className="sr-only">Email address</label>
              <input id="nl" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="field" />
              <button className="btn-primary shrink-0">{sent ? "Sent" : "Join"}</button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-plum-soft">Newsletter signup turns on once a contact email is set.</p>
          )}
        </div>
      </div>
      <p className="border-t border-lavender-300 py-4 text-center text-xs text-plum-soft">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}