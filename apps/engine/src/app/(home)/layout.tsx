import { Footer } from '@/components/footer';
import { HomeNavigation } from '@/components/home-navigation';
import './home.css';
import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="landing-bg" />
      <header className="sticky top-0 w-full flex justify-center z-10">
        <HomeNavigation />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center py-2">
        {children}
      </main>
      <Footer />
    </>
  );
}
