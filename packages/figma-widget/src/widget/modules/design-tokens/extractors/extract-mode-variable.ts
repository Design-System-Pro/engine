import type { DesignTokens } from 'style-dictionary/types';
import { extractColor } from './color';
import { extractFloat } from './float';

export async function extractModeVariable(
  variable: Variable,
  modeId: string
): Promise<DesignTokens | undefined> {
  switch (variable.resolvedType) {
    case 'COLOR':
      return extractColor(variable, modeId);
    case 'FLOAT':
      return extractFloat(variable, modeId);
    case 'BOOLEAN':
    case 'STRING':
    default:
      return {
        $type: `figma-variable-type:${variable.resolvedType}`,
      };
  }
}
