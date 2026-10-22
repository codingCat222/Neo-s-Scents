"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem { key: string; slug: string; name: string; size: string; unitPrice: number; giftWrap: boolean; quantity: number; }
interface CartCtx {
  items: CartItem[]; count: number; subtotal: number; ready: boolean;
  add: (item: Omit<CartItem, "key">) => void;
  setQuantity: (key: string, q: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "neos-scents-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { }
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "key">) => {
    const key = `${item.slug}|${item.size}|${item.giftWrap}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(20, i.quantity + item.quantity) } : i));
      return [...prev, { ...item, key }];
    });
  }, []);
  const setQuantity = useCallback((key: string, q: number) => setItems((p) => p.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(20, q)) } : i))), []);
  const remove = useCallback((key: string) => setItems((p) => p.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({
    items, ready, add, setQuantity, remove, clear,
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((n, i) => n + i.quantity * i.unitPrice, 0),
  }), [items, ready, add, setQuantity, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}