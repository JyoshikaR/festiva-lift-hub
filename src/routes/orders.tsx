import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Truck } from "lucide-react";
import { orders } from "@/data/analytics";
import { inr } from "@/data/festivals";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — Festiva" },
      {
        name: "description",
        content: "Track your Festiva festival orders, delivery status and order totals.",
      },
      { property: "og:title", content: "My Orders — Festiva" },
      { property: "og:description", content: "Festival order history and delivery status." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <div className="section-shell py-12 md:py-16">
      <SectionHeading
        eyebrow="Order History"
        icon={Package}
        title="My orders"
        subtitle="Sample order history from the mock dataset — replace with GET /api/orders later."
      />

      <ul className="mt-10 space-y-4">
        {orders.map((o) => (
          <li
            key={o.id}
            className="bg-card flex flex-wrap items-center gap-4 rounded-3xl border border-border p-5 shadow-soft"
          >
            <span className="bg-festive grid size-12 place-items-center rounded-2xl">
              <Truck className="size-5 text-primary-foreground" />
            </span>
            <div className="min-w-48 flex-1">
              <p className="font-display font-bold">{o.id}</p>
              <p className="text-muted-foreground text-xs font-semibold">
                {o.date} · {o.festival} · {o.items} items · {o.city}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                o.status === "Delivered" ? "bg-leaf/15 text-leaf" : "bg-marigold/25 text-secondary-foreground",
              )}
            >
              {o.status}
            </span>
            <p className="font-display text-lg font-extrabold">{inr(o.total)}</p>
          </li>
        ))}
      </ul>

      <div className="bg-secondary/50 mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <p className="text-sm font-semibold">Need something for the next festival?</p>
        <Button asChild variant="festive">
          <Link to="/festivals">Explore festivals</Link>
        </Button>
      </div>
    </div>
  );
}
