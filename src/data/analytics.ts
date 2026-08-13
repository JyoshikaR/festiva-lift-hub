/**
 * Festival Lift analytics mock data: sales, regions, customers and orders.
 * Every number here would come from MySQL aggregates / a Power BI dataset later.
 */
import { festivals, festivalLift } from "./festivals";

export const regions = [
  { name: "Chennai", demand: 24, sales: 2880000 },
  { name: "Mumbai", demand: 21, sales: 2520000 },
  { name: "Delhi", demand: 18, sales: 2160000 },
  { name: "Bengaluru", demand: 14, sales: 1680000 },
  { name: "Hyderabad", demand: 12, sales: 1440000 },
  { name: "Kolkata", demand: 11, sales: 1320000 },
];

export const productDemand = [
  { name: "Crackers", festival: 4200, normal: 900 },
  { name: "Sweets", festival: 3600, normal: 1400 },
  { name: "Lighting", festival: 3100, normal: 1100 },
  { name: "Decor", festival: 2700, normal: 1200 },
  { name: "Gifting", festival: 2500, normal: 800 },
  { name: "Puja Items", festival: 1900, normal: 700 },
];

export const monthlyTrend = [
  { month: "Jan", sales: 620000, normal: 380000 },
  { month: "Feb", sales: 340000, normal: 330000 },
  { month: "Mar", sales: 540000, normal: 350000 },
  { month: "Apr", sales: 360000, normal: 340000 },
  { month: "May", sales: 330000, normal: 320000 },
  { month: "Jun", sales: 310000, normal: 300000 },
  { month: "Jul", sales: 350000, normal: 330000 },
  { month: "Aug", sales: 690000, normal: 360000 },
  { month: "Sep", sales: 780000, normal: 380000 },
  { month: "Oct", sales: 1480000, normal: 420000 },
  { month: "Nov", sales: 1120000, normal: 410000 },
  { month: "Dec", sales: 860000, normal: 390000 },
];

export const forecast = [
  { period: "Q1 2027", actual: 1500000, forecast: 1720000 },
  { period: "Q2 2027", actual: 1000000, forecast: 1180000 },
  { period: "Q3 2027", actual: 1820000, forecast: 2150000 },
  { period: "Q4 2027", actual: 3460000, forecast: 4180000 },
];

export const years = ["2024", "2025", "2026"];

export const liftByFestival = festivals
  .map((f) => ({
    name: f.name,
    slug: f.slug,
    lift: festivalLift(f),
    festivalSales: f.festivalSales,
    normalSales: f.normalSales,
  }))
  .sort((a, b) => b.lift - a.lift);

export const totals = (() => {
  const festivalSales = festivals.reduce((s, f) => s + f.festivalSales, 0);
  const normalSales = festivals.reduce((s, f) => s + f.normalSales, 0);
  return {
    festivalSales,
    normalSales,
    additionalDemand: festivalSales - normalSales,
    overallLift: Math.round(((festivalSales - normalSales) / normalSales) * 100),
    topProduct: "Sky Shot Crackers",
    topRegion: "Chennai",
  };
})();

export const businessInsights = [
  "Diwali has the highest festival lift at 140% — plan inventory 6 weeks ahead.",
  "Crackers are the highest-demand category during Diwali (4,200 units vs 900 normal).",
  "Chennai shows the highest regional demand at 24% of total festive revenue.",
  "Businesses should increase inventory before the festival period begins.",
  "Festival demand is 88% higher than normal-period demand across all festivals.",
];

export const topProducts = [
  { name: "Sky Shot Crackers Pack", units: 4200, revenue: 2515800 },
  { name: "Hand-Painted Clay Diyas", units: 3100, revenue: 1236900 },
  { name: "Decorative LED String Lights", units: 2800, revenue: 1537200 },
  { name: "Assorted Sweets Box", units: 2200, revenue: 2087800 },
  { name: "Eco-friendly Ganesha Idol", units: 1400, revenue: 2238600 },
];

export const lowStock = [
  { name: "Traditional Brass Pot", stock: 24, reorder: 120 },
  { name: "Christmas Tree 6ft", stock: 30, reorder: 100 },
  { name: "Eco-friendly Ganesha Idol", stock: 45, reorder: 250 },
  { name: "Rich Plum Cake 1kg", stock: 54, reorder: 200 },
  { name: "Assorted Sweets Box", stock: 65, reorder: 400 },
];

export const customers = [
  { id: "C-1041", name: "Aarthi Ramesh", city: "Chennai", orders: 14, spend: 42800 },
  { id: "C-1088", name: "Rohit Sharma", city: "Mumbai", orders: 9, spend: 31500 },
  { id: "C-1123", name: "Neha Verma", city: "Delhi", orders: 12, spend: 38900 },
  { id: "C-1190", name: "Anil Kumar", city: "Hyderabad", orders: 7, spend: 21400 },
];

export const orders = [
  {
    id: "FSTV-20261015-4821",
    date: "15 Oct 2026",
    festival: "Diwali",
    items: 5,
    total: 3446,
    status: "Delivered",
    city: "Chennai",
  },
  {
    id: "FSTV-20260828-3310",
    date: "28 Aug 2026",
    festival: "Ganesh Chaturthi",
    items: 3,
    total: 3197,
    status: "Delivered",
    city: "Mumbai",
  },
  {
    id: "FSTV-20260810-2904",
    date: "10 Aug 2026",
    festival: "Raksha Bandhan",
    items: 2,
    total: 898,
    status: "Shipped",
    city: "Delhi",
  },
  {
    id: "FSTV-20260112-1177",
    date: "12 Jan 2026",
    festival: "Pongal",
    items: 4,
    total: 2076,
    status: "Delivered",
    city: "Madurai",
  },
];
