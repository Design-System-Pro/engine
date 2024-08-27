'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      'ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-px-2 ds-py-1.5 ds-text-sm ds-outline-none focus:ds-bg-accent data-[state=open]:ds-bg-accent',
      inset && 'ds-pl-8',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ds-ml-auto ds-h-4 ds-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'ds-z-50 ds-min-w-[8rem] ds-overflow-hidden ds-rounded-md ds-border ds-bg-popover ds-p-1 ds-text-popover-foreground ds-shadow-lg data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-fade-out-0 data-[state=open]:ds-fade-in-0 data-[state=closed]:ds-zoom-out-95 data-[state=open]:ds-zoom-in-95 data-[side=bottom]:ds-slide-in-from-top-2 data-[side=left]:ds-slide-in-from-right-2 data-[side=right]:ds-slide-in-from-left-2 data-[side=top]:ds-slide-in-from-bottom-2',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        'ds-z-50 ds-min-w-[8rem] ds-overflow-hidden ds-rounded-md ds-border ds-bg-popover ds-p-1 ds-text-popover-foreground ds-shadow-md data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-fade-out-0 data-[state=open]:ds-fade-in-0 data-[state=closed]:ds-zoom-out-95 data-[state=open]:ds-zoom-in-95 data-[side=bottom]:ds-slide-in-from-top-2 data-[side=left]:ds-slide-in-from-right-2 data-[side=right]:ds-slide-in-from-left-2 data-[side=top]:ds-slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-px-2 ds-py-1.5 ds-text-sm ds-outline-none ds-transition-colors focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      inset && 'ds-pl-8',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-py-1.5 ds-pl-8 ds-pr-2 ds-text-sm ds-outline-none ds-transition-colors focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="ds-absolute ds-left-2 ds-flex ds-h-3.5 ds-w-3.5 ds-items-center ds-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="ds-h-4 ds-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-py-1.5 ds-pl-8 ds-pr-2 ds-text-sm ds-outline-none ds-transition-colors focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="ds-absolute ds-left-2 ds-flex ds-h-3.5 ds-w-3.5 ds-items-center ds-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="ds-h-2 ds-w-2 ds-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      'ds-px-2 ds-py-1.5 ds-text-sm ds-font-semibold',
      inset && 'ds-pl-8',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={cn('ds--mx-1 ds-my-1 ds-h-px ds-bg-muted', className)}
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> {
  return (
    <span
      className={cn(
        'ds-ml-auto ds-text-xs ds-tracking-widest ds-opacity-60',
        className
      )}
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
