import { Button } from '@ds-project/components/server';
import {
  Toast,
  ToastAction,
  Toaster,
  useToast,
} from '@ds-project/components/client';
import type { Meta } from '@storybook/react';

function ToastStory() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up ',
          description: 'Friday, February 10, 2023 at 5:57 PM',
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }}
    >
      Add to calendar
    </Button>
  );
}

export default {
  title: 'Components/Toast',
  component: Toast,
  render: () => (
    <>
      <ToastStory />
      <Toaster />
    </>
  ),
} satisfies Meta<typeof Toast>;

export const Default = {};
