import { createFileRoute } from "@tanstack/react-router";
import { PartyPopper } from "lucide-react";
import { festivals } from "@/data/festivals";
import { FestivalCard } from "@/components/FestivalCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/festivals/")({
  head: () => ({
    meta: [
      { title: "All Festivals — Festiva Marketplace" },
      {
        name: "description",
        content:
          "Browse 12 festival storefronts on Festiva — Diwali, Pongal, Christmas, Eid, Holi, Onam, Navratri and more, each with measured demand lift.",
      },
      { property: "og:title", content: "All Festivals — Festiva" },
      {
        property: "og:description",
        content: "Festival storefronts with curated products and Festival Lift percentages.",
      },
    ],
  }),
  component: FestivalsPage,
});

function FestivalsPage() {
  return (
    <div className="section-shell py-12 md:py-16">
      <SectionHeading
        eyebrow="12 Festivals"
        icon={PartyPopper}
        title="Festival storefronts"
        subtitle="Pick a celebration to see its curated catalogue, category count and measured demand lift versus normal periods."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((f, i) => (
          <Reveal key={f.id} delay={i * 50}>
            <FestivalCard festival={f} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
