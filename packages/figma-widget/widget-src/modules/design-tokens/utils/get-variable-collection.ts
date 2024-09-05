import memoize from 'memoize';
const getCollectionById = async (
  collectionId?: string
): Promise<VariableCollection | undefined> => {
  if (!collectionId) return undefined;

  return (
    (await figma.variables.getVariableCollectionByIdAsync(collectionId)) ??
    undefined
  );
};

export const collectionById = memoize(getCollectionById);
