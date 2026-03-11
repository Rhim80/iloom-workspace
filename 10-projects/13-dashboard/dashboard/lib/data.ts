import { SalesRecord, StoreTarget, Channel, Month } from "./types";

// --- Mock Data ---

const channels: Channel[] = ["ERP", "네이버", "오늘의집", "공식몰"];

const products = [
  { code: "LP-1200", name: "르마 패밀리 소파 1200", series: "르마", category: "거실", price: 1890000, supply: 1100000 },
  { code: "LP-2400", name: "르마 패밀리 소파 2400", series: "르마", category: "거실", price: 3290000, supply: 1900000 },
  { code: "TK-SS", name: "팅키 싱글 침대", series: "팅키", category: "학생방", price: 590000, supply: 340000 },
  { code: "TK-SD", name: "팅키 책상", series: "팅키", category: "학생방", price: 490000, supply: 280000 },
  { code: "TK-WD", name: "팅키 옷장", series: "팅키", category: "학생방", price: 690000, supply: 400000 },
  { code: "RB-QM", name: "로이 퀸 매트리스", series: "로이", category: "침실", price: 890000, supply: 520000 },
  { code: "RB-QB", name: "로이 퀸 침대", series: "로이", category: "침실", price: 1490000, supply: 870000 },
  { code: "HS-D160", name: "헤이즈 책상 1600", series: "헤이즈", category: "서재", price: 690000, supply: 400000 },
  { code: "HS-CH", name: "헤이즈 체어", series: "헤이즈", category: "서재", price: 390000, supply: 220000 },
  { code: "ED-TV", name: "에디 TV장", series: "에디", category: "거실", price: 490000, supply: 280000 },
  { code: "MN-QM", name: "모나코 퀸 매트리스", series: "모나코", category: "침실", price: 690000, supply: 400000 },
  { code: "PT-D120", name: "포테 데스크 1200", series: "포테", category: "서재", price: 359000, supply: 200000 },
  { code: "SN-SC", name: "시에나 사이드체어", series: "시에나", category: "거실", price: 189000, supply: 110000 },
];

