'use client';

import {
  AspectRatio,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatDistance, subDays } from 'date-fns';
import { getFilePreview } from '../_actions';

interface FilePreviewProps {
  figmaFileUrl?: string;
}

export function FilePreview({ figmaFileUrl }: FilePreviewProps) {
  const [filePreviewData, setFilePreviewData] =
    useState<Awaited<ReturnType<typeof getFilePreview>>>();

  useEffect(() => {
    if (!figmaFileUrl) return;

    getFilePreview({ figmaFileUrl })
      .then(setFilePreviewData)
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Failed to get file preview', error);
      });
  }, [figmaFileUrl]);

  return filePreviewData ? (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle size="base">
          <p>{filePreviewData.name}</p>
        </CardTitle>
        <CardDescription size="sm">
          <p>
            Last modified:{' '}
            {formatDistance(
              subDays(filePreviewData.lastModified, 3),
              new Date(),
              { addSuffix: true }
            )}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <Image
            alt={filePreviewData.name}
            className="size-full object-contain"
            fill
            src={filePreviewData.thumbnailUrl}
          />
        </AspectRatio>
      </CardContent>
    </Card>
  ) : null;
}
