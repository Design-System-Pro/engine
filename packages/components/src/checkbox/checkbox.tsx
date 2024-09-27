'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'ds-peer ds-h-4 ds-w-4 ds-shrink-0 ds-rounded-sm ds-border ds-border-primary ds-ring-offset-background focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-ring focus-visible:ds-ring-offset-2 disabled:ds-cursor-not-allowed disabled:ds-opacity-50 data-[state=checked]:ds-bg-primary data-[state=checked]:ds-text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'ds-flex ds-items-center ds-justify-center ds-text-current'
      )}
    >
      <Check className="ds-h-4 ds-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
