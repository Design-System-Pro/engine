'use server';

import { api } from '@/lib/trpc/server';

export async function getResource(resourceId: string) {
  return api.resources.byId({ id: resourceId });
}
