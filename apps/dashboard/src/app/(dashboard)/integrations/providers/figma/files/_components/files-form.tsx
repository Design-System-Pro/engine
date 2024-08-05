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
import { registerFile } from '../_actions';
import type { DataSchema } from '../_schemas/schema';
import { dataSchema } from '../_schemas/schema';
import { FilePreview } from './file-preview';

export function FilesForm() {
  const form = useForm<DataSchema>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      figmaFileUrl: '',
    },
  });

  const figmaFileUrl = form.watch('figmaFileUrl');

  return (
    <Form {...form}>
      <form action={registerFile}>
        <FormField
          control={form.control}
          name="figmaFileUrl"
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
        <FilePreview figmaFileUrl={figmaFileUrl} />
        <Button type="submit">Add file</Button>
      </form>
    </Form>
  );
}
