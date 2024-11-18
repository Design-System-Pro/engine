import type { Group } from '@terrazzo/token-tools';
import { extractColor } from './color';
import { extractFloat } from './float';

import { extractString } from './string';

export async function extractModeVariable(
  variable: Variable,
  modeId: string
): Promise<Group> {
  switch (variable.resolvedType) {
    case 'COLOR':
      return extractColor(variable, modeId);
    case 'FLOAT':
      return extractFloat(variable, modeId);
    case 'STRING':
      return extractString(variable, modeId);
    case 'BOOLEAN':
    default:
      return {
        $description: 'Not implemented',
        $extensions: {
          figmaType: `figma-variable-type:${variable.resolvedType}`,
        },
      } satisfies Group;
  }
}
