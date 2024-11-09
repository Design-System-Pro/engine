import './globals.css';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/css';
import { AnalyticsProvider } from '@/lib/analytics/provider';
import { Toaster } from '@ds-project/components/client';
import { TooltipProvider } from '@ds-project/components/client';
import { Favicon } from '@/components';
import { getMetadata } from '@/lib/metadata';

import { AnalyticsTracker } from './_components/analytics-tracker';

const inter = Inter({ subsets: ['latin'] });
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
            <AnalyticsTracker />
            {children}
            <Toaster />
          </body>
        </AnalyticsProvider>
      </TooltipProvider>
    </html>
  );
}
