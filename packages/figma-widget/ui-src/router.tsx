import { useEffect } from 'react';
import { Auth } from './modules/auth';
import { MessageType, Message } from '@ds-project/figma-messaging';
import { LinkProject } from './modules/link-project';

export function Router() {
  useEffect(() => {
    // Announce to the plugin that the UI is ready to receive messages
    void Message.ui.send({
      type: MessageType.UIIsReady,
    });
  }, []);

  return (
    <>
      <Auth />
      <LinkProject />
      {/* <Variables /> */}
    </>
  );
}
