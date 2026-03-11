export interface SalesRecord {
  date: string;
  month: string;
  channel: "ERP" | "네이버" | "오늘의집" | "공식몰";
  product_code: string;
  product_name: string;
  series: string;
  category: string;
  qty: number;
  sale_amount: number;
  supply_price: number;
  commission: number;
  settled_amount: number;
  margin: number;
  margin_rate: number;
  store_code: string | null;
  store_name: string;
  region: string;
}

export interface StoreTarget {
  store_code: string;
  store_name: string;
  region: string;
  store_type: string;
  month: string;
  target: number;
  actual: number;
  achievement_rate: number;
}

export interface KPICardData {
  label: string;
  value: string;
  change?: string;
  direction?: "up" | "down" | "neutral";
}

export interface Insight {
  view: "overview" | "stores" | "profitability";
  type: "anomaly" | "trend" | "opportunity";
  message: string;
}

export type Channel = "ERP" | "네이버" | "오늘의집" | "공식몰";
export type Month = "2026-01" | "2026-02" | "2026-03";
