import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  LineChart,
  MapPin,
  PieChart,
  Plug,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/power-bi")({
  head: () => ({
    meta: [
      { title: "Power BI Festival Analytics — Festiva" },
      {
        name: "description",
        content:
          "Embed-ready Power BI workspace for Festiva: festival lift, sales trends, product demand, regional analysis, forecast and inventory recommendation.",
      },
      { property: "og:title", content: "Power BI Festival Analytics — Festiva" },
      {
        property: "og:description",
        content: "Reserved layout for an embedded Power BI festival lift report.",
      },
    ],
  }),
  component: PowerBiPage,
});

const panels = [
  {
    icon: TrendingUp,
    title: "Festival Lift",
    text: "Lift % by festival with drill-through to category and SKU level.",
    span: "lg:col-span-2",
    height: "h-72",
  },
  {
    icon: LineChart,
    title: "Sales Trends",
    text: "Monthly and weekly revenue against baseline periods.",
    span: "",
    height: "h-72",
  },
  {
    icon: BarChart3,
    title: "Product Demand",
    text: "Units and revenue per category during festival windows.",
    span: "",
    height: "h-60",
  },
  {
    icon: MapPin,
    title: "Regional Analysis",
    text: "City-level demand map with festive share of revenue.",
    span: "",
    height: "h-60",
  },
  {
    icon: PieChart,
    title: "Forecast",
    text: "Next-cycle demand projection per festival and category.",
    span: "",
    height: "h-60",
  },
  {
    icon: Boxes,
    title: "Inventory Recommendation",
    text: "Reorder quantities generated from lift and stock cover.",
    span: "lg:col-span-3",
    height: "h-56",
  },
];

function PowerBiPage() {
  return (
    <div className="section-shell py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading
          eyebrow="Reporting Workspace"
          icon={BarChart3}
          title="Power BI Festival Analytics"
          subtitle="This page is reserved for the embedded Power BI report. Panels below mirror the report pages that will be published from the Festiva dataset."
        />
        <div className="flex gap-3">
          <Button asChild variant="festive">
            <Link to="/analytics">In-app Analytics</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/business">Business Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="bg-analytics mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 text-primary-foreground shadow-card">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Plug className="size-4" /> Power BI Report will be embedded here
        </p>
        <p className="text-xs opacity-85">
          Connection status: not connected · dataset: festiva_sales (MySQL, planned)
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {panels.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className={p.span}>
            <div className="bg-card h-full rounded-3xl border border-border p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="bg-sunrise grid size-10 place-items-center rounded-2xl">
                  <p.icon className="size-5 text-secondary-foreground" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="text-muted-foreground text-xs">{p.text}</p>
                </div>
              </div>
              <div
                className={`bg-secondary/50 mt-5 grid ${p.height} place-items-center rounded-2xl border border-dashed border-border`}
              >
                <div className="text-center">
                  <BarChart3 className="text-muted-foreground mx-auto size-7" />
                  <p className="text-muted-foreground mt-2 text-xs font-bold uppercase">
                    Power BI visual placeholder
                  </p>
                  <p className="text-muted-foreground/80 mt-1 text-[11px]">
                    Report page: {p.title}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="bg-card mt-8 rounded-3xl border border-border p-6 shadow-soft md:p-8">
        <h2 className="font-display text-xl font-bold">Planned data pipeline</h2>
        <ol className="text-muted-foreground mt-4 grid gap-3 text-sm md:grid-cols-4">
          {[
            "Festiva frontend (this prototype)",
            "Node.js + Express REST API",
            "MySQL sales & inventory tables",
            "Power BI dataset + embedded report",
          ].map((step, i) => (
            <li key={step} className="bg-secondary/50 rounded-2xl p-4">
              <span className="bg-festive mb-2 grid size-6 place-items-center rounded-full text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
