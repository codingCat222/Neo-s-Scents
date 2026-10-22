"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("neos-preloaded")) return;
    setShow(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      sessionStorage.setItem("neos-preloaded", "1");
      setTimeout(() => setOut(true), reduce ? 0 : 700);
      setTimeout(() => setShow(false), reduce ? 0 : 1300);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, 3500);
    return () => clearTimeout(cap);
  }, []);

  if (!show) return null;
  return (
    <div role="status" aria-label="Loading Neo’s Scents" className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-lavender-300 via-lavender-500 to-plum text-white transition-opacity duration-500 ${out ? "opacity-0" : "opacity-100"}`}>
      <div className="flex items-center gap-3 text-4xl font-bold sm:text-5xl">
        <Sparkles size={40} className="text-gold-soft" aria-hidden /> Neo’s <span className="text-lavender-100">Scents</span>
      </div>
      <p className="mt-4 text-center text-base opacity-90">Fragrances for every personality</p>
      <div className="mt-8 h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white motion-reduce:animate-none" />
      <div className="mt-6 h-1 w-52 overflow-hidden rounded-full bg-white/30"><div className="h-full w-full origin-left animate-[load_1.1s_ease-out_forwards] rounded-full bg-white motion-reduce:animate-none" /></div>
      <style>{`@keyframes load{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  );
}