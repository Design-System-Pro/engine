import { Checkbox, Label } from '@ds-project/components';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Label',
  component: Label,
  render: () => (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  ),
} satisfies Meta<typeof Label>;

export const Default = {};
