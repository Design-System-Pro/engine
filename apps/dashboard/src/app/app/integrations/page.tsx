import { MainContent } from '@/components';
import { GithubProvider } from './providers/github/_components';
import { FigmaProvider } from './providers/figma/_components';

export default function Page() {
  return (
    <MainContent
      description="Authorize and manage integrations"
      title="Integrations"
    >
      <div className="flex flex-col gap-2">
        <GithubProvider />
        <FigmaProvider />
      </div>
    </MainContent>
  );
}
