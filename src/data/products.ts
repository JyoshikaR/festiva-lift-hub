/**
 * Mock product catalogue. Replace `products` with an API fetch later
 * (e.g. GET /api/products?festival=diwali) — the exported helpers stay the same.
 */
import crackers from "@/assets/p-crackers.jpg";
import diyas from "@/assets/p-diyas.jpg";
import sweets from "@/assets/p-sweets.jpg";
import lights from "@/assets/p-lights.jpg";
import pongalPot from "@/assets/p-pongalpot.jpg";
import sugarcane from "@/assets/p-sugarcane.jpg";
import eidHamper from "@/assets/p-eidhamper.jpg";
import holiColors from "@/assets/p-holicolors.jpg";
import diwaliImg from "@/assets/fest-diwali.jpg";
import pongalImg from "@/assets/fest-pongal.jpg";
import christmasImg from "@/assets/fest-christmas.jpg";
import eidImg from "@/assets/fest-eid.jpg";
import holiImg from "@/assets/fest-holi.jpg";
import ganeshImg from "@/assets/fest-ganesh.jpg";
import rakhiImg from "@/assets/fest-rakhi.jpg";
import onamImg from "@/assets/fest-onam.jpg";

export type Product = {
  id: number;
  name: string;
  festivalSlug: string;
  festival: string;
  category: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
};

const p = (
  id: number,
  name: string,
  festivalSlug: string,
  festival: string,
  category: string,
  mrp: number,
  price: number,
  rating: number,
  reviews: number,
  stock: number,
  image: string,
  description: string,
): Product => ({
  id,
  name,
  festivalSlug,
  festival,
  category,
  mrp,
  price,
  rating,
  reviews,
  stock,
  image,
  description,
});

