import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "ds-relative ds-w-full ds-rounded-lg ds-border ds-p-4 [&>svg~*]:ds-pl-7 [&>svg+div]:ds-translate-y-[-3px] [&>svg]:ds-absolute [&>svg]:ds-left-4 [&>svg]:ds-top-4 [&>svg]:ds-text-foreground",
  {
    variants: {
      variant: {
        default: "ds-bg-background ds-text-foreground",
        info: 'border-yellow-500/50 text-yellow-500 dark:border-yellow-500 [&>svg]:text-yellow-500',
        destructive:
          "ds-border-destructive/50 ds-text-destructive dark:ds-border-destructive [&>svg]:ds-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { asChild?: boolean }
>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return(
  <Comp
    className={cn(alertVariants({ variant }), className)}
    ref={ref}
    role="alert"
    {...props}
  />
)})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    className={cn("ds-mb-1 ds-font-medium ds-leading-none ds-tracking-tight", className)}
    ref={ref}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("ds-text-sm [&_p]:ds-leading-relaxed", className)}
    ref={ref}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
