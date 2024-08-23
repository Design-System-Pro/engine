import { cache } from 'react';

const getCollectionById = async (
  collectionId?: string
): Promise<VariableCollection | undefined> => {
  if (!collectionId) return undefined;

  return (
    (await figma.variables.getVariableCollectionByIdAsync(collectionId)) ??
    undefined
  );
};

export const collectionById = cache(getCollectionById);
