import type { InferSelectModel } from 'drizzle-orm';
import { Text } from '@ds-project/components';
import type { figmaFilesTable } from '@/lib/drizzle/schema';
import { FigmaFile } from './figma-file';

interface FilesListProps {
  files: InferSelectModel<typeof figmaFilesTable>[];
}
export function FilesList({ files }: FilesListProps) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {files.map((file) => (
        <li key={file.fileKey}>
          <FigmaFile {...file} />
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
