import { config } from '@/config';
import type { Metadata } from 'next';

interface GetMetadataArgs {
  title?: string;
}

export function getMetadata({ title }: GetMetadataArgs = {}): Metadata {
  return {
    title: `${title ? `${title} | ` : ''}DS Pro`,
    description: 'Your Design System Engine',
    keywords: 'design system, devops, engine, design, system, design tokens',
    openGraph: {
      siteName: 'DS Pro',
      url: `${config.pageUrl}/api/og`,
      images: [`${config.pageUrl}/api/og`],
    },
  };
}
