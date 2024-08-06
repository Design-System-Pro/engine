import type { InferSelectModel } from 'drizzle-orm';
import { Text } from '@ds-project/components';
import Link from 'next/link';
import type { figmaFilesTable } from '@/lib/drizzle/schema';
import { FigmaFile } from './figma-file';

interface FilesListProps {
  files: InferSelectModel<typeof figmaFilesTable>[];
}
export function FilesList({ files }: FilesListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {files.map((file) => (
        <li className="flex shrink grow basis-0" key={file.fileKey}>
          <Link
            className="flex shrink grow basis-0"
            href={`/integrations/providers/figma/files/${file.id}`}
          >
            <FigmaFile {...file} />
          </Link>
        </li>
      ))}
      {files.length === 0 && (
        <Text mood="muted">
          <p>No files linked yet.</p>
        </Text>
      )}
    </ul>
  );
}
