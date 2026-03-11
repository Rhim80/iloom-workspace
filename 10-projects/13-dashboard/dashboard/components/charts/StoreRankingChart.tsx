"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StoreData {
  store_name: string;
  total: number;
}

interface Props {
  data: StoreData[];
  title: string;
  showTopBottom?: boolean;
}

export default function StoreRankingChart({ data, title, showTopBottom = true }: Props) {
  const displayData = showTopBottom
    ? [...data.slice(0, 5), ...data.slice(-3)]
    : data;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={displayData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 90 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v: number) =>
                v >= 10000 ? `${(v / 10000).toFixed(0)}만` : String(v)
              }
              tick={{ fontSize: 12, fill: "#999", fontFamily: "Montserrat" }}
              axisLine={{ stroke: "#E0E0E0" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="store_name"
              tick={{ fontSize: 13, fill: "#333", fontFamily: "Noto Sans KR" }}
              width={86}
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
            <Bar dataKey="total" radius={[0, 1, 1, 0]} barSize={20}>
              {displayData.map((entry, i) => (
                <Cell
                  key={entry.store_name}
                  fill={
                    showTopBottom && i >= 5
                      ? "#D9D5D0"
                      : i === 0
                      ? "#D4645C"
                      : "#333333"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
