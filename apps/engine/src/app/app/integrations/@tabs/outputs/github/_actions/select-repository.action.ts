'use server';

import { eq } from 'drizzle-orm';

import {
  githubIntegrationSchema,
  Integrations,
  integrationType,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';
import { authorizedAction } from '@/lib/safe-action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const selectRepository = authorizedAction
  .metadata({ actionName: 'selectRepository' })
  .schema(
    z.object({
      installationId: z.number(),
      repositoryId: z.number(),
      tokensPath: z.string().optional(),
    })
  )
  .outputSchema(
    z.object({
      success: z.literal(true),
    })
  )
  .action(
    async ({ parsedInput: { installationId, repositoryId, tokensPath } }) => {
      const validatedData = await githubIntegrationSchema.parseAsync({
        type: integrationType.enum.github,
        installationId,
        repositoryId,
        tokensPath,
      });

      await database
        .update(Integrations)
        .set({
          data: validatedData,
        })
        .where(eq(Integrations.type, integrationType.Enum.github));

      revalidatePath('/app/integrations/output');
      return { success: true };
    }
  );
