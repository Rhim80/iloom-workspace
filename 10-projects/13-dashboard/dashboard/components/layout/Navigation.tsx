"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "전체 현황" },
  { href: "/stores", label: "매장별 실적" },
  { href: "/profitability", label: "채산 분석" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-iloom-border sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link
          href="/"
          className="font-display font-bold text-brand-red text-[22px] tracking-[-0.5px]"
        >
          iloom
        </Link>
        <nav className="flex gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-label font-medium transition-colors duration-200 relative ${
                  isActive
                    ? "text-brand-red"
                    : "text-iloom-secondary hover:text-iloom-text"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[25px] left-0 right-0 h-[2px] bg-brand-red" />
                )}
              </Link>
            );
          })}
        </nav>
        <span className="text-small text-iloom-secondary tracking-wide">
          데이터 기준 <span className="font-display font-medium text-iloom-text">2026-03</span>
        </span>
      </div>
    </header>
  );
}
