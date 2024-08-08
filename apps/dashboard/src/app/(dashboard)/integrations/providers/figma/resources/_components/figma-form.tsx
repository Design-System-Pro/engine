'use client';

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ds-project/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { getFilePreview, registerFile } from '../_actions';
import type { DataSchema } from '../_schemas/schema';
import { figmaFileSchema } from '../_schemas/schema';
import { FilePreview } from './file-preview';

export function FigmaForm() {
  const form = useForm<DataSchema>({
    resolver: zodResolver(figmaFileSchema),
    defaultValues: {
      url: '',
    },
  });

  const url = form.watch('url');

  useEffect(() => {
    if (!url) return;

    getFilePreview({ url })
      .then((file) => {
        if (!file) return;

        form.setValue('name', file.name);
        form.setValue('lastModified', file.lastModified);
        form.setValue('thumbnailUrl', file.thumbnailUrl);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Failed to get file preview', error);
      });
  }, [form, url]);

  const name = form.watch('name');
  const lastModified = form.watch('lastModified');
  const thumbnailUrl = form.watch('thumbnailUrl');

  return (
    <Form {...form}>
      <form action={registerFile} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Figma File URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.figma.com/design/..."
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Hidden Inputs - only to provide info to the submission */}
        <FormField
          control={form.control}
          name="lastModified"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Last modified</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenId"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Token ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FilePreview
          lastModified={lastModified}
          name={name}
          thumbnailUrl={thumbnailUrl}
        />

        <Button type="submit">Add file</Button>
      </form>
    </Form>
  );
}
