"use client";

import KPICard from "@/components/cards/KPICard";
import MonthlyTrendChart from "@/components/charts/MonthlyTrendChart";
import ChannelBarChart from "@/components/charts/ChannelBarChart";
import StoreRankingChart from "@/components/charts/StoreRankingChart";
import InsightPanel from "@/components/cards/InsightPanel";
import insightsData from "@/public/data/insights.json";
import {
  salesData,
  storeTargets,
  getMonthlyChannelSales,
  getChannelSummary,
  getStoreSalesRanking,
  formatKRW,
  formatPercent,
} from "@/lib/data";
import { Insight, Month } from "@/lib/types";

export default function OverviewPage() {
  const currentMonth: Month = "2026-03";
  const prevMonth: Month = "2026-02";

  const currentData = salesData.filter((r) => r.month === currentMonth);
  const prevData = salesData.filter((r) => r.month === prevMonth);

  const totalSales = currentData.reduce((s, r) => s + r.sale_amount, 0);
  const prevTotalSales = prevData.reduce((s, r) => s + r.sale_amount, 0);
  const salesChange = ((totalSales - prevTotalSales) / prevTotalSales) * 100;

  const offlineSales = currentData.filter((r) => r.channel === "ERP").reduce((s, r) => s + r.sale_amount, 0);
  const prevOffline = prevData.filter((r) => r.channel === "ERP").reduce((s, r) => s + r.sale_amount, 0);
  const offlineChange = ((offlineSales - prevOffline) / prevOffline) * 100;

  const onlineSales = currentData.filter((r) => r.channel !== "ERP").reduce((s, r) => s + r.sale_amount, 0);
  const prevOnline = prevData.filter((r) => r.channel !== "ERP").reduce((s, r) => s + r.sale_amount, 0);
  const onlineChange = ((onlineSales - prevOnline) / prevOnline) * 100;

  const onlineRatio = (onlineSales / totalSales) * 100;
  const prevOnlineRatio = (prevOnline / prevTotalSales) * 100;

  const currentTargets = storeTargets.filter((t) => t.month === currentMonth);
  const avgAchievement = currentTargets.reduce((s, t) => s + t.achievement_rate, 0) / currentTargets.length;

  const monthlyChannelData = getMonthlyChannelSales(salesData);
  const channelSummary = getChannelSummary(salesData, currentMonth);
  const storeRanking = getStoreSalesRanking(salesData, currentMonth);

  return (
    <div>
      <h1 className="font-display text-h1 text-iloom-text tracking-tight mb-8">
        전체 현황
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-section">
        <KPICard
          label="이번 달 총 매출"
          value={formatKRW(totalSales) + "원"}
          change={formatPercent(salesChange)}
          direction={salesChange >= 0 ? "up" : "down"}
        />
        <KPICard
          label="오프라인 매출"
          value={formatKRW(offlineSales) + "원"}
          change={formatPercent(offlineChange)}
          direction={offlineChange >= 0 ? "up" : "down"}
        />
        <KPICard
          label="온라인 매출"
          value={formatKRW(onlineSales) + "원"}
          change={formatPercent(onlineChange)}
          direction={onlineChange >= 0 ? "up" : "down"}
        />
        <KPICard
          label="온라인 비중"
          value={formatPercent(onlineRatio)}
          change={`${(onlineRatio - prevOnlineRatio).toFixed(1)}%p`}
          direction={onlineRatio > prevOnlineRatio ? "up" : "down"}
        />
        <KPICard
          label="목표 달성률 (오프라인)"
          value={formatPercent(avgAchievement)}
          direction="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MonthlyTrendChart
          data={monthlyChannelData}
          channels={["ERP", "네이버", "오늘의집", "공식몰"]}
          title="채널별 매출 추이 (3개월)"
        />
        <ChannelBarChart
          data={channelSummary}
          title="채널별 이번 달 매출 비교"
          dataKey="sale_amount"
        />
      </div>

      <StoreRankingChart
        data={storeRanking}
        title="매장 Top 5 / Bottom 3"
      />

      <InsightPanel
        insights={(insightsData as Insight[]).filter((i) => i.view === "overview")}
      />
    </div>
  );
}
