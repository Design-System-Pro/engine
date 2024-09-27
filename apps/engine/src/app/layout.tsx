import './globals.css';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/css';
import { AnalyticsProvider } from '@/lib/analytics/provider';
import { Toaster } from '@ds-project/components';
import { Favicon } from '@/components';
import dynamic from 'next/dynamic';
import { getMetadata } from '@/lib/metadata';
import { TooltipProvider } from '@ds-project/components';

const inter = Inter({ subsets: ['latin'] });

const AnalyticsPageView = dynamic(
  () =>
    import('./_components/analytics-page-view').then(
      (module) => module.AnalyticsPageView
    ),
  {
    ssr: false,
  }
);

export const metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <TooltipProvider>
        <AnalyticsProvider>
          <body
            className={cn(
              'flex flex-col items-center bg-white min-h-screen',
              inter.className
            )}
          >
            <AnalyticsPageView />
            {children}
            <Toaster />
          </body>
        </AnalyticsProvider>
      </TooltipProvider>
    </html>
  );
}
