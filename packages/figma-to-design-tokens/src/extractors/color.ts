import { DesignToken } from 'style-dictionary/types';
import { toHex } from 'color2k';
import { FigmaExtractedVariable } from '../types';

export function extractColor(
  variable: FigmaExtractedVariable,
  modeId: string
): DesignToken {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    // We should not receive these types under color. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected color type');
  }

  const extractedValue = (() => {
    // RGB | RGBA | VariableAlias
    if ('a' in value) {
      // RGBA
      return toHex(`rgba(${value.r},${value.g},${value.b},${value.a})`);
    }

    if ('b' in value) {
      // RGB
      return toHex(`rgb(${value.r},${value.g},${value.b})`);
    }

    if ('id' in value && value.type === 'VARIABLE_ALIAS') {
      return value.id;
    }
  })();

  return {
    $type: 'color',
    $description: variable.description,
    $value: extractedValue,
  };
}
