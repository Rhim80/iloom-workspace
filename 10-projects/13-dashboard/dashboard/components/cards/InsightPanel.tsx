"use client";

import { useState } from "react";
import { Insight } from "@/lib/types";

const TYPE_STYLES: Record<Insight["type"], { label: string; dot: string }> = {
  anomaly: { label: "이상 탐지", dot: "bg-amber-400" },
  trend: { label: "추세 경고", dot: "bg-status-down" },
  opportunity: { label: "기회 발견", dot: "bg-status-up" },
};

interface Props {
  insights: Insight[];
}

export default function InsightPanel({ insights }: Props) {
  const [open, setOpen] = useState(true);

  if (insights.length === 0) return null;

  return (
    <div className="mt-section">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-label text-iloom-secondary hover:text-iloom-text transition-colors duration-200"
      >
        <span className="font-display font-medium tracking-wide flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 1.77.93 3.32 2.33 4.2V12a1 1 0 001 1h3.34a1 1 0 001-1v-1.8A4.99 4.99 0 0013 6c0-2.76-2.24-5-5-5zm1.67 13H6.33a.5.5 0 000 1h3.34a.5.5 0 000-1z" fill="#E8C87A"/>
          </svg>
          AI Insights
        </span>
        <span className="text-small">
          {open ? "접기" : "펼치기"}
        </span>
      </button>
      {open && (
        <div className="space-y-3">
          {insights.map((insight, i) => {
            const { label, dot } = TYPE_STYLES[insight.type];
            return (
              <div key={i} className="bg-[#FFF9F0] border-l-4 border-[#E8C87A] rounded-lg p-4 flex gap-4 items-start">
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-small text-iloom-secondary font-medium whitespace-nowrap">
                    {label}
                  </span>
                </div>
                <p className="text-body text-iloom-text leading-relaxed">
                  {insight.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
