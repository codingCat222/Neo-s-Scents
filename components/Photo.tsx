"use client";
import Image from "next/image";
import { useState } from "react";
import Bottle from "./Bottle";
import { photoUrl } from "@/lib/images";

export default function Photo({ id, alt, className = "", priority = false, sizes = "(min-width:1024px) 33vw, 100vw", hue = "#B995E0" }:
  { id: string; alt: string; className?: string; priority?: boolean; sizes?: string; hue?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-lavender-200 to-lavender-100 ${className}`}>
      {failed ? <div className="absolute inset-0 p-8"><Bottle hue={hue} label={alt} /></div> : (
        <Image src={photoUrl(id, 1200)} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      )}
    </div>
  );
}