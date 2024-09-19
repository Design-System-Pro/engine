import * as React from 'react';
import { cn } from '@/utils';
import { Text } from '@/text';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'ds-rounded-lg ds-border ds-bg-card ds-text-card-foreground ds-shadow-sm',
      className
    )}
    ref={ref}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('ds-flex ds-flex-col ds-space-y-1.5 ds-p-6', className)}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLElement,
  React.ComponentProps<typeof Text>
>(({ children, ...props }, ref) => (
  <Text size="2xl" weight="semibold" ref={ref} {...props}>
    {children}
  </Text>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLElement,
  React.ComponentProps<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    size="sm"
    className={cn('ds-text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn('ds-p-6 ds-pt-0', className)} ref={ref} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('ds-flex ds-items-center ds-p-6 ds-pt-0', className)}
    ref={ref}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
