import { FigmaFile } from './figma-file';

interface FilePreviewProps {
  thumbnailUrl?: string;
  name?: string;
  lastModified?: string;
}

export function FilePreview({
  lastModified,
  name,
  thumbnailUrl,
}: FilePreviewProps) {
  return lastModified && name && thumbnailUrl ? (
    <FigmaFile
      className="max-w-sm"
      lastModified={lastModified}
      name={name}
      thumbnailUrl={thumbnailUrl}
    />
  ) : null;
}
