import { collectionById } from './get-variable-collection';

export const getModeKey = async ({
  modeId,
  variableCollectionId,
}: {
  modeId: string;
  variableCollectionId: string;
}) => {
  const variableCollection = await collectionById(variableCollectionId);

  const modeKey = (
    variableCollection?.modes.find((mode) => mode.modeId === modeId)?.name ??
    variableCollection?.modes.find(
      (mode) => mode.modeId === variableCollection.defaultModeId
    )?.name ??
    '--error--'
  ).toLowerCase();

  return modeKey;
};
