import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/products";

export type CartLine = { id: number; qty: number };
export type PlacedOrder = {
  id: string;
  lines: { name: string; qty: number; price: number }[];
  total: number;
  address: string;
  name: string;
  eta: string;
};

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  items: { product: Product; qty: number }[];
  add: (id: number, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  lastOrder: PlacedOrder | null;
  placeOrder: (order: PlacedOrder) => void;
};

const Ctx = createContext<CartContext | null>(null);
const STORAGE_KEY = "festiva.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);

  // Hydrate after mount so SSR markup and client markup match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota errors */
    }
  }, [lines]);

  const add = useCallback((id: number, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map((l) => ({ product: getProduct(l.id), qty: l.qty }))
        .filter((x): x is { product: Product; qty: number } => Boolean(x.product)),
    [lines],
  );

  const value: CartContext = {
    lines,
    items,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: items.reduce((s, i) => s + i.product.price * i.qty, 0),
    add,
    remove,
    setQty,
    clear,
    lastOrder,
    placeOrder: (order) => {
      setLastOrder(order);
      setLines([]);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
