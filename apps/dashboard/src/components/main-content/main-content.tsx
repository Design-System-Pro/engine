import { Text } from '@ds-project/components';
import type { ReactNode } from 'react';

interface MainContentProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function MainContent({
  title,
  description,
  children,
}: MainContentProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full flex-col items-center gap-2 border-b border-slate-200 px-4 py-8">
        <div className="flex w-full max-w-screen-xl flex-col">
          <Text size="3xl" weight="medium">
            <h1>{title}</h1>
          </Text>
          <Text mood="muted" size="sm">
            <p>{description}</p>
          </Text>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-4">
        <div className="flex w-full max-w-screen-xl flex-col">{children}</div>
      </div>
    </div>
  );
}
