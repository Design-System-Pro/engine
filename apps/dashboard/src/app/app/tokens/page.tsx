import { MainContent } from '@/components';
import { fetchReleases } from './_actions';
import { SelectReleases } from './_components';
import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata({ title: 'Tokens' });

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
