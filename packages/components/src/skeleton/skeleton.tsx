import { cn } from '@/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ds-animate-pulse ds-rounded-md ds-bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
