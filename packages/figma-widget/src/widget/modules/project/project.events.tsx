import { Message, MessageType } from '@ds-project/figma-messaging';
import { useEffect } from '../../lib/widget';
import { useSyncedLinkedProject } from '../state';
import { useUI } from '../../hooks/ui';

export function ProjectEvents() {
  const { close } = useUI();
  const [syncedLinkedProject, setSyncedLinkedProject] =
    useSyncedLinkedProject();

  useEffect(() => {
    Message.widget.handle(MessageType.GetLinkedProject, () => {
      return Promise.resolve({ project: syncedLinkedProject });
    });

    Message.widget.handle(MessageType.LinkProject, ({ id, name }) => {
      setSyncedLinkedProject({ id, name });
      close();
      return Promise.resolve({});
    });
  });

  return null;
}
