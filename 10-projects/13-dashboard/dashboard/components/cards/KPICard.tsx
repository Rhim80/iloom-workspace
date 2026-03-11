"use client";

import { Card, CardContent } from "@/components/ui/card";
import { KPICardData } from "@/lib/types";

interface KPICardProps extends KPICardData {
  source?: string;
}

export default function KPICard({ label, value, change, direction, source }: KPICardProps) {
  return (
    <Card className="p-6 group">
      <CardContent className="p-0">
        <p className="text-small text-iloom-secondary mb-3 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-[28px] font-display font-bold text-iloom-text leading-tight tracking-tight">
          {value}
        </p>
        {change && (
          <div className="mt-3 pt-3 border-t border-iloom-border-light">
            <span
              className={`text-small font-display font-semibold ${
                direction === "up"
                  ? "text-status-up"
                  : direction === "down"
                  ? "text-status-down"
                  : "text-iloom-secondary"
              }`}
            >
              {direction === "up" ? "+" : ""}
              {change}
              <span className="text-iloom-secondary font-normal ml-1">
                vs 전월
              </span>
            </span>
          </div>
        )}
        {source && (
          <p className="mt-2 text-[11px] text-iloom-secondary leading-snug">
            {source}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
