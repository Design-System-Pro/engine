import type { VariantProps } from '@ds-project/components';
import { Slot } from '@ds-project/components';
import { cn, cva } from '@ds-project/components';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'ds-ring-offset-background focus-visible:ds-ring-2 focus-visible:ds-ring-ring focus-visible:ds-ring-offset-2 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      mode: {
        light:
          'border border-zinc-600 bg-zinc-50 text-zinc-950 hover:bg-zinc-200/90',
        dark: 'border border-zinc-600 bg-zinc-900 text-zinc-50 hover:bg-zinc-700/90',
      },
      size: {
        default: 'px-4 py-2',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      mode: 'light',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, mode, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ mode, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
