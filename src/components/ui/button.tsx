import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand-teal text-black hover:bg-[#34b37a] shadow-lg shadow-brand-teal/10",
        outline:
          "border border-brand-cardBorder text-white hover:border-neutral-500 hover:bg-white/[0.02]",
        ghost:
          "hover:bg-brand-cardHover hover:text-brand-teal text-neutral-300",
        secondary:
          "bg-brand-card border border-brand-cardBorder text-neutral-200 hover:border-brand-teal/60 hover:text-brand-teal",
        link: "text-brand-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded px-3 text-xs font-mono uppercase tracking-wide",
        lg: "h-12 rounded px-6 py-3 text-sm font-medium",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

