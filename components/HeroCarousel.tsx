"use client";
import { useEffect, useState } from "react";
import Photo from "./Photo";
import { photoPool } from "@/lib/images";
import { site } from "@/lib/config";

const slides = [
    { image: photoPool[0], motion: "a", title: site.tagline, text: "Discover fragrances that express your personality, elevate your everyday moments, and leave a lasting impression." },
    { image: photoPool[7], motion: "b", title: "Every Detail, Beautifully Packaged.", text: "Because a beautiful fragrance deserves an equally beautiful presentation." },
    { image: photoPool[2], motion: "c", title: "Find a scent that feels like you.", text: "Perfumes, oils and body mists for every personality and occasion." },
];

export default function HeroCarousel() {
    const [i, setI] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setInterval(() => setI((c) => (c + 1) % slides.length), 6000);
        return () => clearInterval(t);
    }, []);

    return (
        <section aria-roledescription="carousel" aria-label="Featured" className="hero-stage relative h-[520px] overflow-hidden bg-plum-dark sm:h-[640px]">
            {slides.map((s, n) => (
                <div key={n} role="group" aria-roledescription="slide" aria-hidden={n !== i} className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}>
                    <div className={`hero-3d hero-3d-${s.motion} absolute inset-0`}>
                        <Photo id={s.image} alt="" priority={n === 0} sizes="100vw" className="!absolute inset-0" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-plum-dark/70 to-black/65" />
                    <div className="hero-orb pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-lavender-400/30 blur-3xl" aria-hidden />
                    <div className="hero-orb pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl [animation-delay:-4s]" aria-hidden />
                    <div className="container-x relative flex h-full max-w-3xl flex-col items-center justify-center text-center">
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">{s.title}</h1>
                        <p className="mt-5 max-w-xl text-white/90 sm:text-lg">{s.text}</p>
                    </div>
                </div>
            ))}
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2" aria-hidden>
                {slides.map((_, n) => <span key={n} className={`h-2 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-white" : "w-2 bg-white/50"}`} />)}
            </div>
        </section>
    );
}