import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { discountPercent, stockStatus, type Product } from "@/data/products";
import { inr } from "@/data/festivals";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const stock = stockStatus(product.stock);
  const off = discountPercent(product);

  return (
    <article className="card-lift group bg-card flex h-full flex-col overflow-hidden rounded-3xl border border-border shadow-soft">
      <Link
        to="/products/$id"
        params={{ id: String(product.id) }}
        className="relative block aspect-4/3 overflow-hidden bg-secondary/50"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="img-zoom size-full object-cover"
        />
        <span className="bg-festive absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
          {off}% OFF
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-primary text-[11px] font-bold tracking-wide uppercase">
          {product.festival} · {product.category}
        </span>
        <Link
          to="/products/$id"
          params={{ id: String(product.id) }}
          className="font-display line-clamp-2 text-base font-bold hover:underline"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-leaf/15 text-leaf flex items-center gap-1 rounded-full px-2 py-0.5 font-bold">
            <Star className="size-3 fill-current" /> {product.rating}
          </span>
          <span className="text-muted-foreground">({product.reviews.toLocaleString("en-IN")})</span>
          <span
            className={cn(
              "ml-auto font-semibold",
              stock.tone === "in" && "text-leaf",
              stock.tone === "low" && "text-primary",
              stock.tone === "out" && "text-destructive",
            )}
          >
            {stock.label}
          </span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold">{inr(product.price)}</span>
          <span className="text-muted-foreground text-sm line-through">{inr(product.mrp)}</span>
        </div>

        <Button
          variant="festive"
          className="mt-auto w-full"
          disabled={product.stock === 0}
          onClick={() => {
            add(product.id);
            toast.success(`${product.name} added to cart`);
          }}
        >
          <ShoppingCart className="size-4" /> Add to Cart
        </Button>
      </div>
    </article>
  );
}
