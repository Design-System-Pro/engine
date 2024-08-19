import type { InferSelectModel } from 'drizzle-orm';
import { Text } from '@ds-project/components';
import Link from 'next/link';
import { FigmaFile } from './figma-file';
import type { resourcesTable } from '@ds-project/database/schema';

interface ResourcesListProps {
  resources: InferSelectModel<typeof resourcesTable>[];
}
export function ResourcesList({ resources }: ResourcesListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => (
        <li className="flex shrink grow basis-0" key={resource.id}>
          <Link
            className="flex shrink grow basis-0"
            href={`/integrations/providers/figma/resources/${resource.id}`}
          >
            <FigmaFile {...resource} />
          </Link>
        </li>
      ))}
      {resources.length === 0 && (
        <Text mood="muted">
          <p>No files linked yet.</p>
        </Text>
      )}
    </ul>
  );
}
