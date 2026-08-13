import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, LayoutGrid, MapPin, TrendingUp } from "lucide-react";
import {
  additionalDemand,
  festivalLift,
  getFestival,
  inr,
  themeClasses,
} from "@/data/festivals";
import { productsByFestival } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/festivals/$slug")({
  loader: ({ params }) => {
    const festival = getFestival(params.slug);
    if (!festival) throw notFound();
    return { festival };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Festival not found — Festiva" }, { name: "robots", content: "noindex" }],
      };
    }
    const f = loaderData.festival;
    const title = `${f.name} Store — ${f.tagline} | Festiva`;
    const description = `${f.description} Festival lift: +${festivalLift(f)}%.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: FestivalDetail,
});

function FestivalDetail() {
  const { festival } = Route.useLoaderData();
  const items = productsByFestival(festival.slug);
  const lift = festivalLift(festival);
  const theme = themeClasses[festival.theme];

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={festival.image}
          alt={`${festival.name} celebration`}
          width={1024}
          height={768}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="bg-night absolute inset-0 opacity-80 mix-blend-multiply" />
        <div className="section-shell relative py-14 text-primary-foreground md:py-20">
          <Link
            to="/festivals"
            className="inline-flex items-center gap-1.5 text-sm font-semibold opacity-85 hover:opacity-100"
          >
            <ArrowLeft className="size-4" /> All festivals
          </Link>
          <h1 className="font-display mt-5 text-4xl font-extrabold md:text-6xl">{festival.name}</h1>
          <p className="mt-2 text-base font-semibold opacity-90">{festival.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm opacity-85 md:text-base">{festival.description}</p>

          <div className="mt-7 flex flex-wrap gap-2.5 text-xs font-bold">
            <span className="bg-festive inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
              <TrendingUp className="size-3.5" /> +{lift}% Lift
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 backdrop-blur-md">
              <LayoutGrid className="size-3.5" /> {festival.categories} Categories
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 backdrop-blur-md">
              <CalendarDays className="size-3.5" /> {festival.month}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 backdrop-blur-md">
              <MapPin className="size-3.5" /> {festival.regions.join(", ")}
            </span>
          </div>
        </div>
      </section>

      <section className="section-shell -mt-8 relative z-10">
        <dl className="bg-card grid gap-4 rounded-3xl border border-border p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Festival Lift", v: `+${lift}%` },
            { k: "Festival Sales", v: inr(festival.festivalSales) },
            { k: "Normal Sales", v: inr(festival.normalSales) },
            { k: "Additional Demand", v: inr(additionalDemand(festival)) },
          ].map((s) => (
            <div key={s.k} className="bg-secondary/50 rounded-2xl p-4">
              <dt className="text-muted-foreground text-xs font-bold uppercase">{s.k}</dt>
              <dd className={cn("font-display mt-1 text-2xl font-extrabold")}>{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-shell py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            {festival.name} essentials
          </h2>
          <span className={cn("rounded-full px-3 py-1 text-xs font-bold", theme.chip)}>
            {items.length} products available
          </span>
        </div>

        {items.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 mt-8 rounded-3xl p-10 text-center">
            <p className="font-display text-lg font-bold">Catalogue arriving soon</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Sellers are onboarding {festival.name} stock. Browse the full marketplace meanwhile.
            </p>
            <Button asChild variant="festive" className="mt-5">
              <Link to="/products">Browse all products</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
