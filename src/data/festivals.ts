/**
 * Mock festival data.
 * Shape mirrors a future `GET /api/festivals` response from Node/Express + MySQL,
 * so this module can be swapped for a fetch layer without touching the UI.
 */
import diwaliImg from "@/assets/fest-diwali.jpg";
import pongalImg from "@/assets/fest-pongal.jpg";
import christmasImg from "@/assets/fest-christmas.jpg";
import eidImg from "@/assets/fest-eid.jpg";
import dussehraImg from "@/assets/fest-dussehra.jpg";
import onamImg from "@/assets/fest-onam.jpg";
import rakhiImg from "@/assets/fest-rakhi.jpg";
import newyearImg from "@/assets/fest-newyear.jpg";
import holiImg from "@/assets/fest-holi.jpg";
import ganeshImg from "@/assets/fest-ganesh.jpg";
import navratriImg from "@/assets/fest-navratri.jpg";
import durgaImg from "@/assets/fest-durga.jpg";

export type Festival = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  month: string;
  categories: number;
  image: string;
  theme: "saffron" | "marigold" | "magenta" | "grape" | "indigo" | "leaf" | "teal" | "gold";
  badge: string;
  normalSales: number;
  festivalSales: number;
  regions: string[];
};

/** Festival Lift % = ((Festival Sales - Normal Sales) / Normal Sales) x 100 */
export function festivalLift(f: Pick<Festival, "normalSales" | "festivalSales">) {
  return Math.round(((f.festivalSales - f.normalSales) / f.normalSales) * 100);
}

export function additionalDemand(f: Pick<Festival, "normalSales" | "festivalSales">) {
  return f.festivalSales - f.normalSales;
}

