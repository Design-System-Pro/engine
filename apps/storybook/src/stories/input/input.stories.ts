import { Input } from '@ds-project/components';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    type: 'email',
    placeholder: 'Email',
  },
} satisfies Meta<typeof Input>;

export const Default = {};
