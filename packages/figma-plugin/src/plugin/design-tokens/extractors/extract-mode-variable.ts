import type { DesignTokens } from 'style-dictionary/types';
import { extractColor } from './color';

export async function extractModeVariable(
  variable: Variable,
  modeId: string
): Promise<DesignTokens | undefined> {
  switch (variable.resolvedType) {
    case 'COLOR':
      return extractColor(variable, modeId);
    case 'BOOLEAN':
    case 'FLOAT':
    case 'STRING':
    default:
      return {
        $type: `figma-variable-type:${variable.resolvedType}`,
      };
  }
}
