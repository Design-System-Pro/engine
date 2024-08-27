'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/utils';

const MenubarMenu: {
  (props: MenubarPrimitive.MenubarMenuProps): JSX.Element;
  displayName: string;
} = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'ds-flex ds-h-10 ds-items-center ds-space-x-1 ds-rounded-md ds-border ds-bg-background ds-p-1',
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-px-3 ds-py-1.5 ds-text-sm ds-font-medium ds-outline-none focus:ds-bg-accent focus:ds-text-accent-foreground data-[state=open]:ds-bg-accent data-[state=open]:ds-text-accent-foreground',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-px-2 ds-py-1.5 ds-text-sm ds-outline-none focus:ds-bg-accent focus:ds-text-accent-foreground data-[state=open]:ds-bg-accent data-[state=open]:ds-text-accent-foreground',
      inset && 'ds-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ds-ml-auto ds-h-4 ds-w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'ds-z-50 ds-min-w-[8rem] ds-overflow-hidden ds-rounded-md ds-border ds-bg-popover ds-p-1 ds-text-popover-foreground data-[state=open]:ds-animate-in data-[state=closed]:ds-animate-out data-[state=closed]:ds-fade-out-0 data-[state=open]:ds-fade-in-0 data-[state=closed]:ds-zoom-out-95 data-[state=open]:ds-zoom-in-95 data-[side=bottom]:ds-slide-in-from-top-2 data-[side=left]:ds-slide-in-from-right-2 data-[side=right]:ds-slide-in-from-left-2 data-[side=top]:ds-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'ds-z-50 ds-min-w-[12rem] ds-overflow-hidden ds-rounded-md ds-border ds-bg-popover ds-p-1 ds-text-popover-foreground ds-shadow-md data-[state=open]:ds-animate-in data-[state=closed]:ds-fade-out-0 data-[state=open]:ds-fade-in-0 data-[state=closed]:ds-zoom-out-95 data-[state=open]:ds-zoom-in-95 data-[side=bottom]:ds-slide-in-from-top-2 data-[side=left]:ds-slide-in-from-right-2 data-[side=right]:ds-slide-in-from-left-2 data-[side=top]:ds-slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-px-2 ds-py-1.5 ds-text-sm ds-outline-none focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      inset && 'ds-pl-8',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-py-1.5 ds-pl-8 ds-pr-2 ds-text-sm ds-outline-none focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ds-absolute ds-left-2 ds-flex ds-h-3.5 ds-w-3.5 ds-items-center ds-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="ds-h-4 ds-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'ds-relative ds-flex ds-cursor-default ds-select-none ds-items-center ds-rounded-sm ds-py-1.5 ds-pl-8 ds-pr-2 ds-text-sm ds-outline-none focus:ds-bg-accent focus:ds-text-accent-foreground data-[disabled]:ds-pointer-events-none data-[disabled]:ds-opacity-50',
      className
    )}
    {...props}
  >
    <span className="ds-absolute ds-left-2 ds-flex ds-h-3.5 ds-w-3.5 ds-items-center ds-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="ds-h-2 ds-w-2 ds-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'ds-px-2 ds-py-1.5 ds-text-sm ds-font-semibold',
      inset && 'ds-pl-8',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('ds--mx-1 ds-my-1 ds-h-px ds-bg-muted', className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ds-ml-auto ds-text-xs ds-tracking-widest ds-text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
