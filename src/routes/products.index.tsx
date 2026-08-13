import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, Star } from "lucide-react";
import { categories, products } from "@/data/products";
import { festivals } from "@/data/festivals";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ProductSearch = { q?: string; festival?: string };

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    festival: typeof search.festival === "string" ? search.festival : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Festival Products — Festiva" },
      {
        name: "description",
        content:
          "Search and filter festival products by festival, category, price, rating and stock — crackers, diyas, sweets, decor, lighting and gifting.",
      },
      { property: "og:title", content: "All Festival Products — Festiva" },
      {
        property: "og:description",
        content: "Filterable catalogue of Indian festival essentials with festive pricing.",
      },
    ],
  }),
  component: ProductsPage,
});

const MAX_PRICE = 3000;

function ProductsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [festival, setFestival] = useState(search.festival ?? "all");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState("0");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");

  const results = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQ =
        !q ||
        `${p.name} ${p.festival} ${p.category}`.toLowerCase().includes(q.toLowerCase().trim());
      const matchesFestival = festival === "all" || p.festivalSlug === festival;
      const matchesCategory = category === "all" || p.category === category;
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= Number(minRating);
      const matchesStock = !inStockOnly || p.stock > 0;
      return (
        matchesQ && matchesFestival && matchesCategory && matchesPrice && matchesRating && matchesStock
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    return list;
  }, [q, festival, category, maxPrice, minRating, inStockOnly, sort]);

  function reset() {
    setQ("");
    setFestival("all");
    setCategory("all");
    setMaxPrice(MAX_PRICE);
    setMinRating("0");
    setInStockOnly(false);
    setSort("popular");
  }

  return (
    <div className="section-shell py-12 md:py-16">
      <SectionHeading
        eyebrow="Marketplace"
        icon={SlidersHorizontal}
        title="All festival products"
        subtitle="Filter the catalogue by festival, category, price, rating and stock availability."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="bg-card h-fit space-y-6 rounded-3xl border border-border p-6 shadow-soft lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-display flex items-center gap-2 text-lg font-bold">
              <Filter className="text-primary size-4" /> Filters
            </h2>
            <button onClick={reset} className="text-primary text-xs font-bold hover:underline">
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="pl-9"
              />
            </div>
          </div>

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
            <Label>Category</Label>
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

          <div className="space-y-3">
            <Label>Max price: ₹{maxPrice.toLocaleString("en-IN")}</Label>
            <Slider
              value={[maxPrice]}
              min={100}
              max={MAX_PRICE}
              step={50}
              onValueChange={(v) => setMaxPrice(v[0] ?? MAX_PRICE)}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum rating</Label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4.0 & above</SelectItem>
                <SelectItem value="4.5">4.5 & above</SelectItem>
                <SelectItem value="4.7">4.7 & above</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="stock">In stock only</Label>
            <Switch id="stock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground text-sm">
              Showing <strong className="text-foreground">{results.length}</strong> of{" "}
              {products.length} products
            </p>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Sort by</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-secondary/50 rounded-3xl p-12 text-center">
              <Star className="text-primary mx-auto size-8" />
              <p className="font-display mt-3 text-lg font-bold">No products match these filters</p>
              <Button variant="festive" className="mt-5" onClick={reset}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
