import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useProjects } from './providers/projects-provider';

export function LinkProject() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    isLoading: isProjectsLoading,
    linkProject,
    projects,
    selectedProjectId,
  } = useProjects();

  useEffect(() => {
    Message.ui.handle(MessageType.OpenLinkProject, () => {
      setIsVisible(true);
      return Promise.resolve({});
    });
  });

  useEffect(() => {
    if (!selectedProjectId) return;
    const linkedProjectName = projects?.find(
      (project) => project.id === selectedProjectId
    )?.name;
    if (!linkedProjectName) return;

    void Message.ui.send({
      type: MessageType.LinkProject,
      linkedProjectName,
    });
  }, [projects, selectedProjectId]);

  const onValueChange = useCallback(
    async (projectId: string) => {
      await linkProject(projectId);
    },
    [linkProject]
  );

  if (!isVisible) return null;

  return (
    <Select onValueChange={onValueChange} value={selectedProjectId}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue
          placeholder={isProjectsLoading ? 'Loading...' : 'Select a project'}
        />
      </SelectTrigger>
      <SelectContent>
        {projects?.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
