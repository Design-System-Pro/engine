import { MainContent } from '@/components';
import { fetchReleases } from './_actions';
import { SelectReleases } from './_components';
import { getMetadata } from '@/lib/metadata';
import { Text } from '@ds-project/components/server';

export const metadata = getMetadata({ title: 'Tokens' });

export default async function Tokens() {
  const releases = await fetchReleases();

  return (
    <MainContent
      description="Inspect the design tokens releases."
      title="Releases"
    >
      {(releases?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-4">
          <SelectReleases releases={releases} />
        </div>
      ) : (
        <Text>
          <p>
            No releases yet. Connect an input and an output to create a release.
          </p>
        </Text>
      )}
    </MainContent>
  );
}
