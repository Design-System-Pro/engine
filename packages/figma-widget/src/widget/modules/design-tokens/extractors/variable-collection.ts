import { nonNullable } from '../utils/non-nullable';
import { extractVariable } from './extract-variable';
import { combinePaths } from '../utils/combine-paths';
import { JSONTokenTree } from 'design-tokens-format-module';

export const extractVariableCollection = async (
  variableCollection: VariableCollection
): Promise<JSONTokenTree> => {
  const variables = (
    await Promise.all(variableCollection.variableIds.map(extractVariable))
  ).filter(nonNullable);

  return { [variableCollection.name.toLowerCase()]: combinePaths(variables) };
};
