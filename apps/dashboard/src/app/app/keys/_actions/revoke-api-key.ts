'use server';

import { authorizedAction } from '@/lib/safe-action';
import { api } from '@ds-project/api/rsc';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const revokeApiKeyAction = authorizedAction
  .metadata({ actionName: 'revokeApiKeyAction' })
  .schema(
    zfd.formData({
      apiKeyId: zfd.text(z.string().max(256)),
    })
  )
  .action(async ({ parsedInput: { apiKeyId } }) => {
    await api.apiKeys.revoke({
      apiKeyId,
    });

    revalidatePath('/app/keys');
  });
