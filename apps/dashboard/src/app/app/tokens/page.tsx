import { MainContent } from '@/components';
import { fetchReleases } from './_actions';
import { SelectReleases } from './_components';

export default async function Tokens() {
  const releases = await fetchReleases();

  return (
    <MainContent
      description="Inspect the design tokens releases."
      title="Design Tokens"
    >
      <div className="flex flex-col gap-4">
        <SelectReleases releases={releases} />
      </div>
    </MainContent>
  );
}
