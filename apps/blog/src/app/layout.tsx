import type { Metadata } from 'next';
import { Fira_Sans, Fira_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

const fontSans = Fira_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const fontMono = Fira_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'DS Pro Blog',
  description: 'Insights about Design Systems and Frontend Development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased font-[family-name:var(--font-sans)]`}
      >
        <main className="mx-auto max-w-2xl px-4 py-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
