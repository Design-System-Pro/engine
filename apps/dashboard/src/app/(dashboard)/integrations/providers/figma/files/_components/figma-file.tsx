import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { formatDistance, subDays } from 'date-fns';
import Image from 'next/image';

interface FigmaFileProps {
  fileKey: string;
  name: string;
  lastModified?: string;
  thumbnailUrl?: string;
}
export function FigmaFile({
  lastModified,
  name,
  thumbnailUrl,
}: FigmaFileProps) {
  const lastModifiedDistance = lastModified
    ? formatDistance(subDays(lastModified, 3), new Date(), {
        addSuffix: true,
      })
    : null;

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle size="base">
          <p>{name}</p>
        </CardTitle>
        <CardDescription size="sm">
          <p>{`Last modified: ${lastModifiedDistance ? lastModifiedDistance : 'Unknown'}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {thumbnailUrl ? (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={`Preview of figma file named "${name}".`}
              className="size-full object-contain"
              fill
              src={thumbnailUrl}
            />
          </AspectRatio>
        ) : // TODO: make a placeholder in case there's no thumbnail
        null}
      </CardContent>
    </Card>
  );
}
