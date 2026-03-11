"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CHANNEL_COLORS: Record<string, string> = {
  ERP: "#333333",
  "네이버": "#2D8F6F",
  "오늘의집": "#5BA4B5",
  "공식몰": "#D4645C",
};

interface Props {
  data: Record<string, number | string>[];
  channels: string[];
  title: string;
  yAxisFormatter?: (v: number) => string;
}

export default function MonthlyTrendChart({ data, channels, title, yAxisFormatter }: Props) {
  const defaultFormatter = (v: number) => {
    if (v >= 100000000) return `${(v / 100000000).toFixed(0)}억`;
    if (v >= 10000) return `${(v / 10000).toFixed(0)}만`;
    return String(v);
  };
  const fmt = yAxisFormatter || defaultFormatter;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#999", fontFamily: "Montserrat" }}
              axisLine={{ stroke: "#E0E0E0" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 12, fill: "#999", fontFamily: "Montserrat" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              labelStyle={{ color: "#333", fontFamily: "Montserrat", fontWeight: 600 }}
              contentStyle={{
                border: "1px solid #E0E0E0",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, fontFamily: "Noto Sans KR" }}
              iconType="plainline"
            />
            {channels.map((ch) => (
              <Line
                key={ch}
                type="monotone"
                dataKey={ch}
                stroke={CHANNEL_COLORS[ch] || "#999"}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
