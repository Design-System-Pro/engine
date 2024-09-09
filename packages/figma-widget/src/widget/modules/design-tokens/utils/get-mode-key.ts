import { collectionById } from './get-variable-collection';

export const getModeKey = async ({
  modeId,
  variableCollectionId,
}: {
  modeId: string;
  variableCollectionId: string;
}) => {
  const variableCollection = await collectionById(variableCollectionId);

  return (
    variableCollection?.modes.find((mode) => mode.modeId === modeId)?.name ??
    modeId
  ).toLowerCase();
};
