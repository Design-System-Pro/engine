import './globals.css';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/css';
import { Toaster } from '@ds-project/components';
import { Favicon } from '@/components';
import { getMetadata } from '@/lib/metadata';
import { TooltipProvider } from '@ds-project/components';
import { AnalyticsProvider, PageTracker } from '@ds-project/services/analytics';

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
            <PageTracker />
            {children}
            <Toaster />
          </body>
        </AnalyticsProvider>
      </TooltipProvider>
    </html>
  );
}
