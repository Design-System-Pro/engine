import type { VariantProps } from '@ds-project/components';
import { cn, cva, Slot } from '@ds-project/components';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ds-ring-offset-background transition-colors focus-visible:outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-ring focus-visible:ds-ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      mode: {
        light:
          'bg-zinc-50 border border-zinc-600 text-zinc-950 hover:bg-zinc-200/90',
        dark: 'bg-zinc-900 border border-zinc-600 text-zinc-50 hover:bg-zinc-700/90',
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
