import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    className={cn(
      'ds-relative ds-z-10 ds-flex ds-max-w-max ds-flex-1 ds-items-center ds-justify-center',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    className={cn(
      'ds-group ds-flex ds-flex-1 ds-list-none ds-items-center ds-justify-center ds-space-x-1',
      className
    )}
    ref={ref}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'ds-group ds-inline-flex ds-h-10 ds-w-max ds-items-center ds-justify-center ds-rounded-md ds-bg-background ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-transition-colors hover:ds-bg-accent hover:ds-text-accent-foreground focus:ds-bg-accent focus:ds-text-accent-foreground focus:ds-outline-none disabled:ds-pointer-events-none disabled:ds-opacity-50 data-[active]:ds-bg-accent/50 data-[state=open]:ds-bg-accent/50'
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(navigationMenuTriggerStyle(), 'ds-group', className)}
    ref={ref}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      aria-hidden="true"
      className="ds-relative ds-top-[1px] ds-ml-1 ds-h-3 ds-w-3 ds-transition ds-duration-200 group-data-[state=open]:ds-rotate-180"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      'ds-left-0 ds-top-0 ds-w-full data-[motion^=from-]:ds-animate-in data-[motion^=to-]:ds-animate-out data-[motion^=from-]:ds-fade-in data-[motion^=to-]:ds-fade-out data-[motion=from-end]:ds-slide-in-from-right-52 data-[motion=from-start]:ds-slide-in-from-left-52 data-[motion=to-end]:ds-slide-out-to-right-52 data-[motion=to-start]:ds-slide-out-to-left-52 md:ds-absolute md:ds-w-auto ds-',
      className
    )}
    ref={ref}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'ds-absolute ds-left-0 ds-top-full ds-flex ds-justify-center'
    )}
  >
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'ds-origin-top-center ds-relative ds-mt-1.5 ds-h-[var(--radix-navigation-menu-viewport-height)] ds-w-full ds-overflow-hidden ds-rounded-md ds-border ds-bg-popover ds-text-popover-foreground ds-shadow-lg data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-zoom-out-95 data-[state=open]:ds-zoom-in-90 md:ds-w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    className={cn(
      'ds-top-full ds-z-[1] ds-flex ds-h-1.5 ds-items-end ds-justify-center ds-overflow-hidden data-[state=visible]:ds-animate-in data-[state=hidden]:ds-animate-out data-[state=hidden]:ds-fade-out data-[state=visible]:ds-fade-in',
      className
    )}
    ref={ref}
    {...props}
  >
    <div className="ds-relative ds-top-[60%] ds-h-2 ds-w-2 ds-rotate-45 ds-rounded-tl-sm ds-bg-border ds-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
