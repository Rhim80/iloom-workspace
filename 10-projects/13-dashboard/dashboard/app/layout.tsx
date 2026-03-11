import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "iloom 매출 통합 대시보드",
  description: "채널별 매출, 매장 실적, 수익성 분석",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <Navigation />
        <main className="max-w-[1200px] mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
