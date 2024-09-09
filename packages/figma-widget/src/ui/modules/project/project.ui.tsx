import { useCallback, useEffect, useState } from 'react';
import { useProjects } from '../providers/projects-provider';
import { Message, MessageType } from '@ds-project/figma-utilities';
import { Icons, Separator, Text } from '@ds-project/components';

export function ProjectUI() {
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

  const onValueChange = useCallback(
    (projectId: string) => {
      linkProject(projectId);
    },
    [linkProject]
  );

  if (!isVisible) return null;

  if (isProjectsLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full p-2">
      <Text weight="bold" size="lg">
        <h1>Select project</h1>
      </Text>
      <ul>
        {projects?.map(({ id, name }, index) => (
          <li key={id}>
            <button
              onClick={() => onValueChange(id)}
              className="w-full px-4 py-2 rounded-md flex items-center gap-4 hover:bg-gray-100"
            >
              {selectedProjectId === id ? <Icons.CheckIcon /> : null}
              {name}
            </button>
            {index < projects.length - 1 ? <Separator /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
