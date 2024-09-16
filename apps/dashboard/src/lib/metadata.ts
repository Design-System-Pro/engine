import { clientEnv } from '@/env/client';
import type { Metadata } from 'next';

interface GetMetadataArgs {
  title?: string;
}

export function getMetadata({ title }: GetMetadataArgs = {}): Metadata {
  return {
    title: `${title ? `${title} | ` : ''}DS Pro`,
    description: 'Design System DevOps Engine',
    keywords: 'design system, devops, engine, design, system, design tokens',
    openGraph: {
      siteName: 'DS Pro',
      url: `https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}/api/og`,
      images: [`https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}/api/og`],
    },
  };
}
