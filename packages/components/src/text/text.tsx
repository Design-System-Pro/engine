import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

const textVariations = cva('', {
  variants: {
    size: {
      xs: 'ds-fluid-text-xs',
      sm: 'ds-fluid-text-sm',
      base: 'ds-fluid-text-base',
      lg: 'ds-fluid-text-lg',
      xl: 'ds-fluid-text-xl',
      '2xl': 'ds-fluid-text-2xl',
      '3xl': 'ds-fluid-text-3xl',
      '4xl': 'ds-fluid-text-4xl',
      '5xl': 'ds-fluid-text-5xl',
      '6xl': 'ds-fluid-text-6xl',
      '7xl': 'ds-fluid-text-7xl',
      '8xl': 'ds-fluid-text-8xl',
      '9xl': 'ds-fluid-text-9xl'
    },
    weight: {
      thin: 'ds-font-thin',
      extralight: 'ds-font-extralight',
      light: 'ds-font-light',
      normal: 'ds-font-normal',
      medium: 'ds-font-medium',
      semibold: 'ds-font-semibold',
      bold: 'ds-font-bold',
      extrabold: 'ds-font-extrabold',
    },
    family: {
      sans: 'ds-font-sans',
      mono: 'ds-font-mono'
    },
    mood: {
      default: "ds-text-foreground",
      info: 'ds-text-yellow-500',
      destructive:"ds-text-destructive",
      muted: 'ds-text-muted-foreground'
    },
  },
});

type TextProps = VariantProps<typeof textVariations> & {
  children: ReactNode;
  className?: string;
}

/**
 * Renders text styles to the child
 */
export const Text = forwardRef<
HTMLElement,
TextProps
>(({ size, weight, family, mood, className, children }, ref) => {

  return (
    <Slot ref={ref} className={cn(textVariations({ size, weight, family, mood, className }))}>{children}</Slot>
  );
})

Text.displayName = 'Text';