const stores = [
  { code: "S001", name: "강남 프리미엄샵", region: "서울", type: "프리미엄샵" },
  { code: "S002", name: "잠실 프리미엄샵", region: "서울", type: "프리미엄샵" },
  { code: "S003", name: "홍대 브랜드샵", region: "서울", type: "브랜드샵" },
  { code: "S004", name: "판교 프리미엄샵", region: "경기", type: "프리미엄샵" },
  { code: "S005", name: "수원 브랜드샵", region: "경기", type: "브랜드샵" },
  { code: "S006", name: "일산 브랜드샵", region: "경기", type: "브랜드샵" },
  { code: "S007", name: "용인 브랜드샵", region: "경기", type: "브랜드샵" },
  { code: "S008", name: "해운대 프리미엄샵", region: "부산", type: "프리미엄샵" },
  { code: "S009", name: "서면 브랜드샵", region: "부산", type: "브랜드샵" },
  { code: "S010", name: "대구 브랜드샵", region: "대구", type: "브랜드샵" },
  { code: "S011", name: "인천 브랜드샵", region: "인천", type: "브랜드샵" },
  { code: "S012", name: "광주 브랜드샵", region: "광주", type: "브랜드샵" },
  { code: "S013", name: "대전 브랜드샵", region: "대전", type: "브랜드샵" },
  { code: "S014", name: "제주 브랜드샵", region: "제주", type: "브랜드샵" },
  { code: "S015", name: "춘천 브랜드샵", region: "강원", type: "브랜드샵" },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateSalesData(): SalesRecord[] {
  const records: SalesRecord[] = [];
  const months: Month[] = ["2026-01", "2026-02", "2026-03"];
  let seed = 42;

  for (const month of months) {
    // ERP (offline) - 50-60 rows per month
    for (let i = 0; i < 55; i++) {
      seed++;
      const store = stores[Math.floor(seededRandom(seed) * stores.length)];
      seed++;
      const product = products.filter(p => !["MN-QM", "PT-D120", "SN-SC"].includes(p.code))[
        Math.floor(seededRandom(seed) * 10)
      ];
      seed++;
      const qty = Math.floor(seededRandom(seed) * 3) + 1;
      seed++;
      const discount = seededRandom(seed) > 0.7 ? 0.1 : 0;
      const saleAmount = product.price * qty * (1 - discount);
      const day = String(Math.floor(seededRandom(seed + 1) * 28) + 1).padStart(2, "0");

      records.push({
        date: `${month}-${day}`,
        month,
        channel: "ERP",
        product_code: product.code,
        product_name: product.name,
        series: product.series,
        category: product.category,
        qty,
        sale_amount: saleAmount,
        supply_price: product.supply * qty,
        commission: 0,
        settled_amount: saleAmount,
        margin: saleAmount - product.supply * qty,
        margin_rate: ((saleAmount - product.supply * qty) / saleAmount) * 100,
        store_code: store.code,
        store_name: store.name,
        region: store.region,
      });
    }

    // 네이버 - ~80 rows
    for (let i = 0; i < 75; i++) {
      seed++;
      const product = products[Math.floor(seededRandom(seed) * products.length)];
      seed++;
      const qty = Math.floor(seededRandom(seed) * 2) + 1;
      seed++;
      const saleAmount = product.price * qty;
      const commissionRate = 0.055;
      const commission = saleAmount * commissionRate;
      const day = String(Math.floor(seededRandom(seed + 2) * 28) + 1).padStart(2, "0");

      records.push({
        date: `${month}-${day}`,
        month,
        channel: "네이버",
        product_code: product.code,
        product_name: product.name,
        series: product.series,
        category: product.category,
        qty,
        sale_amount: saleAmount,
        supply_price: product.supply * qty,
        commission,
        settled_amount: saleAmount - commission,
        margin: saleAmount - commission - product.supply * qty,
        margin_rate: ((saleAmount - commission - product.supply * qty) / saleAmount) * 100,
        store_code: null,
        store_name: "네이버",
        region: "온라인",
      });
    }

    // 오늘의집 - ~45 rows
    for (let i = 0; i < 42; i++) {
      seed++;
      const product = products[Math.floor(seededRandom(seed) * products.length)];
      seed++;
      const qty = Math.floor(seededRandom(seed) * 2) + 1;
      seed++;
      const saleAmount = product.price * qty;
      const commissionRate = seededRandom(seed) > 0.5 ? 0.15 : 0.1;
      const commission = saleAmount * commissionRate;
      const day = String(Math.floor(seededRandom(seed + 3) * 28) + 1).padStart(2, "0");

      records.push({
        date: `${month}-${day}`,
        month,
        channel: "오늘의집",
        product_code: product.code,
        product_name: product.name,
        series: product.series,
        category: product.category,
        qty,
        sale_amount: saleAmount,
        supply_price: product.supply * qty,
        commission,
        settled_amount: saleAmount - commission,
        margin: saleAmount - commission - product.supply * qty,
        margin_rate: ((saleAmount - commission - product.supply * qty) / saleAmount) * 100,
        store_code: null,
        store_name: "오늘의집",
        region: "온라인",
      });
    }

    // 공식몰 - ~35 rows
    for (let i = 0; i < 32; i++) {
      seed++;
      const product = products[Math.floor(seededRandom(seed) * products.length)];
      seed++;
      const qty = Math.floor(seededRandom(seed) * 2) + 1;
      seed++;
      const discount = seededRandom(seed) > 0.6 ? 0.05 : 0;
      const saleAmount = product.price * qty * (1 - discount);
      const day = String(Math.floor(seededRandom(seed + 4) * 28) + 1).padStart(2, "0");

      records.push({
        date: `${month}-${day}`,
        month,
        channel: "공식몰",
        product_code: product.code,
        product_name: product.name,
        series: product.series,
        category: product.category,
        qty,
        sale_amount: saleAmount,
        supply_price: product.supply * qty,
        commission: 0,
        settled_amount: saleAmount,
        margin: saleAmount - product.supply * qty,
        margin_rate: ((saleAmount - product.supply * qty) / saleAmount) * 100,
        store_code: null,
        store_name: "공식몰",
        region: "온라인",
      });
    }
  }

  return records;
}

function generateTargets(): StoreTarget[] {
  const targets: StoreTarget[] = [];
  const months: Month[] = ["2026-01", "2026-02", "2026-03"];
  let seed = 100;

  for (const store of stores) {
    for (const month of months) {
      seed++;
      const baseTarget = store.type === "프리미엄샵" ? 45000000 : 28000000;
      const target = baseTarget + Math.floor(seededRandom(seed) * 10000000);
      seed++;
      const achievementBase = 0.75 + seededRandom(seed) * 0.5;
      const actual = Math.floor(target * achievementBase);

      targets.push({
        store_code: store.code,
        store_name: store.name,
        region: store.region,
        store_type: store.type,
        month,
        target,
        actual,
        achievement_rate: Math.round((actual / target) * 1000) / 10,
      });
    }
  }

  return targets;
}

export const salesData = generateSalesData();
export const storeTargets = generateTargets();

// --- Aggregation helpers ---

export function formatKRW(n: number): string {
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}억`;
  if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만`;
  return n.toLocaleString();
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function getMonthlyChannelSales(data: SalesRecord[]) {
  const months: Month[] = ["2026-01", "2026-02", "2026-03"];
  return months.map((m) => {
    const monthData = data.filter((r) => r.month === m);
    const result: Record<string, number | string> = { month: m };
    for (const ch of channels) {
      result[ch] = monthData.filter((r) => r.channel === ch).reduce((s, r) => s + r.sale_amount, 0);
    }
    result["total"] = monthData.reduce((s, r) => s + r.sale_amount, 0);
    return result;
  });
}

export function getChannelSummary(data: SalesRecord[], month: Month) {
  return channels.map((ch) => {
    const filtered = data.filter((r) => r.channel === ch && r.month === month);
    const sale = filtered.reduce((s, r) => s + r.sale_amount, 0);
    const margin = filtered.reduce((s, r) => s + r.margin, 0);
    return {
      channel: ch,
      sale_amount: sale,
      margin,
      margin_rate: sale > 0 ? (margin / sale) * 100 : 0,
      count: filtered.length,
    };
  });
}

export function getStoreSalesRanking(data: SalesRecord[], month: Month) {
  const erpData = data.filter((r) => r.channel === "ERP" && r.month === month);
  const storeMap = new Map<string, { name: string; total: number }>();
  for (const r of erpData) {
    const prev = storeMap.get(r.store_code!) || { name: r.store_name, total: 0 };
    prev.total += r.sale_amount;
    storeMap.set(r.store_code!, prev);
  }
  return Array.from(storeMap.entries())
    .map(([code, v]) => ({ store_code: code, store_name: v.name, total: v.total }))
    .sort((a, b) => b.total - a.total);
}

export function getProductChannelMargin(data: SalesRecord[], month: Month) {
  const filtered = data.filter((r) => r.month === month);
  const productMap = new Map<string, Record<string, number>>();

  for (const r of filtered) {
    if (!productMap.has(r.product_code)) {
      productMap.set(r.product_code, { ERP: 0, "네이버": 0, "오늘의집": 0, "공식몰": 0 });
    }
    const entry = productMap.get(r.product_code)!;
    entry[r.channel] += r.margin;
  }

  return Array.from(productMap.entries()).map(([code, margins]) => {
    const product = products.find((p) => p.code === code)!;
    return {
      product_code: code,
      product_name: product.name,
      ERP: margins.ERP,
      "네이버": margins["네이버"],
      "오늘의집": margins["오늘의집"],
      "공식몰": margins["공식몰"],
    };
  });
}

export function getChannelMarginTrend(data: SalesRecord[]) {
  const months: Month[] = ["2026-01", "2026-02", "2026-03"];
  return months.map((m) => {
    const result: Record<string, number | string> = { month: m };
    for (const ch of channels) {
      const filtered = data.filter((r) => r.channel === ch && r.month === m);
      const sale = filtered.reduce((s, r) => s + r.sale_amount, 0);
      const margin = filtered.reduce((s, r) => s + r.margin, 0);
      result[ch] = sale > 0 ? Math.round((margin / sale) * 1000) / 10 : 0;
    }
    return result;
  });
}
