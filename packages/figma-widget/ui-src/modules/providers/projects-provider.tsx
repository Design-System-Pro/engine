import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { api } from '@ds-project/api/react';
import { useConfig } from './config-provider';
import type { SelectProjects } from '../../../../database/src/schema/projects';
import { MessageType, Message } from '@ds-project/figma-messaging';

interface ContextType {
  selectedProjectId?: string;
  linkProject: (projectId: string) => Promise<void>;
  projects?: Pick<SelectProjects, 'id' | 'name'>[];
  isLoading: boolean;
}

const Context = createContext<ContextType>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  linkProject: async () => {},
  selectedProjectId: undefined,
  projects: undefined,
});

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { fileName } = useConfig();
  const [selectedProjectId, setSelectedProjectId] = useState<string>();
  const { data: projects, isLoading: isProjectsLoading } =
    api.projects.account.useQuery();
  const { mutate: linkResource } = api.resources.link.useMutation();

  useEffect(() => {
    Message.ui
      .request({
        type: MessageType.GetLinkedProject,
      })
      .then(({ project }) => {
        console.log({ project });
        if (!project) return;
        setSelectedProjectId(project.id);
      })
      .catch((error) => {
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  const linkProject = useCallback(
    async (projectId: string) => {
      const linkedProjectName = projects?.find(
        (project) => project.id === projectId
      )?.name;
      console.log('fileName', fileName);
      if (!linkedProjectName || !fileName) return;

      linkResource({ projectId, name: fileName });
      await Message.ui.send({
        type: MessageType.LinkProject,
        name: linkedProjectName,
        id: projectId,
      });
    },
    [fileName, linkResource, projects]
  );

  const value = useMemo(
    () => ({
      linkProject,
      selectedProjectId,
      isLoading: isProjectsLoading,
      projects: projects?.map(({ id, name }) => ({ id, name })),
    }),
    [linkProject, selectedProjectId, isProjectsLoading, projects]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProjects() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useProject should be used within <ProjectProvider>');
  }

  return context;
}
