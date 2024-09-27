import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@ds-project/components';
import { Meta } from '@storybook/react';

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
