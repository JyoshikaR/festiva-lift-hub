import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Building2,
  Gift,
  Lightbulb,
  MapPin,
  Package,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  TrendingUp,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-festival.jpg";
import saleImg from "@/assets/sale-banner.jpg";
import { festivals, festivalLift, inr, themeClasses } from "@/data/festivals";
import { popularProductIds, products } from "@/data/products";
import { businessInsights, liftByFestival, totals } from "@/data/analytics";
import { FestivalCard } from "@/components/FestivalCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp, Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Festiva — Smart Festival Marketplace & Festival Lift Analytics" },
      {
        name: "description",
        content:
          "Shop Diwali, Pongal, Christmas, Eid, Holi and 20+ festival essentials on Festiva, and measure festival demand lift with built-in analytics for businesses.",
      },
      { property: "og:title", content: "Festiva — Celebrate Every Festival" },
      {
        property: "og:description",
        content:
          "One-stop Indian festival marketplace with Festival Lift analytics that quantify demand growth during festival periods.",
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Store, title: "Wide Range", text: "Festival-specific products across 25+ celebrations." },
  { icon: BadgePercent, title: "Best Prices", text: "Unbeatable festive deals up to 60% off." },
  { icon: Truck, title: "Fast Delivery", text: "Quick & reliable delivery to 30+ cities." },
  { icon: ShieldCheck, title: "Trusted Quality", text: "Quality-assured, artisan-verified stock." },
  { icon: BarChart3, title: "Smart Analytics", text: "Festival Lift insights for businesses." },
];

const stats = [
  { icon: PartyPopper, value: 25, suffix: "+", label: "Festivals Covered" },
  { icon: Package, value: 5000, suffix: "+", label: "Products" },
  { icon: Users, value: 12000, suffix: "+", label: "Happy Customers" },
  { icon: MapPin, value: 30, suffix: "+", label: "Cities Delivered" },
  { icon: TrendingUp, value: 88, suffix: "%", label: "Average Festival Lift" },
];

