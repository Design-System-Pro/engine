import {
  Alert,
  AlertDescription,
  AlertTitle,
  LucideIcons,
} from '@ds-project/components/server';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Alert',
  component: Alert,
  render: () => (
    <Alert>
      <LucideIcons.Terminal className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export const Default = {};
