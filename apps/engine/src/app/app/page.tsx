import { MainContent } from '@/components';
import { FaqBanner } from '@/components/banners/faq-banner';

export default function Home() {
  return (
    <MainContent
      description="DS Pro is in early-release stage"
      title="Welcome 👋"
    >
      <FaqBanner />
    </MainContent>
  );
}
