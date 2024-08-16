import { extractLocalVariableCollections } from './extractors';

export async function extractVariables(figma: PluginAPI) {
  const variableCollections = await extractLocalVariableCollections(figma);

  return variableCollections;
}
