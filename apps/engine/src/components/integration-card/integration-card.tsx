'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
} from '@ds-project/components';
import type { ReactNode } from 'react';

interface IntegrationCardProps {
  name: string;
  description: string;
  logo: ReactNode;
  disabled?: boolean;

  children: ReactNode;
}

export function IntegrationCard({
  logo,
  name,
  description,
  disabled = false,
  children,
}: IntegrationCardProps) {
  return (
    <Card
      className={cn('max-w-xs justify-between flex flex-col', {
        ['opacity-70']: disabled,
      })}
    >
      <CardHeader>
        {logo}
        <CardTitle size="base">
          <h2>{name}</h2>
        </CardTitle>
        <CardDescription>
          <p>{description}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">{children}</CardFooter>
    </Card>
  );
}
