import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "ds-inline-flex ds-items-center ds-justify-center ds-whitespace-nowrap ds-rounded-md ds-text-sm ds-font-medium ds-ring-offset-background ds-transition-colors focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-ring focus-visible:ds-ring-offset-2 disabled:ds-pointer-events-none disabled:ds-opacity-50",
  {
    variants: {
      variant: {
        default:
          "ds-bg-primary ds-text-primary-foreground hover:ds-bg-primary/90",
        destructive:
          "ds-bg-destructive ds-text-destructive-foreground hover:ds-bg-destructive/90",
        outline:
          "ds-border ds-border-input ds-bg-background hover:ds-bg-accent hover:ds-text-accent-foreground",
        secondary:
          "ds-bg-secondary ds-text-secondary-foreground hover:ds-bg-secondary/80",
        ghost: "hover:ds-bg-accent hover:ds-text-accent-foreground",
        link: "ds-text-primary ds-underline-offset-4 hover:ds-underline",
      },
      size: {
        default: "ds-h-10 ds-px-4 ds-py-2",
        sm: "ds-h-9 ds-rounded-md ds-px-3",
        lg: "ds-h-11 ds-rounded-md ds-px-8",
        icon: "ds-h-10 ds-w-10",
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
