import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/css';
import { AnalyticsProvider } from '@/lib/analytics/provider';
import { Toaster } from '@ds-project/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DS Project',
  description: 'Manage Design System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AnalyticsProvider>
        <body
          className={cn(
            'flex flex-col items-center bg-zinc-100 min-h-screen',
            inter.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </AnalyticsProvider>
    </html>
  );
}
