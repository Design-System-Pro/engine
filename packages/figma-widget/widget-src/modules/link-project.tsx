import { Message, MessageType } from '@ds-project/figma-messaging';
import { ProjectSelector } from '../components/project';
import { useSyncedCredentials, useSyncedProjectName } from './state';

export function LinkProject() {
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();
  const [syncedProjectName, setSyncedProjectName] = useSyncedProjectName();

  if (!syncedCredentials) {
    return null;
  }

  const onProjectSelect = async () => {
    await new Promise(() => {
      void Message.widget.send({
        type: MessageType.OpenLinkProject,
      });
    });
  };

  return (
    <ProjectSelector
      onProjectSelect={onProjectSelect}
      selectedProject={syncedProjectName}
    />
  );
}
