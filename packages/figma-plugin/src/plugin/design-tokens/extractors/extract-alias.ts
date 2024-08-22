export async function extractAlias(
  variableId: string,
  modeId: string
): Promise<string | undefined> {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  // TODO: Figure out if this modeId should be the collection one of the variable one when it comes to cross collection alias
  const value = variable?.valuesByMode[modeId];

  if (typeof value === 'object' && 'id' in value) {
    return extractAlias(value.id, modeId);
  }
  const collection = variable?.variableCollectionId
    ? ((await figma.variables.getVariableCollectionByIdAsync(
        variable.variableCollectionId
      )) ?? undefined)
    : undefined;

  const collectionPath = collection
    ? `${collection.name}.${collection.defaultModeId}`
    : '';

  return `{${collectionPath}.${variable?.name.split('/').join('.')}}`;
}
