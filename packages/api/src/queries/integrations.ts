import { eq } from '@ds-project/database';
import type { DSContext } from '../types/context';

export const selectGithubIntegration = async ({ ctx }: { ctx: DSContext }) => {
  const queryResult = await ctx.database.query.Integrations.findFirst({
    columns: {
      data: true,
    },
    where: (integrations) => eq(integrations.type, 'github'),
    with: {
      project: {
        columns: {
          id: true,
        },
        with: {
          accountsToProjects: {
            columns: {
              projectId: true,
            },
            where: (accountsToProjects) =>
              eq(accountsToProjects.accountId, ctx.account.id),
          },
        },
      },
    },
  });

  if (queryResult?.data?.type === 'github') {
    return {
      ...queryResult,
      data: queryResult.data,
    };
  }

  return undefined;
};
