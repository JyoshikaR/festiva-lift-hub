import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import { toast } from "sonner";
import { discountPercent, getProduct, products, stockStatus } from "@/data/products";
import { inr } from "@/data/festivals";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Festiva" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const title = `${p.name} — ${p.festival} | Festiva`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const stock = stockStatus(product.stock);
  const related = products
    .filter((p) => p.id !== product.id && p.festivalSlug === product.festivalSlug)
    .slice(0, 4);

  return (
    <div className="section-shell py-10 md:py-14">
      <Link
        to="/products"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
      >
        <ArrowLeft className="size-4" /> Back to products
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="bg-secondary/40 overflow-hidden rounded-3xl border border-border">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link
              to="/festivals/$slug"
              params={{ slug: product.festivalSlug }}
              className="bg-festive rounded-full px-3 py-1 text-primary-foreground"
            >
              {product.festival}
            </Link>
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
              {product.category}
            </span>
          </div>

          <h1 className="font-display mt-4 text-3xl font-extrabold md:text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="bg-leaf/15 text-leaf flex items-center gap-1 rounded-full px-2.5 py-1 font-bold">
              <Star className="size-3.5 fill-current" /> {product.rating}
            </span>
            <span className="text-muted-foreground">
              {product.reviews.toLocaleString("en-IN")} reviews
            </span>
            <span
              className={cn(
                "font-bold",
                stock.tone === "in" && "text-leaf",
                stock.tone === "low" && "text-primary",
                stock.tone === "out" && "text-destructive",
              )}
            >
              {stock.label}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold">{inr(product.price)}</span>
            <span className="text-muted-foreground text-lg line-through">{inr(product.mrp)}</span>
            <span className="bg-festive rounded-full px-3 py-1 text-sm font-bold text-primary-foreground">
              {discountPercent(product)}% OFF
            </span>
          </div>

          <p className="text-muted-foreground mt-5 text-sm leading-relaxed md:text-base">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="hover:bg-secondary grid size-9 place-items-center rounded-full"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="hover:bg-secondary grid size-9 place-items-center rounded-full"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              variant="festive"
              size="lg"
              onClick={() => {
                add(product.id, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              <ShoppingCart className="size-4" /> Add to Cart
            </Button>
            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                add(product.id, qty);
                navigate({ to: "/checkout" });
              }}
            >
              <Zap className="size-4" /> Buy Now
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Delivery in 2-4 days" },
              { icon: ShieldCheck, label: "Quality assured" },
              { icon: Star, label: "Top-rated seller" },
            ].map((b) => (
              <li
                key={b.label}
                className="bg-secondary/50 flex items-center gap-2 rounded-2xl p-3 text-xs font-semibold"
              >
                <b.icon className="text-primary size-4" /> {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold">Related {product.festival} products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
