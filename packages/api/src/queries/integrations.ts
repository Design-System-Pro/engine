import { eq } from '@ds-project/database';
import type { DSContext } from '../types/context';
import { AccountsToProjects, Integrations } from '@ds-project/database/schema';

export const selectGithubIntegration = async ({ ctx }: { ctx: DSContext }) => {
  const [queryResult] = await ctx.database
    .select({
      data: Integrations.data,
    })
    .from(Integrations)
    .leftJoin(
      AccountsToProjects,
      eq(AccountsToProjects.projectId, Integrations.projectId)
    )
    .where(eq(AccountsToProjects.accountId, ctx.account.id))
    .limit(1);

  if (queryResult?.data?.type === 'github') {
    return {
      ...queryResult,
      data: queryResult.data,
    };
  }

  return undefined;
};

export const selectFigmaIntegration = async ({ ctx }: { ctx: DSContext }) => {
  const [queryResult] = await ctx.database
    .select({
      data: Integrations.data,
    })
    .from(Integrations)
    .leftJoin(
      AccountsToProjects,
      eq(AccountsToProjects.projectId, Integrations.projectId)
    )
    .where(eq(AccountsToProjects.accountId, ctx.account.id))
    .limit(1);

  if (queryResult?.data?.type === 'figma') {
    return {
      ...queryResult,
      data: queryResult.data,
    };
  }

  return undefined;
};
