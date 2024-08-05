'use client';

import { useEffect, useState } from 'react';
import { getFilePreview } from '../_actions';
import { FigmaFile } from './figma-file';

interface FilePreviewProps {
  figmaFileUrl?: string;
}

export function FilePreview({ figmaFileUrl }: FilePreviewProps) {
  const [filePreviewData, setFilePreviewData] =
    useState<Awaited<ReturnType<typeof getFilePreview>>>();

  useEffect(() => {
    if (!figmaFileUrl) return;

    getFilePreview({ url: figmaFileUrl })
      .then(setFilePreviewData)
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Failed to get file preview', error);
      });
  }, [figmaFileUrl]);

  return filePreviewData ? <FigmaFile {...filePreviewData} /> : null;
}
