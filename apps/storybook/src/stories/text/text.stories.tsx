import { Text } from '@ds-project/components/server';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Text',
  component: Text,
  args: {
    children: 'Text',
  },
} satisfies Meta<typeof Text>;

export const Default = {};
