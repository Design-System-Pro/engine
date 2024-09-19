import { Text } from '@ds-project/components';
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
    <div className="flex w-full flex-col items-center grow">
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
      <div className="pt-2 flex w-full flex-col items-center px-4 bg-white grow">
        <div className="flex w-full max-w-screen-xl flex-col">{children}</div>
      </div>
    </div>
  );
}
