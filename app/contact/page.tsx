import type { Metadata } from "next";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/config";
export const metadata: Metadata = { title: "Contact", description: "Contact Neo’s Scents with questions about fragrances, gift packaging or your order." };
export default function Contact() {
  const wa = whatsappLink("Hello Neo’s Scents, I have a question.");
  const rows = [
    { show: !!wa, href: wa!, icon: MessageCircle, label: "Chat on WhatsApp" },
    { show: !!site.email, href: `mailto:${site.email}`, icon: Mail, label: site.email },
    { show: !!site.instagram, href: site.instagram, icon: Instagram, label: "Instagram" },
  ].filter((r) => r.show);
  return (
    <section className="container-x max-w-2xl py-16">
      <h1 className="section-title">Contact us</h1>
      <p className="mt-3 text-plum-soft">Questions about a scent, gift packaging or an order? Reach out.</p>
      {rows.length ? (
        <ul className="mt-8 space-y-3">
          {rows.map(({ href, icon: I, label }) => (
            <li key={label}><a href={href} className="flex items-center gap-3 rounded-3xl border border-lavender-200 p-5 hover:bg-lavender-100"><I className="text-gold" size={20} />{label}</a></li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-3xl bg-lavender-100 p-6 text-plum-soft">Contact details haven’t been added yet. Set them in <code>.env.local</code>.</p>
      )}
    </section>
  );
}