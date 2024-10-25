import { FaqBanner } from '@/components/banners/faq-banner';
import { GetStartedBanner } from '@/components/banners/get-started-banner/get-started-banner';
import { SyncFigmaBanner } from '@/components/banners/sync-figma-banner';
import { VisionBanner } from '@/components/banners/vision-banner/vision-banner';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <>
      <div className="mx-4">
        <Hero />
      </div>
      <div className="flex-col gap-4 max-w-screen-lg m-4">
        <VisionBanner />

        <SyncFigmaBanner />

        <GetStartedBanner />

        <FaqBanner />
      </div>
    </>
  );
}
