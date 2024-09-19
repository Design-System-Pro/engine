'use client';
import { config } from '@/config';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@ds-project/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { selectRepository } from '../_actions';
import { SupportButton } from '@/components';

export function SettingsForm({
  installationId,
  selectedRepositoryId,
  repositories,
  onSuccess,
  onCancel,
}: {
  installationId: number;
  selectedRepositoryId?: number;
  repositories?: { id: number; name: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    installationId: z.number(),
    repositoryId: z.number(),
    tokensPath: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      repositoryId: selectedRepositoryId,
      installationId,
      tokensPath: config.defaultGitTokensPath,
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true);
      const result = await selectRepository({
        installationId: values.installationId,
        repositoryId: values.repositoryId,
        tokensPath: values.tokensPath,
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
        className="flex flex-col grow"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow gap-4">
          <FormField
            control={form.control}
            name="repositoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository</FormLabel>
                <Select
                  defaultValue={field.value.toString()}
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
                        value={String(repository.id)}
                      >
                        {repository.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tokensPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tokens path</FormLabel>
                <FormControl>
                  <Input placeholder={'eg. path/to/tokens'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 justify-between items-center place-self-end">
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