export const festivals: Festival[] = [
  {
    id: 1,
    slug: "diwali",
    name: "Diwali",
    tagline: "Festival of Lights",
    description:
      "Crackers, sparklers, diyas, decorative lights and sweet hampers — the biggest demand peak of the Indian retail year.",
    month: "October – November",
    categories: 6,
    image: diwaliImg,
    theme: "saffron",
    badge: "Highest Demand",
    normalSales: 500000,
    festivalSales: 1200000,
    regions: ["Chennai", "Mumbai", "Delhi", "Bengaluru", "Hyderabad"],
  },
  {
    id: 2,
    slug: "pongal",
    name: "Pongal",
    tagline: "Tamil Harvest Festival",
    description:
      "Traditional pongal pots, sugarcane bundles, kolam kits and brass ware for the four-day Tamil harvest celebration.",
    month: "January",
    categories: 6,
    image: pongalImg,
    theme: "marigold",
    badge: "Regional Peak",
    normalSales: 200000,
    festivalSales: 350000,
    regions: ["Chennai", "Madurai", "Coimbatore", "Trichy"],
  },
  {
    id: 3,
    slug: "christmas",
    name: "Christmas",
    tagline: "Season of Giving",
    description:
      "Christmas trees, fairy lights, plum cakes, Santa decor and curated gift boxes for the year-end celebration.",
    month: "December",
    categories: 6,
    image: christmasImg,
    theme: "leaf",
    badge: "Global Favorite",
    normalSales: 150000,
    festivalSales: 225000,
    regions: ["Kochi", "Goa", "Mumbai", "Shillong"],
  },
  {
    id: 4,
    slug: "eid",
    name: "Eid",
    tagline: "Feast of Togetherness",
    description:
      "Gift hampers, premium dates, ornate lanterns and traditional sweets for Eid-ul-Fitr and Eid-ul-Adha.",
    month: "Varies (Lunar)",
    categories: 5,
    image: eidImg,
    theme: "indigo",
    badge: "Gifting Surge",
    normalSales: 180000,
    festivalSales: 306000,
    regions: ["Hyderabad", "Lucknow", "Delhi", "Kolkata"],
  },
  {
    id: 5,
    slug: "dussehra",
    name: "Dussehra",
    tagline: "Victory of Good",
    description:
      "Puja essentials, bow-and-arrow sets, garlands and traditional decor for Vijayadashami celebrations.",
    month: "September – October",
    categories: 5,
    image: dussehraImg,
    theme: "gold",
    badge: "Rising Demand",
    normalSales: 160000,
    festivalSales: 256000,
    regions: ["Mysuru", "Kolkata", "Delhi", "Ahmedabad"],
  },
  {
    id: 6,
    slug: "onam",
    name: "Onam",
    tagline: "Kerala Harvest Fest",
    description:
      "Pookalam flower kits, brass lamps, sadhya essentials and Kasavu textiles for Kerala's grandest festival.",
    month: "August – September",
    categories: 5,
    image: onamImg,
    theme: "teal",
    badge: "Regional Peak",
    normalSales: 140000,
    festivalSales: 231000,
    regions: ["Kochi", "Thrissur", "Trivandrum"],
  },
  {
    id: 7,
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    tagline: "Bond of Siblings",
    description:
      "Designer rakhis, sweet boxes, gift combos and pooja thalis for the sibling-bond celebration.",
    month: "August",
    categories: 5,
    image: rakhiImg,
    theme: "magenta",
    badge: "Gifting Surge",
    normalSales: 120000,
    festivalSales: 216000,
    regions: ["Delhi", "Jaipur", "Mumbai", "Pune"],
  },
  {
    id: 8,
    slug: "new-year",
    name: "New Year",
    tagline: "Fresh Beginnings",
    description:
      "Party decor, fireworks, celebration packs and gifting for the New Year countdown.",
    month: "December – January",
    categories: 4,
    image: newyearImg,
    theme: "grape",
    badge: "Global Favorite",
    normalSales: 130000,
    festivalSales: 208000,
    regions: ["Mumbai", "Goa", "Bengaluru", "Delhi"],
  },
  {
    id: 9,
    slug: "holi",
    name: "Holi",
    tagline: "Festival of Colours",
    description:
      "Organic gulal, pichkaris, water balloons and thandai gift packs for the colour festival.",
    month: "March",
    categories: 5,
    image: holiImg,
    theme: "magenta",
    badge: "High Demand",
    normalSales: 120000,
    festivalSales: 240000,
    regions: ["Mathura", "Delhi", "Jaipur", "Indore"],
  },
  {
    id: 10,
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    tagline: "Vinayaka Utsav",
    description:
      "Eco-friendly Ganesha idols, flower decoration kits, modak moulds and complete puja kits.",
    month: "August – September",
    categories: 5,
    image: ganeshImg,
    theme: "saffron",
    badge: "Regional Peak",
    normalSales: 180000,
    festivalSales: 315000,
    regions: ["Mumbai", "Pune", "Hyderabad", "Nagpur"],
  },
  {
    id: 11,
    slug: "navratri",
    name: "Navratri",
    tagline: "Nine Nights of Dance",
    description:
      "Dandiya sticks, garba wear accessories, jewellery and decor for nine nights of celebration.",
    month: "September – October",
    categories: 5,
    image: navratriImg,
    theme: "grape",
    badge: "Rising Demand",
    normalSales: 150000,
    festivalSales: 262500,
    regions: ["Ahmedabad", "Surat", "Vadodara", "Mumbai"],
  },
  {
    id: 12,
    slug: "durga-puja",
    name: "Durga Puja",
    tagline: "Bengal's Grand Utsav",
    description:
      "Pandal decor, puja essentials, dhak accessories and gifting for Bengal's biggest festival.",
    month: "October",
    categories: 5,
    image: durgaImg,
    theme: "magenta",
    badge: "Highest Demand",
    normalSales: 170000,
    festivalSales: 289000,
    regions: ["Kolkata", "Howrah", "Siliguri", "Guwahati"],
  },
];

export const themeClasses: Record<
  Festival["theme"],
  { chip: string; ring: string; bar: string }
> = {
  saffron: { chip: "bg-saffron/15 text-saffron", ring: "ring-saffron/40", bar: "bg-saffron" },
  marigold: { chip: "bg-marigold/20 text-marigold", ring: "ring-marigold/40", bar: "bg-marigold" },
  magenta: { chip: "bg-magenta/15 text-magenta", ring: "ring-magenta/40", bar: "bg-magenta" },
  grape: { chip: "bg-grape/15 text-grape", ring: "ring-grape/40", bar: "bg-grape" },
  indigo: {
    chip: "bg-indigo-deep/15 text-indigo-deep",
    ring: "ring-indigo-deep/40",
    bar: "bg-indigo-deep",
  },
  leaf: { chip: "bg-leaf/15 text-leaf", ring: "ring-leaf/40", bar: "bg-leaf" },
  teal: { chip: "bg-teal-fest/15 text-teal-fest", ring: "ring-teal-fest/40", bar: "bg-teal-fest" },
  gold: { chip: "bg-gold/20 text-gold", ring: "ring-gold/40", bar: "bg-gold" },
};

export function getFestival(slug: string) {
  return festivals.find((f) => f.slug === slug);
}

/** Formats paise-free rupee amounts in the Indian numbering system. */
export function inr(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}
