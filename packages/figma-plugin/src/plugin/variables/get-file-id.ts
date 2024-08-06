export async function getFileId(): Promise<string | undefined> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const configCollection = collections.find((c) => c.name === '__config__');

  const variablesPromises =
    configCollection?.variableIds.map((variableId) =>
      figma.variables.getVariableByIdAsync(variableId)
    ) ?? [];

  const variables = await Promise.all(variablesPromises);

  const fileIdVariable = variables.find(
    (variable) =>
      variable?.name === 'fileId' && variable.resolvedType === 'STRING'
  );

  const modes = Object.keys(fileIdVariable?.valuesByMode ?? {});

  if (modes.length > 1) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('This file has more than one mode. Unsupported.', modes);
    return;
  }

  const [fileId] = modes.map((mode) => fileIdVariable?.valuesByMode[mode]);

  return typeof fileId === 'string' ? fileId : undefined;
}
