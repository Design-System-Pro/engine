import { Button } from '@ds-project/components/server';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export const Default = {};
