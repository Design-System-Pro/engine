import type { DesignToken } from 'style-dictionary/types';
import { extractModeVariable } from './extract-mode-variable';

export const extractVariable = async (
  variableId: string
): Promise<DesignToken | undefined> => {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  if (!variable) return undefined;

  const modeIds = Object.keys(variable.valuesByMode);

  const valuesPerMode = await Promise.all(
    modeIds.map((modeId) => extractModeVariable(variable, modeId))
  );

  return {
    $type: 'figma-variable',
    valuesPerMode,
  };
};
