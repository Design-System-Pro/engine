import { getModeKey } from '../utils/get-mode-key';
import { collectionById } from '../utils/get-variable-collection';

export async function extractAlias(
  variableId: string,
  modeId: string
): Promise<string | undefined> {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  // TODO: Figure out if this modeId should be the collection one of the variable one when it comes to cross collection alias
  const value = variable?.valuesByMode[modeId];
  const variableCollectionId = variable?.variableCollectionId;

  if (typeof value === 'object' && 'id' in value) {
    return extractAlias(value.id, modeId);
  }

  const collection = await collectionById(variableCollectionId);

  const modeKey = variableCollectionId
    ? await getModeKey({ modeId, variableCollectionId })
    : '';

  const collectionKey = collection ? collection.name.toLowerCase() : '';

  return `{${collectionKey}.${modeKey}.${variable?.name.split('/').join('.')}}`.toLowerCase();
}
