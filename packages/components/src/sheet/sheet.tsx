'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'ds-fixed ds-inset-0 ds-z-50 ds-bg-black/80 ds- data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-fade-out-0 data-[state=open]:ds-fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'ds-fixed ds-z-50 ds-gap-4 ds-bg-background ds-p-6 ds-shadow-lg ds-transition ds-ease-in-out data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-duration-300 data-[state=open]:ds-duration-500',
  {
    variants: {
      side: {
        top: 'ds-inset-x-0 ds-top-0 ds-border-b data-[state=closed]:ds-slide-out-to-top data-[state=open]:ds-slide-in-from-top',
        bottom:
          'ds-inset-x-0 ds-bottom-0 ds-border-t data-[state=closed]:ds-slide-out-to-bottom data-[state=open]:ds-slide-in-from-bottom',
        left: 'ds-inset-y-0 ds-left-0 ds-h-full ds-w-3/4 ds-border-r data-[state=closed]:ds-slide-out-to-left data-[state=open]:ds-slide-in-from-left sm:ds-max-w-sm',
        right:
          'ds-inset-y-0 ds-right-0 ds-h-full ds-w-3/4 ds- ds-border-l data-[state=closed]:ds-slide-out-to-right data-[state=open]:ds-slide-in-from-right sm:ds-max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ds-absolute ds-right-4 ds-top-4 ds-rounded-sm ds-opacity-70 ds-ring-offset-background ds-transition-opacity hover:ds-opacity-100 focus:ds-outline-none focus:ds-ring-2 focus:ds-ring-ring focus:ds-ring-offset-2 disabled:ds-pointer-events-none data-[state=open]:ds-bg-secondary">
        <X className="ds-h-4 ds-w-4" />
        <span className="ds-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ds-flex ds-flex-col ds-space-y-2 ds-text-center sm:ds-text-left',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ds-flex ds-flex-col-reverse sm:ds-flex-row sm:ds-justify-end sm:ds-space-x-2',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('ds-text-lg ds-font-semibold ds-text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('ds-text-sm ds-text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