function Home() {
  const popular = popularProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Indian festival celebration with fireworks, diyas and marigold decorations"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="bg-analytics absolute inset-0 opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />

        <div className="section-shell relative py-20 text-primary-foreground md:py-32">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <Sparkles className="size-3.5" /> Festival Marketplace + Lift Analytics
          </span>
          <h1 className="animate-rise font-display mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold md:text-6xl lg:text-7xl">
            Celebrate Every Festival.
            <span className="block bg-gradient-to-r from-gold via-marigold to-primary-foreground bg-clip-text text-transparent">
              Find Everything in One Place.
            </span>
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-base opacity-90 md:text-lg">
            Festiva is your one-stop marketplace for festival essentials and smart demand insights
            for businesses.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3">
            <Button asChild variant="festive" size="lg">
              <Link to="/festivals">
                Explore Festivals <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/analytics">
                <BarChart3 className="size-4" /> Festival Lift Analytics
              </Link>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Festivals", v: "25+" },
              { k: "Overall Lift", v: `+${totals.overallLift}%` },
              { k: "Products", v: "5000+" },
              { k: "Cities", v: "30+" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-md"
              >
                <dt className="text-xs font-semibold opacity-75">{s.k}</dt>
                <dd className="font-display text-2xl font-extrabold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- FESTIVAL QUICK ACCESS ---------------- */}
      <section className="section-shell -mt-10 relative z-10">
        <div className="bg-card rounded-3xl border border-border p-5 shadow-card md:p-7">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-extrabold md:text-2xl">
                Shop by Festival
              </h2>
              <p className="text-muted-foreground text-sm">
                Swipe through 12 live festival storefronts
              </p>
            </div>
            <Link
              to="/festivals"
              className="text-primary inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="scroll-row flex gap-4 pb-3">
            {festivals.map((f) => (
              <li key={f.id} className="shrink-0">
                <Link
                  to="/festivals/$slug"
                  params={{ slug: f.slug }}
                  className="group flex w-24 flex-col items-center gap-2 md:w-28"
                >
                  <span
                    className={cn(
                      "block size-20 overflow-hidden rounded-full ring-3 ring-offset-2 ring-offset-card transition-transform group-hover:scale-105 md:size-24",
                      themeClasses[f.theme].ring,
                    )}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      width={200}
                      height={200}
                      className="size-full object-cover"
                    />
                  </span>
                  <span className="text-center text-xs font-bold leading-tight">{f.name}</span>
                  <span className="text-muted-foreground text-[11px]">
                    {f.categories} categories
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- FESTIVAL CARDS ---------------- */}
      <section className="section-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Festival Storefronts"
          icon={PartyPopper}
          title="Every celebration, fully stocked"
          subtitle="Each festival page bundles curated products, category counts and its measured demand lift."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.slice(0, 6).map((f, i) => (
            <Reveal key={f.id} delay={i * 70}>
              <FestivalCard festival={f} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/festivals">
              See all 12 festivals <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ---------------- POPULAR PRODUCTS ---------------- */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="🔥 Popular Products"
            icon={Gift}
            title="Trending festive picks this season"
            subtitle="Bestsellers across crackers, sweets, decor, lighting and gifting."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="festive" size="lg">
              <Link to="/products">
                Browse all products <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- FESTIVAL LIFT QUANTIFIER ---------------- */}
      <section className="section-shell py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="bg-analytics relative overflow-hidden rounded-3xl p-7 text-primary-foreground shadow-card md:p-10">
              <div className="bg-primary/40 animate-float absolute -top-16 -right-16 size-56 rounded-full blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase">
                <BarChart3 className="size-3.5" /> Hackathon Core Concept
              </span>
              <h2 className="font-display mt-4 text-3xl font-extrabold md:text-4xl">
                Festival Lift Quantifier
              </h2>
              <p className="mt-3 max-w-xl text-sm opacity-90 md:text-base">
                Measure how much customer demand increases during festival periods.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase opacity-75">Overall Festival Lift</p>
                  <p className="font-display text-6xl font-extrabold md:text-7xl">
                    +<CountUp to={totals.overallLift} />%
                  </p>
                </div>
                <div className="flex-1 space-y-3 min-w-56">
                  {liftByFestival.slice(0, 5).map((f) => (
                    <div key={f.slug}>
                      <div className="mb-1 flex justify-between text-xs font-semibold">
                        <span>{f.name}</span>
                        <span>+{f.lift}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/20">
                        <div
                          className="bg-sunrise h-full rounded-full transition-[width] duration-1000"
                          style={{ width: `${Math.min(f.lift, 150) / 1.5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                {[
                  { k: "Festival Sales", v: inr(totals.festivalSales) },
                  { k: "Normal Sales", v: inr(totals.normalSales) },
                  { k: "Additional Demand", v: inr(totals.additionalDemand) },
                  { k: "Top Product", v: totals.topProduct },
                  { k: "Top Region", v: totals.topRegion },
                  { k: "Formula", v: "((F − N) / N) × 100" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-3.5"
                  >
                    <dt className="text-[11px] font-semibold uppercase opacity-75">{s.k}</dt>
                    <dd className="font-display mt-1 text-base font-bold">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <Button asChild variant="glass" size="lg" className="mt-8">
                <Link to="/analytics">
                  View Analytics Dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Business insights */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="bg-card flex h-full flex-col rounded-3xl border border-border p-7 shadow-soft">
              <span className="bg-marigold/20 text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase">
                <Lightbulb className="text-primary size-3.5" /> Business Insights
              </span>
              <h2 className="font-display mt-4 text-2xl font-extrabold">
                What the data recommends
              </h2>
              <ul className="mt-5 space-y-3.5">
                {businessInsights.map((insight, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="bg-festive mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="gold" className="mt-auto self-start">
                <Link to="/business">
                  View Full Report <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MEGA FESTIVE SALE ---------------- */}
      <section className="section-shell pb-16 md:pb-20">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl shadow-card">
            <img
              src={saleImg}
              alt="Festive sale gift boxes with lights and sparklers"
              loading="lazy"
              width={1536}
              height={768}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="bg-festive absolute inset-0 opacity-75 mix-blend-multiply" />
            <div className="relative flex flex-col items-start gap-5 p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-bold uppercase">
                  <Gift className="size-3.5" /> Limited period
                </span>
                <h2 className="font-display mt-4 text-4xl font-extrabold md:text-5xl">
                  Mega Festive Sale!
                </h2>
                <p className="mt-2 text-base opacity-90 md:text-lg">
                  Up to 60% OFF on Selected Products
                </p>
              </div>
              <Button asChild variant="glass" size="lg">
                <Link to="/products">
                  Shop Now <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- WHY CHOOSE FESTIVA ---------------- */}
      <section className="section-shell pb-16 md:pb-20">
        <SectionHeading
          align="center"
          eyebrow="Why Festiva"
          icon={ShieldCheck}
          title="Built for shoppers and for businesses"
          subtitle="A festive shopping experience on the front, a demand intelligence engine at the back."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="card-lift bg-card h-full rounded-3xl border border-border p-6 text-center shadow-soft">
                <span className="bg-sunrise mx-auto grid size-12 place-items-center rounded-2xl">
                  <f.icon className="size-6 text-secondary-foreground" />
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{f.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- STATISTICS ---------------- */}
      <section className="section-shell pb-6">
        <div className="bg-festive rounded-3xl p-8 text-primary-foreground shadow-card md:p-12">
          <dl className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto size-7 opacity-90" />
                <dd className="font-display mt-3 text-4xl font-extrabold">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-sm font-semibold opacity-85">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- BUSINESS CTA ---------------- */}
      <section className="section-shell py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Building2,
              title: "Business Dashboard",
              text: "Track sales, orders, low stock and inventory recommendations across every festival.",
              to: "/business" as const,
              cta: "Open Dashboard",
            },
            {
              icon: BarChart3,
              title: "Power BI Analytics",
              text: "A dedicated embed-ready space for your Power BI festival lift report.",
              to: "/power-bi" as const,
              cta: "Open Power BI Page",
            },
          ].map((c) => (
            <Reveal key={c.title}>
              <div className="card-lift bg-card flex h-full flex-col rounded-3xl border border-border p-7 shadow-soft">
                <span className="bg-festive grid size-12 place-items-center rounded-2xl">
                  <c.icon className="size-6 text-primary-foreground" />
                </span>
                <h3 className="font-display mt-4 text-2xl font-extrabold">{c.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{c.text}</p>
                <Button asChild variant="outline" className="mt-6 self-start">
                  <Link to={c.to}>
                    {c.cta} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Highest lift right now:{" "}
          <strong className="text-foreground">
            {festivals[0]!.name} at +{festivalLift(festivals[0]!)}%
          </strong>{" "}
          — plan inventory before the peak.
        </p>
      </section>
    </>
  );
}
