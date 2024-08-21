import { z } from 'zod';

import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { InsertResourcesSchema, Resources } from '@ds-project/database/schema';

export const resourcesRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  byProjectId: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findMany({
        with: {
          project: {
            with: {
              resources: true,
              accountsToProjects: {
                where: (accountsToProjects) =>
                  eq(accountsToProjects.projectId, input.projectId),
              },
            },
          },
        },
      });
    }),

  link: protectedProcedure
    .input(InsertResourcesSchema.pick({ name: true, projectId: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input);
    }),

  updateDesignTokens: protectedProcedure
    .input(InsertResourcesSchema.pick({ designTokens: true, name: true }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.database
        .update(Resources)
        .set(input)
        .where(eq(Resources.name, input.name));
      // TODO: Run update to Integration here ---> GitHub

      /**
       * // Update Github - TODO: turn into "update integrations" actions
    const githubIntegration = await api.integrations.github();

    if (!githubIntegration) {
      throw new Error('No GitHub integration found');
    }

    const octokit = await getInstallationOctokit(
      githubIntegration.data.installationId
    );

    const repositories = await octokit.request(
      'GET /installation/repositories'
    );

    const repository = repositories.data.repositories.find(
      (_repository) => _repository.id === githubIntegration.data.repositoryId
    );

    if (!repository) throw new Error('No repository found');

    const base64Content = btoa(
      JSON.stringify(validatedData.designTokens, null, 2)
    );
    await pushFile({
      file: {
        content: base64Content,
        encoding: 'base64',
        name: `/tokens.json`,
        path: `${config.gitTokensPath}`,
      },
      installationId: githubIntegration.data.installationId,
      owner: repository.owner.login,
      repo: repository.name,
    });
       */
      return result;
    }),

  create: protectedProcedure
    .input(InsertResourcesSchema)
    .mutation(({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.database.delete(Resources).where(eq(Resources.id, input.id));
    }),
});
