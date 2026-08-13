import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BarChart3,
  IndianRupee,
  MapPin,
  Package,
  TrendingUp,
} from "lucide-react";
import { festivals, festivalLift, inr } from "@/data/festivals";
import {
  forecast,
  liftByFestival,
  monthlyTrend,
  productDemand,
  regions,
  totals,
  years,
} from "@/data/analytics";
import { categories } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp, Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Festival Lift Analytics — Festiva" },
      {
        name: "description",
        content:
          "Festival Lift measures how much product demand increases during a festival versus normal periods. Explore KPIs, charts and forecasts.",
      },
      { property: "og:title", content: "Festival Lift Analytics — Festiva" },
      {
        property: "og:description",
        content: "KPI cards, festival vs normal sales, regional demand and demand forecast.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-3xl border border-border p-5 shadow-soft md:p-6">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {subtitle && <p className="text-muted-foreground mt-1 text-xs">{subtitle}</p>}
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children as never}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const [festival, setFestival] = useState("all");
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("2026");
  const [from, setFrom] = useState("2026-01-01");
  const [to, setTo] = useState("2026-12-31");

  /** KPI block recomputes from the selected festival using the lift formula. */
  const kpi = useMemo(() => {
    if (festival === "all") return totals;
    const f = festivals.find((x) => x.slug === festival)!;
    return {
      festivalSales: f.festivalSales,
      normalSales: f.normalSales,
      additionalDemand: f.festivalSales - f.normalSales,
      overallLift: festivalLift(f),
      topProduct: totals.topProduct,
      topRegion: f.regions[0] ?? totals.topRegion,
    };
  }, [festival]);

  const comparison = useMemo(
    () =>
      (festival === "all" ? festivals : festivals.filter((f) => f.slug === festival)).map((f) => ({
        name: f.name,
        Festival: f.festivalSales,
        Normal: f.normalSales,
      })),
    [festival],
  );

  const kpiCards = [
    { icon: TrendingUp, label: "Festival Lift %", value: `+${kpi.overallLift}%` },
    { icon: IndianRupee, label: "Festival Sales", value: inr(kpi.festivalSales) },
    { icon: Activity, label: "Normal Sales", value: inr(kpi.normalSales) },
    { icon: BarChart3, label: "Additional Demand", value: inr(kpi.additionalDemand) },
    { icon: Package, label: "Top Product", value: kpi.topProduct },
    { icon: MapPin, label: "Top Region", value: kpi.topRegion },
  ];

  return (
    <div className="section-shell py-12 md:py-16">
      <SectionHeading
        eyebrow="Festival Lift Quantifier"
        icon={BarChart3}
        title="Festival Lift Analytics"
        subtitle="Festival Lift measures how much product demand increases during a festival compared with normal periods. Formula: ((Festival Sales − Normal Sales) / Normal Sales) × 100."
      />

      {/* Filters */}
      <div className="bg-card mt-8 grid gap-4 rounded-3xl border border-border p-5 shadow-soft md:grid-cols-3 xl:grid-cols-5">
        <div className="space-y-2">
          <Label>Festival</Label>
          <Select value={festival} onValueChange={setFestival}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All festivals</SelectItem>
              {festivals.map((f) => (
                <SelectItem key={f.slug} value={f.slug}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r.name} value={r.name}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Product Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date range</Label>
          <div className="flex gap-2">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map((k, i) => (
          <Reveal key={k.label} delay={i * 40}>
            <div className="bg-card h-full rounded-3xl border border-border p-5 shadow-soft">
              <k.icon className="text-primary size-5" />
              <p className="text-muted-foreground mt-3 text-[11px] font-bold uppercase">{k.label}</p>
              <p className="font-display mt-1 text-xl font-extrabold">{k.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="bg-analytics mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-7 text-primary-foreground shadow-card">
        <div>
          <p className="text-xs font-bold uppercase opacity-80">
            {festival === "all" ? "Overall" : festivals.find((f) => f.slug === festival)?.name}{" "}
            festival lift
          </p>
          <p className="font-display text-5xl font-extrabold">
            +<CountUp to={kpi.overallLift} />%
          </p>
        </div>
        <p className="max-w-md text-sm opacity-90">
          Additional demand of {inr(kpi.additionalDemand)} generated during the festival window
          compared with an equivalent normal period.
        </p>
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Festival vs Normal Sales" subtitle="Revenue in ₹ per festival window">
          <BarChart data={comparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} height={50} dy={10} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 100000}L`} />
            <Tooltip formatter={(v: number) => inr(v)} />
            <Legend />
            <Bar dataKey="Normal" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Festival" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Festival Lift by Festival" subtitle="Lift % over normal-period demand">
          <BarChart data={liftByFestival} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="lift" radius={[0, 6, 6, 0]}>
              {liftByFestival.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <ChartCard title="Product Demand" subtitle="Units sold: festival window vs normal">
          <BarChart data={productDemand}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="normal" name="Normal" fill="var(--chart-5)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="festival" name="Festival" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Regional Demand" subtitle="Share of festive revenue by city">
          <PieChart>
            <Pie
              data={regions}
              dataKey="demand"
              nameKey="name"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
            >
              {regions.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Legend />
          </PieChart>
        </ChartCard>

        <ChartCard title="Monthly Sales Trend" subtitle="Festive months spike well above baseline">
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 100000}L`} />
            <Tooltip formatter={(v: number) => inr(v)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              name="Actual sales"
              stroke="var(--chart-1)"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="normal"
              name="Baseline"
              stroke="var(--chart-3)"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ChartCard>

        <ChartCard title="Demand Forecast" subtitle="Projected quarterly demand vs last cycle">
          <BarChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="period" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 100000}L`} />
            <Tooltip formatter={(v: number) => inr(v)} />
            <Legend />
            <Bar dataKey="actual" name="Actual" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="forecast" name="Forecast" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>

      {/* Festival-wise comparison table */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Festival-wise comparison</h2>
        <div className="mt-5 overflow-x-auto rounded-3xl border border-border shadow-soft">
          <table className="w-full min-w-3xl text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr>
                {["Festival", "Normal Sales", "Festival Sales", "Additional Demand", "Lift %"].map(
                  (h) => (
                    <th key={h} className="px-5 py-3.5 font-bold">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {liftByFestival.map((f) => (
                <tr key={f.slug} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-3.5 font-semibold">
                    <Link
                      to="/festivals/$slug"
                      params={{ slug: f.slug }}
                      className="hover:text-primary hover:underline"
                    >
                      {f.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">{inr(f.normalSales)}</td>
                  <td className="px-5 py-3.5">{inr(f.festivalSales)}</td>
                  <td className="px-5 py-3.5">{inr(f.festivalSales - f.normalSales)}</td>
                  <td className="px-5 py-3.5">
                    <span className="bg-festive rounded-full px-2.5 py-1 text-xs font-bold text-primary-foreground">
                      +{f.lift}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="bg-secondary/50 mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <p className="text-sm font-semibold">
          Need the operational view with inventory recommendations?
        </p>
        <div className="flex gap-3">
          <Button asChild variant="festive">
            <Link to="/business">Business Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/power-bi">Power BI Analytics</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
