import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";
import { inr } from "@/data/festivals";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Festiva" },
      {
        name: "description",
        content: "Enter delivery details and place your festival order on Festiva.",
      },
      { property: "og:title", content: "Checkout — Festiva" },
      { property: "og:description", content: "Fast festival checkout with order summary." },
    ],
  }),
  component: CheckoutPage,
});

const fields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Aarthi Ramesh" },
  { id: "phone", label: "Phone", type: "tel", placeholder: "98765 43210" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "city", label: "City", type: "text", placeholder: "Chennai" },
  { id: "state", label: "State", type: "text", placeholder: "Tamil Nadu" },
  { id: "pincode", label: "Pincode", type: "text", placeholder: "600001" },
] as const;

function CheckoutPage() {
  const { items, subtotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({});
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + delivery;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const id = `FSTV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;
    placeOrder({
      id,
      name: form["name"] ?? "Guest",
      lines: items.map((i) => ({ name: i.product.name, qty: i.qty, price: i.product.price })),
      total,
      address: [form["address"], form["city"], form["state"], form["pincode"]]
        .filter(Boolean)
        .join(", "),
      eta: new Date(Date.now() + 4 * 864e5).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    navigate({ to: "/order-confirmation" });
  }

  return (
    <div className="section-shell py-12 md:py-16">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Checkout</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Prototype checkout — no real payment gateway is connected.
      </p>

      <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="bg-card space-y-5 rounded-3xl border border-border p-6 shadow-soft md:p-8">
          <h2 className="font-display text-xl font-bold">Delivery details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.id] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              required
              rows={3}
              placeholder="Flat / House no, street, landmark"
              value={form["address"] ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            />
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-xs">
            <Lock className="size-3.5" /> Details stay in your browser for this prototype.
          </p>
        </div>

        <aside className="bg-card h-fit rounded-3xl border border-border p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {product.name} × {qty}
                </span>
                <span className="font-semibold">{inr(product.price * qty)}</span>
              </li>
            ))}
            {items.length === 0 && (
              <li className="text-muted-foreground">
                Cart is empty —{" "}
                <Link to="/products" className="text-primary font-bold">
                  add products
                </Link>
              </li>
            )}
          </ul>
          <dl className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
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
              <dd className="font-display font-extrabold">{inr(total)}</dd>
            </div>
          </dl>
          <Button type="submit" variant="festive" size="lg" className="mt-6 w-full">
            <CreditCard className="size-4" /> Place Order
          </Button>
        </aside>
      </form>
    </div>
  );
}
