import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ds-project/components/client';
import type { Meta } from '@storybook/react';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/tomasfrancisco.png"
        alt="@tomasfrancisco"
      />
      <AvatarFallback>TF</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export const Default = {};
