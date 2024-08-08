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
  const [designSystems, setDesignSystems] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedDesignSystemId, setSelectedDesignSystemId] =
    useState<string>();
  const { state } = useAuth();
  const { getDesignSystems, linkDesignSystem } = useDSApi();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignSystem,
      })
      .then(({ designSystemId }) => {
        if (!designSystemId) return;
        setSelectedDesignSystemId(designSystemId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  useEffect(() => {
    if (state !== 'authorized') return;

    getDesignSystems()
      .then((data) => {
        setDesignSystems(data.designSystems);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design systems', error);
      });
  }, [getDesignSystems, state]);

  const onValueChange = useCallback(
    (designSystemId: string) => {
      void linkDesignSystem(designSystemId);
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.SetDesignSystem,
        designSystemId,
      });
    },
    [linkDesignSystem]
  );

  return (
    <Select onValueChange={onValueChange} value={selectedDesignSystemId}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select a design system" />
      </SelectTrigger>
      <SelectContent>
        {designSystems.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
