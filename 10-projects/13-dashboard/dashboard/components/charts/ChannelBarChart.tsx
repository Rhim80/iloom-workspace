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

const CHANNEL_COLORS: Record<string, string> = {
  ERP: "#333333",
  "네이버": "#2D8F6F",
  "오늘의집": "#5BA4B5",
  "공식몰": "#D4645C",
};

interface ChannelData {
  channel: string;
  sale_amount: number;
  margin: number;
  margin_rate: number;
  count: number;
}

interface Props {
  data: ChannelData[];
  title: string;
  dataKey: "sale_amount" | "margin_rate";
}

export default function ChannelBarChart({ data, title, dataKey }: Props) {
  const fmt = (v: number) => {
    if (dataKey === "margin_rate") return `${v.toFixed(1)}%`;
    if (v >= 100000000) return `${(v / 100000000).toFixed(1)}억`;
    if (v >= 10000) return `${(v / 10000).toFixed(0)}만`;
    return String(v);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis
              dataKey="channel"
              tick={{ fontSize: 12, fill: "#999", fontFamily: "Noto Sans KR" }}
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
              formatter={(value: number) => fmt(value)}
              contentStyle={{
                border: "1px solid #E0E0E0",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Bar dataKey={dataKey} radius={[1, 1, 0, 0]} barSize={48}>
              {data.map((entry) => (
                <Cell key={entry.channel} fill={CHANNEL_COLORS[entry.channel] || "#999"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
