import { Badge } from '@ds-project/components/server';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export const Default = {};
