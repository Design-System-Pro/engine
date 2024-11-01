'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/utils';
import { Button } from '@/button';
import { Input } from '@/input';
import { Separator } from '@/separator';
import { Sheet, SheetContent } from '@/sheet';
import { Skeleton } from '@/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/tooltip';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

interface SidebarContext {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              'ds-group/sidebar-wrapper ds-flex ds-min-h-svh ds-w-full has-[[data-variant=inset]]:ds-bg-sidebar',
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
  }
>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'ds-flex ds-h-full ds-w-[--sidebar-width] ds-flex-col ds-bg-sidebar ds-text-sidebar-foreground',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="ds-w-[--sidebar-width] ds-bg-sidebar ds-p-0 ds-text-sidebar-foreground [&>button]:ds-hidden"
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="ds-flex ds-h-full ds-w-full ds-flex-col">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="ds-group ds-peer ds-hidden ds-text-sidebar-foreground md:ds-block"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            'ds-duration-200 ds-relative ds-h-svh ds-w-[--sidebar-width] ds-bg-transparent ds-transition-[width] ds-ease-linear',
            'group-data-[collapsible=offcanvas]:ds-w-0',
            'group-data-[side=right]:ds-rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:ds-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
              : 'group-data-[collapsible=icon]:ds-w-[--sidebar-width-icon]'
          )}
        />
        <div
          className={cn(
            'ds-duration-200 ds-fixed ds-inset-y-0 ds-z-10 ds-hidden ds-h-svh ds-w-[--sidebar-width] ds-transition-[left,right,width] ds-ease-linear md:ds-flex',
            side === 'left'
              ? 'ds-left-0 group-data-[collapsible=offcanvas]:ds-left-[calc(var(--sidebar-width)*-1)]'
              : 'ds-right-0 group-data-[collapsible=offcanvas]:ds-right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            variant === 'floating' || variant === 'inset'
              ? 'ds-p-2 group-data-[collapsible=icon]:ds-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
              : 'group-data-[collapsible=icon]:ds-w-[--sidebar-width-icon] group-data-[side=left]:ds-border-r group-data-[side=right]:ds-border-l',
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="ds-flex ds-h-full ds-w-full ds-flex-col ds-bg-sidebar group-data-[variant=floating]:ds-rounded-lg group-data-[variant=floating]:ds-border group-data-[variant=floating]:ds-border-sidebar-border group-data-[variant=floating]:ds-shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('ds-h-7 ds-w-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="ds-sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'ds-absolute ds-inset-y-0 ds-z-20 ds-hidden ds-w-4 ds--translate-x-1/2 ds-transition-all ds-ease-linear after:ds-absolute after:ds-inset-y-0 after:ds-left-1/2 after:ds-w-[2px] hover:after:ds-bg-sidebar-border group-data-[side=left]:ds--right-4 group-data-[side=right]:ds-left-0 sm:ds-flex',
        '[[data-side=left]_&]:ds-cursor-w-resize [[data-side=right]_&]:ds-cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:ds-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:ds-cursor-w-resize',
        'group-data-[collapsible=offcanvas]:ds-translate-x-0 group-data-[collapsible=offcanvas]:after:ds-left-full group-data-[collapsible=offcanvas]:hover:ds-bg-sidebar',
        '[[data-side=left][data-collapsible=offcanvas]_&]:ds--right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:ds--left-2',
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = 'SidebarRail';

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        'ds-relative ds-flex ds-min-h-svh ds-flex-1 ds-flex-col ds-bg-background',
        'peer-data-[variant=inset]:ds-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:ds-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ds-ml-2 md:peer-data-[variant=inset]:ds-ml-0 md:peer-data-[variant=inset]:ds-rounded-xl md:peer-data-[variant=inset]:ds-shadow',
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'ds-h-8 ds-w-full ds-bg-background ds-shadow-none focus-visible:ds-ring-2 focus-visible:ds-ring-sidebar-ring',
        className
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = 'SidebarInput';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('ds-flex ds-flex-col ds-gap-2 ds-p-2', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('ds-flex ds-flex-col ds-gap-2 ds-p-2', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn('ds-mx-2 ds-w-auto ds-bg-sidebar-border', className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = 'SidebarSeparator';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'ds-flex ds-min-h-0 ds-flex-1 ds-flex-col ds-gap-2 ds-overflow-auto group-data-[collapsible=icon]:ds-overflow-hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        'ds-relative ds-flex ds-w-full ds-min-w-0 ds-flex-col ds-p-2',
        className
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'ds-duration-200 ds-flex ds-h-8 ds-shrink-0 ds-items-center ds-rounded-md ds-px-2 ds-text-xs ds-font-medium ds-text-sidebar-foreground/70 ds-outline-none ds-ring-sidebar-ring ds-transition-[margin,opa] ds-ease-linear focus-visible:ds-ring-2 [&>svg]:ds-size-4 [&>svg]:ds-shrink-0',
        'group-data-[collapsible=icon]:ds--mt-8 group-data-[collapsible=icon]:ds-opacity-0',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        'ds-absolute ds-right-3 ds-top-3.5 ds-flex ds-aspect-square ds-w-5 ds-items-center ds-justify-center ds-rounded-md ds-p-0 ds-text-sidebar-foreground ds-outline-none ds-ring-sidebar-ring ds-transition-transform hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground focus-visible:ds-ring-2 [&>svg]:ds-size-4 [&>svg]:ds-shrink-0',
        // Increases the hit area of the button on mobile.
        'after:ds-absolute after:ds--inset-2 after:md:ds-hidden',
        'group-data-[collapsible=icon]:ds-hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = 'SidebarGroupAction';

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn('ds-w-full ds-text-sm', className)}
    {...props}
  />
));
SidebarGroupContent.displayName = 'SidebarGroupContent';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn(
      'ds-flex ds-w-full ds-min-w-0 ds-flex-col ds-gap-1',
      className
    )}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn('ds-group/menu-item ds-relative', className)}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'ds-peer/menu-button ds-flex ds-w-full ds-items-center ds-gap-2 ds-overflow-hidden ds-rounded-md ds-p-2 ds-text-left ds-text-sm ds-outline-none ds-ring-sidebar-ring ds-transition-[width,height,padding] hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground focus-visible:ds-ring-2 active:ds-bg-sidebar-accent active:ds-text-sidebar-accent-foreground disabled:ds-pointer-events-none disabled:ds-opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:ds-pr-8 aria-disabled:ds-pointer-events-none aria-disabled:ds-opacity-50 data-[active=true]:ds-bg-sidebar-accent data-[active=true]:ds-font-medium data-[active=true]:ds-text-sidebar-accent-foreground data-[state=open]:hover:ds-bg-sidebar-accent data-[state=open]:hover:ds-text-sidebar-accent-foreground group-data-[collapsible=icon]:!ds-size-8 group-data-[collapsible=icon]:!ds-p-2 [&>span:last-child]:ds-truncate [&>svg]:ds-size-4 [&>svg]:ds-shrink-0',
  {
    variants: {
      variant: {
        default:
          'hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground',
        outline:
          'ds-bg-background ds-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground hover:ds-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'ds-h-8 ds-text-sm',
        sm: 'ds-h-7 ds-text-xs',
        lg: 'ds-h-12 ds-text-sm group-data-[collapsible=icon]:!ds-p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        'ds-absolute ds-right-1 ds-top-1.5 ds-flex ds-aspect-square ds-w-5 ds-items-center ds-justify-center ds-rounded-md ds-p-0 ds-text-sidebar-foreground ds-outline-none ds-ring-sidebar-ring ds-transition-transform hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground focus-visible:ds-ring-2 ds-peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:ds-size-4 [&>svg]:ds-shrink-0',
        // Increases the hit area of the button on mobile.
        'after:ds-absolute after:ds--inset-2 after:md:ds-hidden',
        'ds-peer-data-[size=sm]/menu-button:top-1',
        'ds-peer-data-[size=default]/menu-button:top-1.5',
        'ds-peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:ds-hidden',
        showOnHover &&
          'ds-group-focus-within/menu-item:opacity-100 ds-group-hover/menu-item:opacity-100 data-[state=open]:ds-opacity-100 ds-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:ds-opacity-0',
        className
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = 'SidebarMenuAction';

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      'ds-absolute ds-right-1 ds-flex ds-h-5 ds-min-w-5 ds-items-center ds-justify-center ds-rounded-md ds-px-1 ds-text-xs ds-font-medium ds-tabular-nums ds-text-sidebar-foreground ds-select-none ds-pointer-events-none',
      'ds-peer-hover/menu-button:text-sidebar-accent-foreground ds-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'ds-peer-data-[size=sm]/menu-button:top-1',
      'ds-peer-data-[size=default]/menu-button:top-1.5',
      'ds-peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:ds-hidden',
      className
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        'ds-rounded-md ds-h-8 ds-flex ds-gap-2 ds-px-2 ds-items-center',
        className
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="ds-size-4 ds-rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="ds-h-4 ds-max-w-[--skeleton-width] ds-flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      'ds-mx-3.5 ds-flex ds-min-w-0 ds-translate-x-px ds-flex-col ds-gap-1 ds-border-l ds-border-sidebar-border ds-px-2.5 ds-py-0.5',
      'group-data-[collapsible=icon]:ds-hidden',
      className
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = 'SidebarMenuSub';

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'ds-flex ds-h-7 ds-min-w-0 ds--translate-x-px ds-items-center ds-gap-2 ds-overflow-hidden ds-rounded-md ds-px-2 ds-text-sidebar-foreground ds-outline-none ds-ring-sidebar-ring hover:ds-bg-sidebar-accent hover:ds-text-sidebar-accent-foreground focus-visible:ds-ring-2 active:ds-bg-sidebar-accent active:ds-text-sidebar-accent-foreground disabled:ds-pointer-events-none disabled:ds-opacity-50 aria-disabled:ds-pointer-events-none aria-disabled:ds-opacity-50 [&>span:last-child]:ds-truncate [&>svg]:ds-size-4 [&>svg]:ds-shrink-0 [&>svg]:ds-text-sidebar-accent-foreground',
        'data-[active=true]:ds-bg-sidebar-accent data-[active=true]:ds-text-sidebar-accent-foreground',
        size === 'sm' && 'ds-text-xs',
        size === 'md' && 'ds-text-sm',
        'group-data-[collapsible=icon]:ds-hidden',
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
