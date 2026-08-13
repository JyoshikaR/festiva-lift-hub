import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Send, Sparkles, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Shop",
    items: [
      { label: "All Products", to: "/products" },
      { label: "Festivals", to: "/festivals" },
      { label: "Categories", to: "/products" },
      { label: "Offers", to: "/products" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "My Orders", to: "/orders" },
      { label: "Wishlist", to: "/orders" },
      { label: "Profile", to: "/orders" },
      { label: "Cart", to: "/cart" },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "FAQs", to: "/orders" },
      { label: "Shipping Info", to: "/orders" },
      { label: "Returns", to: "/orders" },
      { label: "Contact Us", to: "/orders" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Analytics Dashboard", to: "/analytics" },
      { label: "Power BI Dashboard", to: "/power-bi" },
      { label: "Business Login", to: "/business" },
    ],
  },
] as const;

const socials = [Instagram, Facebook, Twitter, Youtube, Linkedin];

export function Footer() {
  return (
    <footer className="bg-night mt-20 text-primary-foreground">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="bg-festive grid size-10 place-items-center rounded-2xl">
              <Sparkles className="size-5" />
            </span>
            <span className="font-display text-2xl font-extrabold">Festiva</span>
          </div>
          <p className="mt-4 max-w-sm text-sm opacity-80">
            Your smart festival marketplace with powerful demand analytics. Shop every festival
            essential while businesses quantify festival lift and plan inventory.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Festiva social profile"
                className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/25"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-bold tracking-wide uppercase opacity-90">{col.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm opacity-80">
              {col.items.map((it) => (
                <li key={it.label}>
                  <Link to={it.to} className="transition-opacity hover:opacity-100 hover:underline">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="section-shell border-t border-primary-foreground/15 py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-bold">Subscribe for festive offers & insights</p>
            <p className="text-sm opacity-70">
              Festival lift reports and early sale access, once a month.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="rounded-full border-primary-foreground/25 bg-primary-foreground/10 placeholder:text-primary-foreground/60"
            />
            <Button type="submit" variant="festive" className="shrink-0">
              <Send className="size-4" /> Subscribe
            </Button>
          </form>
        </div>
        <p className="mt-8 text-xs opacity-60">
          © 2026 Festiva — Smart Festival Marketplace & Festival Lift Analytics. Prototype built for
          demonstration.
        </p>
      </div>
    </footer>
  );
}
