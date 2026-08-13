import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  Briefcase,
  Home,
  LogIn,
  Menu,
  PartyPopper,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/festivals", label: "Festivals", icon: PartyPopper },
  { to: "/products", label: "Products", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: Briefcase },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/business", label: "Business Dashboard", icon: BarChart3 },
] as const;

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/products", search: { q: term || undefined } });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center gap-4 md:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="bg-festive grid size-10 place-items-center rounded-2xl shadow-glow">
            <Sparkles className="size-5 text-primary-foreground" />
          </span>
          <span className="leading-none">
            <span className="text-festive font-display block text-xl font-extrabold md:text-2xl">
              Festiva
            </span>
            <span className="text-muted-foreground text-[10px] font-medium tracking-wide md:text-[11px]">
              Celebrate. Shop. Analyze.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/70 rounded-full px-3 py-2 text-sm font-semibold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 lg:block">
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products, festivals..."
              aria-label="Search products and festivals"
              className="bg-secondary/60 rounded-full border-transparent pl-9"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/cart"
            aria-label="Open cart"
            className="hover:bg-secondary relative grid size-10 place-items-center rounded-full transition-colors"
          >
            <ShoppingCart className="size-5" />
            <span
              className={cn(
                "bg-accent text-accent-foreground absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold",
                count === 0 && "hidden",
              )}
            >
              {count}
            </span>
          </Link>
          <Button variant="festive" size="sm" className="hidden sm:inline-flex">
            <LogIn className="size-4" /> Login
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="hover:bg-secondary grid size-10 place-items-center rounded-full xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-rise border-t border-border bg-background xl:hidden">
          <div className="section-shell space-y-3 py-4">
            <form onSubmit={submitSearch} className="relative">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search products, festivals..."
                className="bg-secondary/60 rounded-full border-transparent pl-9"
              />
            </form>
            <div className="grid gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="hover:bg-secondary flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold"
                >
                  <l.icon className="text-primary size-4" /> {l.label}
                </Link>
              ))}
            </div>
            <Button variant="festive" className="w-full">
              <LogIn className="size-4" /> Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
