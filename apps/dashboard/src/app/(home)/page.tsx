import { GetStartedBanner } from '@/components/banners/get-started-banner/get-started-banner';
import { VisionBanner } from '@/components/banners/vision-banner/vision-banner';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <>
      <div className="mx-4">
        <Hero />
      </div>
      <div className="max-w-screen-lg mx-4">
        <VisionBanner />
        <GetStartedBanner />
      </div>
    </>
  );
}
