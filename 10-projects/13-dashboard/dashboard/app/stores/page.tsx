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
  Cell,
  ReferenceLine,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import InsightPanel from "@/components/cards/InsightPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import insightsData from "@/public/data/insights.json";
import { storeTargets, formatKRW, formatPercent } from "@/lib/data";
import { Insight, Month } from "@/lib/types";

const MONTH_OPTIONS = [
  { value: "2026-01", label: "2026-01" },
  { value: "2026-02", label: "2026-02" },
  { value: "2026-03", label: "2026-03" },
];

export default function StoresPage() {
  const [selectedMonth, setSelectedMonth] = useState<Month>("2026-03");

  const currentTargets = storeTargets
    .filter((t) => t.month === selectedMonth)
    .sort((a, b) => b.achievement_rate - a.achievement_rate);

  const achievedCount = currentTargets.filter((t) => t.achievement_rate >= 100).length;
  const avgRate = currentTargets.reduce((s, t) => s + t.achievement_rate, 0) / currentTargets.length;
  const topStore = currentTargets[0];

  const getBarColor = (rate: number) => {
    if (rate >= 100) return "#4A9B7F";
    if (rate >= 80) return "#C4A96A";
    return "#c80a1e";
  };

  const getBadgeVariant = (rate: number) => {
    if (rate >= 100) return "success" as const;
    if (rate >= 80) return "warning" as const;
    return "danger" as const;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-h1 text-iloom-text tracking-tight">
          매장별 실적
        </h1>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as Month)}
          options={MONTH_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-section">
        <KPICard
          label="목표 달성 매장 수"
          value={`${achievedCount} / ${currentTargets.length}`}
          direction="neutral"
        />
        <KPICard
          label="평균 달성률"
          value={formatPercent(avgRate)}
          direction="neutral"
        />
        <KPICard
          label="최고 매장"
          value={`${topStore.store_name} (${formatPercent(topStore.achievement_rate)})`}
          direction="neutral"
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>매장별 목표 달성률</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={currentTargets}
              layout="vertical"
              margin={{ top: 5, right: 30, bottom: 5, left: 110 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 140]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 12, fill: "#999", fontFamily: "Montserrat" }}
                axisLine={{ stroke: "#E0E0E0" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="store_name"
                tick={{ fontSize: 13, fill: "#333", fontFamily: "Noto Sans KR" }}
                width={106}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(1)}%`}
                contentStyle={{
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
              <ReferenceLine
                x={100}
                stroke="#c80a1e"
                strokeDasharray="4 4"
                strokeWidth={1}
                label={{ value: "목표", fill: "#c80a1e", fontSize: 11, fontFamily: "Noto Sans KR" }}
              />
              <Bar dataKey="achievement_rate" radius={[0, 1, 1, 0]} barSize={18}>
                {currentTargets.map((entry) => (
                  <Cell key={entry.store_code} fill={getBarColor(entry.achievement_rate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>매장별 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-iloom-border">
                <TableHead>매장명</TableHead>
                <TableHead>지역</TableHead>
                <TableHead>유형</TableHead>
                <TableHead className="text-right">실적</TableHead>
                <TableHead className="text-right">목표</TableHead>
                <TableHead className="text-right">달성률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTargets.map((t) => (
                <TableRow key={t.store_code}>
                  <TableCell className="font-medium text-iloom-text">{t.store_name}</TableCell>
                  <TableCell className="text-iloom-secondary">{t.region}</TableCell>
                  <TableCell className="text-iloom-secondary">{t.store_type}</TableCell>
                  <TableCell className="text-right font-display font-semibold">{formatKRW(t.actual)}원</TableCell>
                  <TableCell className="text-right font-display text-iloom-secondary">{formatKRW(t.target)}원</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(t.achievement_rate)}>
                      {formatPercent(t.achievement_rate)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InsightPanel
        insights={(insightsData as Insight[]).filter((i) => i.view === "stores")}
      />
    </div>
  );
}
