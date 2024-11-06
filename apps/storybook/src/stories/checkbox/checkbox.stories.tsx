import { Checkbox } from '@ds-project/components/client';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export const Default = {};
