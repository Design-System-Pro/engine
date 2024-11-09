'use client';
import { Button, Input } from '@ds-project/components/server';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@ds-project/components/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateSettings } from '../_actions';
import { SupportButton } from '@/components';
import type { api } from '@ds-project/api/rsc';
import { config } from '@/config';

export function SettingsForm({
  integration,
  repositories,
  onSuccess,
  onCancel,
}: {
  integration: Awaited<ReturnType<typeof api.integrations.github>>;
  repositories?: { id: number; name: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    installationId: z.number(),
    repositoryId: z.coerce.number(),
    tokensPath: z.string().optional(),
    targetGitBranch: z.string().optional(),
    commitMessage: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      repositoryId: integration?.data.repositoryId,
      installationId: integration?.data.installationId,
      tokensPath: integration?.data.tokensPath,
      targetGitBranch: integration?.data.targetGitBranch,
      commitMessage: integration?.data.commitMessage,
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true);
      const result = await updateSettings({
        installationId: values.installationId,
        repositoryId: values.repositoryId,
        tokensPath: values.tokensPath,
        targetGitBranch: values.targetGitBranch,
        commitMessage: values.commitMessage,
      });
      setIsSubmitting(false);

      if (result?.serverError) {
        toast({
          title: 'Error',
          description: result.serverError,
          variant: 'destructive',
        });
      }

      if (result?.data?.success) {
        toast({
          title: 'Saved',
          description: 'GitHub settings have been saved',
          variant: 'default',
        });
        onSuccess?.();
      }
    },
    [onSuccess, toast]
  );

  return (
    <Form {...form}>
      <form
        className="flex grow flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex grow flex-col gap-4">
          <FormField
            control={form.control}
            name="repositoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository</FormLabel>
                <Select
                  defaultValue={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Repositories" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {repositories?.map((repository) => (
                      <SelectItem
                        key={repository.id}
                        value={repository.id.toString()}
                      >
                        {repository.name}
                      </SelectItem>
                    ))}
                    {repositories === undefined || repositories.length === 0 ? (
                      <SelectItem value="no-repositories" disabled={true}>
                        No access to repositories. Make sure the integration has
                        access to repositories.
                      </SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Repository where the tokens.json file will be pushed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tokensPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'eg. path/to/tokens/. Defaults to root.'}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Directory containing the tokens.json file.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetGitBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input placeholder={'eg. path/to/tokens'} {...field} />
                </FormControl>
                <FormDescription>
                  Target git branch where the tokens.json file will be pushed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commitMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commit Message</FormLabel>
                <FormControl>
                  <Input placeholder={config.defaultCommitMessage} {...field} />
                </FormControl>
                <FormDescription>
                  Commit message when synchronizing tokens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2 place-self-end">
          <SupportButton />
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Save changes {isSubmitting ? '...' : ''}
          </Button>
        </div>
      </form>
    </Form>
  );
}
