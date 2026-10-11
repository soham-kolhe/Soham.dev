import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal",
  {
    variants: {
      variant: {
        default:
          "bg-[#13161C] border border-neutral-800 text-neutral-300 rounded px-3 py-1",
        subtle:
          "bg-[#14171D] border border-neutral-800 text-neutral-300 rounded px-2.5 py-1",
        outline:
          "border border-brand-teal/40 text-brand-teal bg-brand-teal/10 rounded px-2.5 py-1",
        status:
          "bg-brand-card border border-brand-cardBorder text-neutral-300 rounded-full px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

