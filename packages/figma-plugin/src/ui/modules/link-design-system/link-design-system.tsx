import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';
import { useDSApi } from '../providers/ds-api-provider';
import { useAuth } from '../providers/auth-provider';

export function LinkDesignSystem() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>();
  const { state } = useAuth();
  const { getProjects, linkProject } = useDSApi();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetProjectId,
      })
      .then(({ projectId }) => {
        if (!projectId) return;
        setSelectedProjectId(projectId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  useEffect(() => {
    if (state !== 'authorized') return;

    getProjects()
      .then((data) => {
        setProjects(data.projects);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design systems', error);
      });
  }, [getProjects, state]);

  const onValueChange = useCallback(
    (projectId: string) => {
      void linkProject(projectId);
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.SetProjectId,
        projectId,
      });
    },
    [linkProject]
  );

  return (
    <Select onValueChange={onValueChange} value={selectedProjectId}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
