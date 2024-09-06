import { closeUI, Message, MessageType } from '@ds-project/figma-messaging';
import { ProjectSelector } from '../components/project';
import { useSyncedCredentials, useSyncedLinkedProject } from './state';
import { useEffect } from '../lib/widget';

export function Project() {
  const [syncedCredentials] = useSyncedCredentials();
  const [syncedLinkedProject, setSyncedLinkedProject] =
    useSyncedLinkedProject();

  useEffect(() => {
    Message.widget.handle(MessageType.GetLinkedProject, () => {
      return Promise.resolve({ project: syncedLinkedProject });
    });

    Message.widget.handle(MessageType.LinkProject, ({ id, name }) => {
      setSyncedLinkedProject({ id, name });
      closeUI();
      return Promise.resolve({});
    });
  });

  const onProjectSelect = async () => {
    await new Promise(() => {
      void Message.widget.send({
        type: MessageType.OpenLinkProject,
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
