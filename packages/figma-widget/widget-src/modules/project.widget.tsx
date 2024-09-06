import { Message, MessageType } from '@ds-project/figma-messaging';
import { ProjectSelector } from '../components/project';
import { useSyncedCredentials, useSyncedLinkedProject } from './state';
import { useEffect } from '../lib/widget';
import { useUI } from '../hooks/ui';

export function Project() {
  const { open, close } = useUI();
  const [syncedCredentials] = useSyncedCredentials();
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

  const onProjectSelect = async () => {
    await new Promise(() => {
      open()
        .then(() => {
          void Message.widget.send({
            type: MessageType.OpenLinkProject,
          });
        })
        .catch((error) => {
          console.error('Error opening UI', error);
        });
    });
  };

  if (!syncedCredentials || syncedLinkedProject) {
    return null;
  }

  return (
    <ProjectSelector
      onProjectSelect={onProjectSelect}
      selectedProject={syncedLinkedProject}
    />
  );
}
