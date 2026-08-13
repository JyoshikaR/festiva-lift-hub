import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, MapPin, PartyPopper, Receipt } from "lucide-react";
import { inr } from "@/data/festivals";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Festiva" },
      {
        name: "description",
        content: "Your Festiva festival order is confirmed with order ID and delivery estimate.",
      },
      { property: "og:title", content: "Order Confirmed — Festiva" },
      { property: "og:description", content: "Festival order placed successfully." },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="section-shell py-20 text-center">
        <PartyPopper className="text-primary mx-auto size-10" />
        <h1 className="font-display mt-4 text-3xl font-extrabold">No recent order</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Place an order to see its confirmation here.
        </p>
        <Button asChild variant="festive" className="mt-6">
          <Link to="/products">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-shell py-14 md:py-20">
      <div className="bg-festive rounded-3xl p-8 text-primary-foreground shadow-card md:p-12">
        <PartyPopper className="size-10" />
        <h1 className="font-display mt-4 text-3xl font-extrabold md:text-5xl">
          🎉 Order Successfully Placed!
        </h1>
        <p className="mt-3 text-sm opacity-90 md:text-base">
          Thank you {lastOrder.name}. Your festival essentials are on the way.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-bold">
          <Receipt className="size-4" /> Order ID: {lastOrder.id}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold">Items ordered</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {lastOrder.lines.map((l) => (
              <li key={l.name} className="flex justify-between gap-3 py-3">
                <span>
                  {l.name} <span className="text-muted-foreground">× {l.qty}</span>
                </span>
                <span className="font-semibold">{inr(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="font-display mt-4 flex justify-between border-t border-border pt-4 text-lg font-extrabold">
            <span>Total paid</span>
            <span>{inr(lastOrder.total)}</span>
          </p>
        </div>

        <aside className="bg-card h-fit space-y-5 rounded-3xl border border-border p-6 shadow-soft">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase">
              <MapPin className="text-primary size-4" /> Delivery address
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {lastOrder.address || "Address saved with your order"}
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase">
              <CalendarCheck className="text-primary size-4" /> Estimated delivery
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">{lastOrder.eta}</p>
          </div>
          <Button asChild variant="festive" className="w-full">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/orders">View my orders</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
