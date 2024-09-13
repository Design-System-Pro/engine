import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const badgeVariants = cva(
  'ds-inline-flex ds-items-center ds-rounded-full ds-border ds-px-2.5 ds-py-0.5 ds-text-xs ds-font-semibold ds-transition-colors focus:ds-outline-none focus:ds-ring-2 focus:ds-ring-ring focus:ds-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'ds-border-transparent ds-bg-primary ds-text-primary-foreground hover:ds-bg-primary/80',
        secondary:
          'ds-border-transparent ds-bg-secondary ds-text-secondary-foreground hover:ds-bg-secondary/80',
        destructive:
          'ds-border-transparent ds-bg-destructive ds-text-destructive-foreground hover:ds-bg-destructive/80',
        outline: 'ds-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
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
