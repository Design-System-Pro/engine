'use server';

import { api } from '@ds-project/api/rsc';

export async function getResource(resourceId: string) {
  return api.resources.getById({ id: resourceId });
}
