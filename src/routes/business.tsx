import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  IndianRupee,
  Lightbulb,
  MapPin,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { inr } from "@/data/festivals";
import {
  businessInsights,
  liftByFestival,
  lowStock,
  regions,
  topProducts,
  totals,
} from "@/data/analytics";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp, Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Business Dashboard — Festiva" },
      {
        name: "description",
        content:
          "Festiva business dashboard: total sales, orders, festival lift, top products, low stock alerts, regional demand and inventory recommendations.",
      },
      { property: "og:title", content: "Business Dashboard — Festiva" },
      {
        property: "og:description",
        content: "Operational festival demand view for sellers and inventory planners.",
      },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  const totalOrders = 8460;

  return (
    <div className="section-shell py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading
          eyebrow="Seller Console"
          icon={BarChart3}
          title="Business Dashboard"
          subtitle="Festival performance, inventory health and demand recommendations in one view."
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="festive">
            <Link to="/power-bi">View Power BI Analytics</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/analytics">View Sales</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/products">View Products</Link>
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: IndianRupee, label: "Total Sales", value: inr(totals.festivalSales) },
          { icon: ShoppingBag, label: "Total Orders", value: totalOrders.toLocaleString("en-IN") },
          { icon: TrendingUp, label: "Festival Lift", value: `+${totals.overallLift}%` },
          { icon: MapPin, label: "Top Region", value: totals.topRegion },
        ].map((k, i) => (
          <Reveal key={k.label} delay={i * 50}>
            <div className="bg-card h-full rounded-3xl border border-border p-6 shadow-soft">
              <span className="bg-festive grid size-11 place-items-center rounded-2xl">
                <k.icon className="size-5 text-primary-foreground" />
              </span>
              <p className="text-muted-foreground mt-4 text-[11px] font-bold uppercase">{k.label}</p>
              <p className="font-display mt-1 text-2xl font-extrabold">{k.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Top products */}
        <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold">
            <Package className="text-primary size-5" /> Top Products
          </h2>
          <ul className="mt-5 space-y-4">
            {topProducts.map((p) => (
              <li key={p.name}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{p.name}</span>
                  <span>{inr(p.revenue)}</span>
                </div>
                <Progress value={(p.units / 4200) * 100} className="mt-2" />
                <p className="text-muted-foreground mt-1 text-xs">
                  {p.units.toLocaleString("en-IN")} units sold
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Low stock */}
        <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold">
            <AlertTriangle className="text-primary size-5" /> Low Stock Products
          </h2>
          <ul className="mt-5 divide-y divide-border text-sm">
            {lowStock.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 py-3">
                <span className="font-semibold">{s.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-destructive font-bold">{s.stock} left</span>
                  <span className="bg-secondary rounded-full px-2.5 py-1 text-xs font-bold">
                    reorder {s.reorder}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Regional demand */}
        <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold">
            <MapPin className="text-primary size-5" /> Regional Demand
          </h2>
          <ul className="mt-5 space-y-4">
            {regions.map((r) => (
              <li key={r.name}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{r.name}</span>
                  <span>
                    {r.demand}% · {inr(r.sales)}
                  </span>
                </div>
                <Progress value={r.demand * 4} className="mt-2" />
              </li>
            ))}
          </ul>
        </div>

        {/* Festival performance */}
        <div className="bg-card rounded-3xl border border-border p-6 shadow-soft">
          <h2 className="font-display flex items-center gap-2 text-xl font-bold">
            <TrendingUp className="text-primary size-5" /> Festival Performance
          </h2>
          <ul className="mt-5 divide-y divide-border text-sm">
            {liftByFestival.slice(0, 6).map((f) => (
              <li key={f.slug} className="flex items-center justify-between gap-3 py-3">
                <Link
                  to="/festivals/$slug"
                  params={{ slug: f.slug }}
                  className="font-semibold hover:text-primary hover:underline"
                >
                  {f.name}
                </Link>
                <span className="flex items-center gap-3">
                  <span className="text-muted-foreground">{inr(f.festivalSales)}</span>
                  <span className="bg-festive rounded-full px-2.5 py-1 text-xs font-bold text-primary-foreground">
                    +{f.lift}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Inventory recommendation */}
      <div className="bg-analytics mt-6 rounded-3xl p-7 text-primary-foreground shadow-card md:p-10">
        <h2 className="font-display flex items-center gap-2 text-2xl font-extrabold">
          <Boxes className="size-6" /> Inventory Recommendation
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-90">
          Suggested stock uplift for the next festival cycle, derived from each festival's measured
          lift and current stock cover.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Crackers", v: "+180% stock", note: "Diwali peak, 6 weeks ahead" },
            { k: "Sweets & Gifting", v: "+120% stock", note: "Diwali, Eid, Rakhi overlap" },
            { k: "Lighting", v: "+95% stock", note: "Diwali & Christmas" },
            { k: "Idols & Puja", v: "+75% stock", note: "Ganesh Chaturthi, Navratri" },
          ].map((r) => (
            <div
              key={r.k}
              className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4"
            >
              <p className="text-xs font-bold uppercase opacity-80">{r.k}</p>
              <p className="font-display mt-1 text-xl font-extrabold">{r.v}</p>
              <p className="mt-1 text-xs opacity-80">{r.note}</p>
            </div>
          ))}
        </div>
        <p className="font-display mt-8 text-3xl font-extrabold">
          Projected festive revenue: {inr(Math.round(totals.festivalSales * 1.22))} (
          <CountUp to={22} suffix="%" /> YoY)
        </p>
      </div>

      {/* Insights */}
      <div className="bg-card mt-6 rounded-3xl border border-border p-6 shadow-soft md:p-8">
        <h2 className="font-display flex items-center gap-2 text-xl font-bold">
          <Lightbulb className="text-primary size-5" /> Business Insights
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {businessInsights.map((i) => (
            <li key={i} className="bg-secondary/50 rounded-2xl p-4 text-sm">
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
