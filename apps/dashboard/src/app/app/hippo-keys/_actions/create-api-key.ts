'use server';

import { authorizedAction } from '@/lib/safe-action';
import { api } from '@ds-project/api/rsc';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const createApiKeyAction = authorizedAction
  .metadata({ actionName: 'createApiKeyAction' })
  .schema(
    zfd.formData({
      description: zfd.text(z.string().max(256)),
    })
  )
  .action(async ({ parsedInput: { description: description } }) => {
    const apiKey = await api.apiKeys.create({
      description,
    });

    // revalidatePath('/app/keys');

    return apiKey;
  });
