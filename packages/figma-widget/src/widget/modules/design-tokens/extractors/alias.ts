import { getModeKey } from '../utils/get-mode-key';
import { collectionById } from '../utils/get-variable-collection';
import type { AliasValue } from '@terrazzo/token-tools';
export async function extractAlias(
  variableId: string,
  modeId?: string
): Promise<AliasValue> {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  if (!variable) {
    throw new Error(`Variable id ${variableId} doesn't exist.`);
  }

  if (!modeId) {
    const collection = await collectionById(variable.variableCollectionId);
    if (!collection) {
      throw new Error(
        `Variable collection id ${variableId}:${variable.variableCollectionId} doesn't exist.`
      );
    }
    // In case the modeId is not defined, use the default Collection Mode ID - THIS MIGHT STILL BE A PROBLEM (REQUIRES TESTING)
    modeId = collection.defaultModeId;
  }

  const value = variable.valuesByMode[modeId];
  const variableCollectionId = variable.variableCollectionId;

  if (typeof value === 'object' && 'id' in value) {
    return extractAlias(value.id, modeId);
  }

  const collection = await collectionById(variableCollectionId);

  const modeKey = variableCollectionId
    ? await getModeKey({ modeId, variableCollectionId })
    : '';

  const collectionKey = collection ? collection.name : '';

  const aliasValue = `${collectionKey}.${modeKey}.${variable.name.split('/').join('.')}`;

  return `{${aliasValue}}`;
}
