"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import ChannelBarChart from "@/components/charts/ChannelBarChart";
import MonthlyTrendChart from "@/components/charts/MonthlyTrendChart";
import InsightPanel from "@/components/cards/InsightPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import insightsData from "@/public/data/insights.json";
import {
  salesData,
  getChannelSummary,
  getProductChannelMargin,
  getChannelMarginTrend,
  formatPercent,
} from "@/lib/data";
import { Insight, Month } from "@/lib/types";

const CHANNEL_COLORS: Record<string, string> = {
  ERP: "#333333",
  "네이버": "#2D8F6F",
  "오늘의집": "#5BA4B5",
  "공식몰": "#D4645C",
};

const MONTH_OPTIONS = [
  { value: "2026-01", label: "2026-01" },
  { value: "2026-02", label: "2026-02" },
  { value: "2026-03", label: "2026-03" },
];

export default function ProfitabilityPage() {
  const [selectedMonth, setSelectedMonth] = useState<Month>("2026-03");

  const channelSummary = getChannelSummary(salesData, selectedMonth);
  const prevChannelSummary = getChannelSummary(
    salesData,
    selectedMonth === "2026-01" ? "2026-01" : selectedMonth === "2026-02" ? "2026-01" : "2026-02"
  );

  const totalSale = channelSummary.reduce((s, c) => s + c.sale_amount, 0);
  const totalMargin = channelSummary.reduce((s, c) => s + c.margin, 0);
  const totalMarginRate = totalSale > 0 ? (totalMargin / totalSale) * 100 : 0;

  const prevTotalSale = prevChannelSummary.reduce((s, c) => s + c.sale_amount, 0);
  const prevTotalMargin = prevChannelSummary.reduce((s, c) => s + c.margin, 0);
  const prevMarginRate = prevTotalSale > 0 ? (prevTotalMargin / prevTotalSale) * 100 : 0;

  const bestChannel = [...channelSummary].sort((a, b) => b.margin_rate - a.margin_rate)[0];
  const worstChannel = [...channelSummary].sort((a, b) => a.margin_rate - b.margin_rate)[0];

  const productMarginData = getProductChannelMargin(salesData, selectedMonth);
  const marginTrend = getChannelMarginTrend(salesData);

  const sortedProducts = productMarginData
    .map((p) => ({
      ...p,
      totalMargin: (Number(p.ERP) || 0) + (Number(p["네이버"]) || 0) + (Number(p["오늘의집"]) || 0) + (Number(p["공식몰"]) || 0),
    }))
    .sort((a, b) => b.totalMargin - a.totalMargin)
    .slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-h1 text-iloom-text tracking-tight">
          채산 분석
        </h1>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as Month)}
          options={MONTH_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-section">
        <KPICard
          label="전체 마진율"
          value={`~${formatPercent(totalMarginRate)}`}
          change={`${(totalMarginRate - prevMarginRate).toFixed(1)}%p`}
          direction={totalMarginRate > prevMarginRate ? "up" : "down"}
        />
        <KPICard
          label="최고 마진 채널"
          value={`${bestChannel.channel} (~${formatPercent(bestChannel.margin_rate)})`}
          direction="neutral"
        />
        <KPICard
          label="최저 마진 채널"
          value={`${worstChannel.channel} (~${formatPercent(worstChannel.margin_rate)})`}
          direction="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChannelBarChart
          data={channelSummary}
          title="채널별 마진율 비교"
          dataKey="margin_rate"
        />
        <MonthlyTrendChart
          data={marginTrend}
          channels={["ERP", "네이버", "오늘의집", "공식몰"]}
          title="채널별 마진율 월간 추이"
          yAxisFormatter={(v: number) => `${v}%`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>상품별 채널 간 수익성 비교 (마진 Top 8)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sortedProducts}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 130 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(v: number) => {
                  if (v >= 10000) return `${(v / 10000).toFixed(0)}만`;
                  return String(v);
                }}
                tick={{ fontSize: 12, fill: "#999", fontFamily: "Montserrat" }}
                axisLine={{ stroke: "#E0E0E0" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="product_name"
                tick={{ fontSize: 12, fill: "#333", fontFamily: "Noto Sans KR" }}
                width={126}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString()}원`}
                contentStyle={{
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, fontFamily: "Noto Sans KR" }}
                iconType="square"
              />
              {Object.entries(CHANNEL_COLORS).map(([ch, color]) => (
                <Bar key={ch} dataKey={ch} stackId="margin" fill={color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <InsightPanel
        insights={(insightsData as Insight[]).filter((i) => i.view === "profitability")}
      />
    </div>
  );
}
