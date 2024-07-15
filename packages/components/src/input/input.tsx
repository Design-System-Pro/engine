import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ds-flex ds-h-10 ds-w-full ds-rounded-md ds-border ds-border-input ds-bg-background ds-px-3 ds-py-2 ds-text-sm ds-ring-offset-background file:ds-border-0 file:ds-bg-transparent file:ds-text-sm file:ds-font-medium placeholder:ds-text-muted-foreground focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-ring focus-visible:ds-ring-offset-2 disabled:ds-cursor-not-allowed disabled:ds-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
