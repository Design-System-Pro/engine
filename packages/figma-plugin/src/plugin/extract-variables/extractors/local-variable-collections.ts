import { extractVariableCollection } from './variable-collection';

export async function extractLocalVariableCollections(figma: PluginAPI) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  return await Promise.all(collections.map(extractVariableCollection(figma)));
}
