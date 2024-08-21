import { DesignToken } from 'style-dictionary/types';
import { toHex } from 'color2k';
import { FigmaExtractedVariable } from '../types';

const convertChannel = (value: number): number => {
  return Math.round(value * 255);
};

const toRgba = (value: RGB | RGBA): string => {
  if ('a' in value) {
    // RGBA
    return `rgba(${convertChannel(value.r)},${convertChannel(value.g)},${convertChannel(value.b)},${convertChannel(value.a)})`;
  }

  // RGB
  return `rgb(${convertChannel(value.r)},${convertChannel(value.g)},${convertChannel(value.b)})`;
};

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
    if ('a' in value || 'r' in value) {
      // RGBA
      return toHex(toRgba(value));
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