export const products: Product[] = [
  // ---------- Diwali ----------
  p(1, "Sky Shot Crackers Pack", "diwali", "Diwali", "Crackers", 899, 599, 4.6, 1284, 140, crackers, "A 10-piece sky shot pack with multi-colour aerial bursts. ISI-approved, low-noise formulation and safety instructions printed in 4 languages."),
  p(2, "Flower Pots (Set of 12)", "diwali", "Diwali", "Crackers", 499, 349, 4.4, 872, 96, crackers, "Classic ground fountains producing 3-4 ft golden sparks. Child-friendly with a longer, stable burn."),
  p(3, "Electric Sparklers (Box of 50)", "diwali", "Diwali", "Crackers", 399, 249, 4.7, 2140, 320, crackers, "Smokeless 30 cm sparklers with a bright silver flame — the safest cracker for kids under supervision."),
  p(4, "Hand-Painted Clay Diyas (Set of 24)", "diwali", "Diwali", "Decor", 649, 399, 4.8, 1620, 210, diyas, "Terracotta diyas hand-painted by Kumbharwada artisans, supplied with cotton wicks."),
  p(5, "Decorative LED String Lights 15m", "diwali", "Diwali", "Lighting", 899, 549, 4.5, 3310, 180, lights, "15 m warm-white copper wire lights with 8 flicker modes and a remote. Indoor and balcony safe."),
  p(6, "Assorted Sweets Box (1 kg)", "diwali", "Diwali", "Sweets", 1299, 949, 4.6, 980, 65, sweets, "Kaju katli, motichoor laddoo, soan papdi and dry-fruit barfi in a premium gifting box."),

  // ---------- Pongal ----------
  p(7, "Traditional Pongal Pot", "pongal", "Pongal", "Puja Items", 799, 549, 4.7, 540, 88, pongalPot, "Hand-painted earthen pot with turmeric tie, sized for a 2 kg pongal preparation."),
  p(8, "Fresh Sugarcane Bundle (5 pcs)", "pongal", "Pongal", "Fresh Produce", 450, 299, 4.3, 310, 120, sugarcane, "Farm-fresh tender sugarcane stalks sourced from Erode, delivered within 24 hours."),
  p(9, "Kolam Decoration Kit", "pongal", "Pongal", "Decor", 599, 379, 4.5, 420, 140, pongalImg, "Kolam powder in 6 shades, 4 stencil rollers and a dotted-grid guide booklet."),
  p(10, "Traditional Brass Pot", "pongal", "Pongal", "Puja Items", 2499, 1799, 4.8, 190, 24, pongalPot, "Hand-beaten brass paanai with an engraved rim — a heirloom-grade harvest vessel."),
  p(11, "Pongal Gift Box", "pongal", "Pongal", "Gifting", 1199, 849, 4.6, 260, 70, pongalImg, "Jaggery, raw rice, moong dal, ghee, cashews and cardamom packed for gifting."),

  // ---------- Christmas ----------
  p(12, "Christmas Gift Box (Premium)", "christmas", "Christmas", "Gifting", 1899, 1299, 4.7, 610, 82, christmasImg, "Curated hamper with cookies, hot chocolate, candles and a hand-written card."),
  p(13, "Decorative Fairy Lights 20m", "christmas", "Christmas", "Lighting", 999, 649, 4.6, 1450, 160, lights, "20 m multi-colour LED string with a timer function for trees and windows."),
  p(14, "Christmas Tree 6ft", "christmas", "Christmas", "Decor", 4499, 2999, 4.5, 320, 30, christmasImg, "Realistic 6 ft pine with 900 tips, metal stand and a 3-year replacement warranty."),
  p(15, "Rich Plum Cake (1 kg)", "christmas", "Christmas", "Sweets", 1099, 799, 4.8, 720, 54, sweets, "Slow-baked plum cake with rum-soaked fruit, made fresh to order."),
  p(16, "Santa Decoration Set", "christmas", "Christmas", "Decor", 799, 499, 4.4, 280, 95, christmasImg, "Wall-mount Santa, stockings and door wreath in a coordinated red-gold finish."),

  // ---------- Eid ----------
  p(17, "Eid Gift Hamper Deluxe", "eid", "Eid", "Gifting", 2499, 1749, 4.8, 430, 60, eidHamper, "Medjool dates, baklava, dry fruits, an ornate lantern and attar in a keepsake box."),
  p(18, "Premium Dates Box (750g)", "eid", "Eid", "Sweets", 1199, 849, 4.7, 690, 110, eidHamper, "Grade-A Ajwa and Medjool dates, vacuum-sealed for freshness."),
  p(19, "Decorative Metal Lantern", "eid", "Eid", "Decor", 1499, 999, 4.6, 350, 75, eidImg, "Laser-cut brass-finish lantern casting Moroccan patterns across the room."),
  p(20, "Traditional Eid Sweets (1 kg)", "eid", "Eid", "Sweets", 1099, 779, 4.5, 410, 68, sweets, "Sheer khurma mix, gulab jamun and pista barfi prepared in small batches."),

  // ---------- Holi ----------
  p(21, "Organic Holi Colours (Set of 6)", "holi", "Holi", "Colours", 599, 349, 4.7, 1580, 240, holiColors, "Herbal gulal from flower and vegetable extracts — skin-safe and easy to wash off."),
  p(22, "Water Balloons (Pack of 500)", "holi", "Holi", "Play", 299, 179, 4.2, 940, 300, holiImg, "Biodegradable latex balloons with a quick-fill nozzle attachment."),
  p(23, "Holi Gift Pack with Pichkari", "holi", "Holi", "Gifting", 899, 599, 4.5, 520, 130, holiImg, "Pressure pichkari, 4 gulal pouches, thandai mix and a colour-proof face cream."),

  // ---------- Ganesh Chaturthi ----------
  p(24, "Eco-friendly Ganesha Idol 12in", "ganesh-chaturthi", "Ganesh Chaturthi", "Idols", 2299, 1599, 4.9, 760, 45, ganeshImg, "Natural clay idol with water-soluble colours that dissolves fully during visarjan."),
  p(25, "Flower Decoration Kit", "ganesh-chaturthi", "Ganesh Chaturthi", "Decor", 1299, 899, 4.6, 380, 88, ganeshImg, "Marigold garlands, mango leaves, banana stems and floral backdrop hooks."),
  p(26, "Complete Puja Kit", "ganesh-chaturthi", "Ganesh Chaturthi", "Puja Items", 999, 699, 4.7, 640, 120, ganeshImg, "27 puja items including camphor, agarbatti, kumkum, panchamrit and modak mould."),

  // ---------- Others ----------
  p(27, "Designer Rakhi Set (Pack of 4)", "raksha-bandhan", "Raksha Bandhan", "Gifting", 699, 449, 4.6, 810, 190, rakhiImg, "Kundan and evil-eye rakhis with roli-chawal and a sweets pouch."),
  p(28, "Pookalam Flower Kit", "onam", "Onam", "Decor", 1099, 749, 4.5, 240, 70, onamImg, "Fresh graded petals in 8 shades with a circular layout guide for a 5 ft pookalam."),
];

export const categories = Array.from(new Set(products.map((x) => x.category))).sort();

export function discountPercent(product: Pick<Product, "mrp" | "price">) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

export function stockStatus(stock: number) {
  if (stock === 0) return { label: "Out of Stock", tone: "out" as const };
  if (stock < 50) return { label: `Only ${stock} left`, tone: "low" as const };
  return { label: "In Stock", tone: "in" as const };
}

export function getProduct(id: number) {
  return products.find((x) => x.id === id);
}

export function productsByFestival(slug: string) {
  return products.filter((x) => x.festivalSlug === slug);
}

export const popularProductIds = [1, 4, 5, 6, 7, 8, 12, 17, 21, 24, 15, 27];
