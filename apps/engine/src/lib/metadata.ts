import { config } from '@/config';
import type { Metadata } from 'next';

interface GetMetadataArgs {
  title?: string;
}

export function getMetadata({ title: _title }: GetMetadataArgs = {}): Metadata {
  const title = `${_title ? `${_title} | ` : ''}DS Pro`;
  const description = 'Your Design System Engine';
  return {
    title,
    description,
    keywords:
      'design system, devops, engine, design, system, design tokens, figma, figma widget',
    openGraph: {
      siteName: 'DS Pro',
      title,
      description,
      url: `${config.pageUrl}/api/og`,
      images: [`${config.pageUrl}/api/og`],
    },
  };
}
