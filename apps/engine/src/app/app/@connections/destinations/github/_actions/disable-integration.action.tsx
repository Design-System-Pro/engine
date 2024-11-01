'use server';

import { and, eq } from 'drizzle-orm';

import { Integrations, integrationType } from '@ds-project/database/schema';
import { authorizedAction } from '@/lib/safe-action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const disableIntegration = authorizedAction
  .metadata({ actionName: 'disableIntegration' })
  .outputSchema(
    z.object({
      success: z.literal(true),
    })
  )
  .action(async ({ ctx }) => {
    await ctx.database
      .delete(Integrations)
      .where(and(eq(Integrations.type, integrationType.Enum.github)));

    revalidatePath('/app/destinations');
    return { success: true };
  });
