import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid, TrendingUp } from "lucide-react";
import { festivalLift, themeClasses, type Festival } from "@/data/festivals";
import { cn } from "@/lib/utils";

export function FestivalCard({ festival }: { festival: Festival }) {
  const theme = themeClasses[festival.theme];

  return (
    <article className="card-lift group bg-card flex h-full flex-col overflow-hidden rounded-3xl border border-border shadow-soft">
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={festival.image}
          alt={`${festival.name} celebration`}
          loading="lazy"
          width={1024}
          height={640}
          className="img-zoom size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="bg-festive absolute top-3 left-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-primary-foreground">
          <TrendingUp className="size-3.5" /> +{festivalLift(festival)}% Lift
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">
          {festival.badge}
        </span>
        <div className="absolute bottom-3 left-4 text-primary-foreground">
          <h3 className="font-display text-2xl font-extrabold">{festival.name}</h3>
          <p className="text-xs font-medium opacity-90">{festival.tagline}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-muted-foreground line-clamp-3 text-sm">{festival.description}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className={cn("flex items-center gap-1 rounded-full px-2.5 py-1", theme.chip)}>
            <LayoutGrid className="size-3.5" /> {festival.categories} Categories
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1">
            {festival.month}
          </span>
        </div>
        <Link
          to="/festivals/$slug"
          params={{ slug: festival.slug }}
          className="text-primary mt-auto inline-flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all"
        >
          Explore Festival <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
