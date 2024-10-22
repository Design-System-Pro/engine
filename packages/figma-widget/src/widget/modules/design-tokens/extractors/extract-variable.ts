import { extractModeVariable } from './extract-mode-variable';
import { nonNullable } from '../utils/non-nullable';
import { combinePaths } from '../utils/combine-paths';
import { getModeKey } from '../utils/get-mode-key';
import type { JSONTokenTree } from 'design-tokens-format-module';

export const extractVariable = async (
  variableId: string
): Promise<JSONTokenTree> => {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  if (!variable) {
    throw new Error(`Variable id ${variableId} failed to fetch.`);
  }

  const modeIds = Object.keys(variable.valuesByMode);
  const variableCollectionId = variable.variableCollectionId;

  const valuesPerMode = (
    await Promise.all(
      modeIds.map(async (modeId) => ({
        [await getModeKey({ variableCollectionId, modeId })]:
          await extractModeVariable(variable, modeId),
      }))
    )
  ).filter(nonNullable);

  return combinePaths(valuesPerMode);
};
