import { Text } from '@ds-project/components/server';
import type { ReactNode } from 'react';

interface MainContentProps {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function MainContent({
  title,
  description,
  children,
  actions,
}: MainContentProps) {
  return (
    <div className="flex w-full grow flex-col items-center bg-zinc-50">
      <div className="flex w-full justify-center gap-2 border-b border-slate-200 px-4 py-8">
        <div className="flex w-full max-w-screen-xl justify-between">
          <div className="flex flex-col gap-2">
            <Text size="3xl" weight="medium">
              <h1>{title}</h1>
            </Text>
            <Text mood="muted" size="sm">
              <p>{description}</p>
            </Text>
          </div>
          <div>{actions}</div>
        </div>
      </div>
      <div className="flex w-full grow flex-col items-center bg-white px-4 pt-2">
        <div className="flex w-full max-w-screen-xl flex-col">{children}</div>
      </div>
    </div>
  );
}
