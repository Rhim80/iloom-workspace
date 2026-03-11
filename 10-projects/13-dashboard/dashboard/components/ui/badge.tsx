import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-small font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-iloom-bg text-iloom-text border border-iloom-border",
        success: "bg-status-up/10 text-status-up",
        warning: "bg-[#C4A96A]/10 text-[#C4A96A]",
        danger: "bg-status-down/10 text-status-down",
        channel: "bg-iloom-beige text-iloom-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
