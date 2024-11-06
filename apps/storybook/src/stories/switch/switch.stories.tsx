import { Label } from '@ds-project/components/server';
import { Switch } from '@ds-project/components/client';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Switch',
  component: Switch,
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export const Default = {};
