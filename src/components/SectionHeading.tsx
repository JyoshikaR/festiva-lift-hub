import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          className={`bg-secondary text-secondary-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {Icon && <Icon className="text-primary size-3.5" />} {eyebrow}
        </span>
      )}
      <h2 className="font-display mt-3 text-3xl font-extrabold md:text-4xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-3 text-base">{subtitle}</p>}
    </div>
  );
}
