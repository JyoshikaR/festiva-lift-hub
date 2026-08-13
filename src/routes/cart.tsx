import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { inr } from "@/data/festivals";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Festiva" },
      {
        name: "description",
        content: "Review your festival essentials, adjust quantities and proceed to checkout.",
      },
      { property: "og:title", content: "Your Cart — Festiva" },
      { property: "og:description", content: "Festival shopping cart with live totals." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove, count } = useCart();
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;

  return (
    <div className="section-shell py-12 md:py-16">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Your Cart</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        {count} item{count === 1 ? "" : "s"} ready for your celebration.
      </p>

      {items.length === 0 ? (
        <div className="bg-secondary/50 mt-10 rounded-3xl p-14 text-center">
          <ShoppingCart className="text-primary mx-auto size-10" />
          <p className="font-display mt-4 text-xl font-bold">Your cart is empty</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Add festival essentials and they will appear here.
          </p>
          <Button asChild variant="festive" className="mt-6">
            <Link to="/products">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {items.map(({ product, qty }) => (
              <li
                key={product.id}
                className="bg-card flex flex-wrap items-center gap-4 rounded-3xl border border-border p-4 shadow-soft"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="size-24 rounded-2xl object-cover"
                />
                <div className="min-w-40 flex-1">
                  <Link
                    to="/products/$id"
                    params={{ id: String(product.id) }}
                    className="font-display font-bold hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="text-muted-foreground text-xs font-semibold">
                    {product.festival} · {product.category}
                  </p>
                  <p className="font-display mt-1 text-lg font-extrabold">{inr(product.price)}</p>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-border p-1">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty(product.id, qty - 1)}
                    className="hover:bg-secondary grid size-8 place-items-center rounded-full"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(product.id, qty + 1)}
                    className="hover:bg-secondary grid size-8 place-items-center rounded-full"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <p className="font-display w-24 text-right text-lg font-extrabold">
                  {inr(product.price * qty)}
                </p>

                <button
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name}`}
                  className="text-destructive hover:bg-destructive/10 grid size-9 place-items-center rounded-full"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="bg-card h-fit rounded-3xl border border-border p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold">{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-bold">{delivery === 0 ? "Free" : inr(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-display font-bold">Total</dt>
                <dd className="font-display font-extrabold">{inr(subtotal + delivery)}</dd>
              </div>
            </dl>
            <Button asChild variant="festive" size="lg" className="mt-6 w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/products">Continue shopping</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
