import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata({ title: 'Sign in' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        'min-h-screen flex flex-col justify-center items-center w-full'
      }
    >
      {children}
    </div>
  );
}
